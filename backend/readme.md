// ---------------------------
// ✅ Use Session (Transaction)
//stop all mongod proccessand taskkill /F /IM mongod.exe
///then run this in powershell admin: mongod --dbpath "C:\Program Files\MongoDB\Server\8.0\data" --replSet rs0
/// then in mongoshell in compass run: rs.initiate()
// ---------------------------

Here’s a concise, battle‑tested checklist for building a robust REST API with Node.js + Mongoose. It’s organized as practical steps you can follow end‑to‑end.

1. Plan the API

- Define resources, relationships, and lifecycle (CRUD, soft delete, etc.).
- Agree on conventions: plural nouns, kebab-case paths, camelCase JSON fields.
- Pick status codes and error contract (consider application/problem+json).
- Decide on versioning (e.g., /v1) and deprecation policy.
- Sketch pagination, filtering, sorting, and field selection requirements.

2. Choose stack and initialize project

- Node.js LTS, npm/yarn/pnpm. Framework: Express (ubiquitous) or Fastify (faster).
- Add core deps: express (or fastify), mongoose, cors, helmet, compression.
- Add validation: zod or joi (+ celebrate/express-zod).
- Add security: express-rate-limit, express-mongo-sanitize, hpp, xss-clean.
- Add logging: pino (pino-http) or winston; morgan for access logs.
- Add testing: jest, supertest, mongodb-memory-server.
- Optional but recommended: TypeScript, ESLint, Prettier, Husky, lint-staged.

3. Structure the project

- src/
  - config/ (env, db config)
  - models/ (Mongoose schemas/models)
  - services/ (business logic, data access)
  - controllers/ (HTTP handlers)
  - routes/ (Express/Fastify routers, versioned)
  - middlewares/ (auth, errors, validation)
  - utils/ (helpers)
  - app.ts | server.ts (bootstrap)
  - tests/
- Keep controllers thin; put logic in services; keep models dumb.

4. Configuration and environment

- Use dotenv/envalid/zod to load and validate env vars (PORT, MONGODB_URI, JWT_SECRET, NODE_ENV).
- Separate envs: development, test, production. Never commit secrets.
- Centralize config access in a config module. Fail fast on invalid config.

5. Database connection management

- Use a single Mongoose connection and share it.
- Enable sensible options: strictQuery, maxPoolSize, serverSelectionTimeoutMS.
- Implement retry/backoff on startup, and graceful shutdown on SIGINT/SIGTERM.
- Log connection events; crash process on fatal DB errors in prod.

6. Schema and model design

- Use Schema({ … }, { timestamps: true, versionKey: true, strict: true }).
- Add indexes explicitly (unique, compound) and keep an index plan under version control.
- Remember: unique: true creates an index; it’s not a validator—handle duplicates (E11000) as 409 Conflict.
- Add validation: required, enum, min/max, match, custom validators.
- Add toJSON transforms to remove internal fields (\_id to id, hide \_\_v, passwords).
- Use virtuals for computed fields; avoid heavy business logic in pre/post hooks.
- Consider optimisticConcurrency: true for race safety.
- For multi-document updates, use MongoDB transactions with sessions.

7. Controllers, services, routes

- Controllers: parse input, call service, map results to HTTP (status, headers).
- Services: implement business rules, call models/repositories.
- Use an async wrapper to forward errors to the centralized error handler.
- Prefer PATCH for partial updates, PUT for full replacement, POST for create.
- For create, return 201 Created + Location header to the new resource.

8. Request validation and sanitization

- Validate params, query, and body per route using zod/joi schemas.
- Enforce ObjectId format for :id; reject unknown fields (whitelisting).
- Sanitize inputs: express-mongo-sanitize (prevents query operator injection), xss-clean if returning user-generated HTML.
- Limit body size and accepted Content-Type.

9. Error handling

- Centralized error middleware: return consistent JSON shape { type, title, status, detail, errors } or similar.
- Map common errors:
  - Mongoose ValidationError -> 400
  - CastError (invalid ObjectId) -> 400
  - MongoServerError 11000 (duplicate key) -> 409
  - Not found -> 404
  - Auth errors -> 401/403
- Hide stack traces in production; include correlation/request ID.

10. Query features (filtering, sorting, pagination, projection)

- Accept safe query params: page, limit (cap!), sort, fields, filter operators (e.g., price[gte]).
- Whitelist sortable/filterable fields to avoid unindexed scans.
- Use lean() for read endpoints to return plain objects and reduce overhead.
- Provide pagination metadata (page, limit, total, hasNext).

11. Authentication and authorization

