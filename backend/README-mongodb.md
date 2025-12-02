This project uses MongoDB. If you see a MongooseServerSelectionError (Server selection timed out), follow these troubleshooting steps for Windows (PowerShell):

1) Verify MongoDB is installed and 'mongod' is available in PATH.

2) Start a standalone mongod (quick test):

```powershell
# start mongod using default dbpath (adjust path if you used a custom one)
mongod --dbpath "C:\Program Files\MongoDB\Server\8.0\data"
```

If your code connects to a URI without a replicaSet, the above is sufficient. If you need transactions (sessions) the server must be a replica set.

3) Start mongod with replica set enabled (for transactions):

```powershell
# stop any running mongod processes first (PowerShell admin):
Get-Process mongod -ErrorAction SilentlyContinue | Stop-Process -Force

# start mongod with replSet named rs0 (open a new Admin PowerShell window for long-running process):
mongod --dbpath "C:\Program Files\MongoDB\Server\8.0\data" --replSet rs0
```

4) In another shell (mongo shell or Compass Shell) initiate the replica set:

```powershell
# connect using the mongo shell (or use Compass/Studio):
mongo --eval "rs.initiate()"
```

5) After starting mongod and (if needed) initiating the replica set, restart your Node app.

6) If you still get ServerSelectionTimeout, ensure the connection URI used by the app matches the host/port and includes `?replicaSet=rs0` when using the replica set.

Notes:
- The app reads the DB URI from `config/default.json` (key: `db.uri`) via the `config` package. You can set environment-specific files under `config/` or set the `NODE_ENV` and `NODE_CONFIG` environment variables.
- On Windows, running `mongod` as a foreground process will block the shell; open a separate terminal for the mongo shell or run `mongod` as a Windows service if preferred.

Common startup note:
- If you see: "FATAL ERROR: JWT secret(vidly_JWTSECRET) is not defined.", set the JWT secret for local development by adding it to `config/default.json` under `jwtPrivateKey`, or set the environment variable `NODE_CONFIG`/`NODE_ENV` appropriately.
	Example `config/default.json` entry:

```json
{
	"jwtPrivateKey": "your-local-secret",
	"db": { "uri": "mongodb://localhost:27017/vidly" }
}
```

Or set the environment variable in PowerShell for the current session:

```powershell
$env:vidly_JWTSECRET = "your-local-secret"
``` 
