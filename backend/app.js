import express from "express";
import cors from "cors";
import registerRoutes from "./src/startup/register-routes.js";
import initDatabase from "./src/startup/init-database.js";
import initLogger from "./src/startup/init-logger.js";
import setTemplateEngine from "./src/startup/set-template-engine.js";
import initConfig from "./src/startup/init-config.js";
import winston from "winston";
///This is an instance of an Express application. It's created by calling express(), and it's the main object through which you define routes, middleware, and other configurations.
const app = express();
const port = process.env.PORT || 3000;

// Allow CORS from the frontend (use VITE dev server origin by default)
// Accept override via environment variable CORS_ORIGIN - should be exact origin when credentials: true
const corsOriginEnv = process.env.CORS_ORIGIN || "http://localhost:5173";
const allowedOrigins = corsOriginEnv.split(",").map((s) => s.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (such as mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-auth-token",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Parse JSON bodies
app.use(express.json());

// Helpful dev logging for CORS debugging
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    winston.debug(
      `Incoming request: origin=${req.headers.origin}, method=${req.method}, url=${req.url}`
    );
    next();
  });
}

initLogger(app);
registerRoutes(app);
initDatabase();
setTemplateEngine(app);
initConfig();
///middlewares
//express.static: This is a built-in middleware function in Express that serves static files. Static files can include HTML files, CSS stylesheets, JavaScript files, images, fonts, etc. The express.static middleware takes a directory path as an argument and serves the files located in that directory.
// Allow CORS from the frontend (use VITE dev server origin by default)
// Accept override via environment variable CORS_ORIGIN
app.use(express.static("public"));

app.listen(port, () => {
  winston.info(`Server running on port  ${port}`);
});