- Use JWT access tokens with short TTL + refresh token rotation, or session cookies with CSRF protections.
- Hash passwords with bcrypt (or argon2). Enforce password policy and lockouts.
- Implement RBAC/ABAC in a dedicated authz middleware.
- Secure cookies (Secure, HttpOnly, SameSite) if cookies are used.
- Always use HTTPS in production; enforce CORS with an allowlist.

12. Security hardening

- helmet for security headers; disable x-powered-by.
- Rate limit per IP and stricter limits for auth endpoints.
- HPP to prevent HTTP parameter pollution.
- Validate and normalize all user input and file uploads.
- Consider ETags/If-Match for concurrency control on updates.
- Regularly audit deps (npm audit, Snyk); pin node and OS images.

13. Performance and scalability

- Use Fastify for higher throughput if needed.
- Avoid N+1 populate; prefer aggregation or explicit batched queries.
- Use projections to return only needed fields.
- Cache hot reads with Redis; implement cache invalidation on writes.
- Stream large responses; avoid sending unbounded result sets.
- Watch indexes and slow queries; use explain() in development.

14. Logging, metrics, and tracing

- Structured logs (pino/winston) with trace/correlation IDs.
- Log request/response metadata (without PII) and key events.
- Expose /healthz and /readyz endpoints for liveness/readiness.
- Add Prometheus metrics (prom-client) and alerts; consider OpenTelemetry tracing.

15. Testing strategy

- Unit tests for services and utilities.
- Integration tests for routes using supertest + mongodb-memory-server or Testcontainers.
- Seed known fixtures; test happy paths, validation, auth, error mapping, and edge cases.
- Run tests and linters in CI for every PR.

16. Documentation

- OpenAPI 3 spec as the source of truth; generate Swagger UI/Redoc.

---

## Auth endpoints (OTP + Password flows)

1. Initiate auth

- Endpoint: POST /api/v1/auth/initiate
- Body: { mobile: string, method?: 'otp' | 'password' }
- Behavior:
  - method === 'otp': generates OTP {mobile} and stores hashed OTP in the DB. Sends OTP via SMS using configured provider. The OTP expires in 5 minutes.
  - method === 'password': instructs the client to proceed with password login flow.

2. Verify OTP

- Endpoint: POST /api/v1/auth/verify-otp
- Body: { mobile: string, code: string }
- Behavior: validates OTP and returns a JWT token on success.

3. Password login

- Endpoint: POST /api/v1/auth/password
- Body: { mobile: string, password: string }
- Behavior: verifies password and returns JWT on success.

Security considerations:

- Rate limit OTP generation and verification endpoints.
- Hash OTPs in the DB rather than storing them in plain text.
- Enforce expiration for OTPs and max attempts per OTP.
- Consider adding audit logs and alerts on suspicious behavior.
 - Logging: in development we log OTP plaintext to make local testing easier. In production OTPs are masked in logs.
   Set `DEBUG_OTP=true` in `backend/.env` to show OTP code in logs for development.

- Document auth flows, error schemas, and examples.
- Keep docs versioned with the code; automate publishing.

17. Deployment, CI/CD, and operations

- Docker multi-stage builds; run as non-root; minimal base image.
- Inject config via env; set NODE_ENV=production; enable trust proxy if behind a proxy.
- Use a process manager (PM2) or orchestration (Kubernetes) with proper probes.
- Run DB migrations/seeds via scripts (e.g., migrate-mongo) during deploy.
- Backups, monitoring, log retention, and rotation policies.

18. Data integrity and reliability

- Use MongoDB transactions for multi-document invariants.
- Implement idempotency keys for POSTs that can be retried.
- Consider soft deletes (deletedAt) and auditing (createdBy/updatedBy).
- Timezone and timestamps in UTC, ISO 8601; store numeric amounts in smallest unit (e.g., cents).

19. Common Mongoose tips and pitfalls

- Prefer lean() for reads; only use populate when necessary and indexed.
- Use runValidators: true and context: 'query' on update operations.
- Don’t rely solely on Mongoose validation—validate at the request boundary too.
- Handle E11000 (duplicate key) gracefully and uniquely identify which field failed.
- Avoid long-running model hooks; keep them side-effect free.

Minimal example flow (no heavy code, just shape)

- Model: User schema with email (unique, indexed), password (select: false), timestamps, toJSON transform hiding password and \_\_v.
- Service: createUser(data) hashes password, creates doc; getUserById(id) uses lean() with projection.
- Controller: reads validated req.body, calls service, returns 201 with Location.
- Route: POST /v1/users -> validate -> controller; GET /v1/users/:id -> validate ObjectId -> controller.
- Error middleware: maps Mongoose/Mongo errors to proper HTTP status and JSON.

If you want, I can generate a ready-to-run TypeScript skeleton (Express + Mongoose) with the folders, middleware, a sample resource, validation, and tests.
