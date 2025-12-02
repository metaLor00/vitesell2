import mongoose from "mongoose";
import winston from "winston";
import config from "config";

// Database initialization function
const initDatabase = async () => {
  // Prefer config value but fall back to localhost
  const configuredUri = config.has("db.uri") && config.get("db.uri")
    ? config.get("db.uri")
    : "mongodb://localhost:27017/vitesell";

  // Log the host/port/replicaSet part (mask credentials if present)
  const safeUri = configuredUri.replace(/:(?:\/\/)?(.*@)/, "//***@") || configuredUri;
  winston.info(`Attempting MongoDB connection to ${safeUri}`);

  // Simple retry/backoff for transient failures (up to ~30s total)
  const maxAttempts = 2;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await mongoose.connect(configuredUri, { serverSelectionTimeoutMS: 5000 });
      winston.info("Connected to MongoDB");
      return;
    } catch (err) {
      winston.warn(
        `MongoDB connection attempt ${attempt} failed: ${err.message || err}.`
      );
      if (attempt === maxAttempts) {
        winston.error("Could not connect to MongoDB after multiple attempts:", err.message || err);
        if (configuredUri.includes("localhost") || configuredUri.includes("127.0.0.1")) {
          winston.error("Make sure 'mongod' is running and listening on the configured port.");
          winston.error(
            "If you need transactions (sessions), start mongod with a replica set (e.g. --replSet rs0) and run 'rs.initiate()' in the mongo shell."
          );
        }
        throw err;
      }
      // exponential backoff (500ms, 1000ms, 2000ms, ...)
      const backoff = 500 * Math.pow(2, attempt - 1);
      await new Promise((r) => setTimeout(r, backoff));
    }
  }
};

export default initDatabase;