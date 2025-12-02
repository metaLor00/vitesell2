import winston from "winston";
import "winston-mongodb";

const initLogger = (app) => {
  // Configure the global default logger so 'winston.info' logs go to the transports
  const transportsList = [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "logfile.log" }),
    new winston.transports.MongoDB({
      level: "info",
      db: "mongodb://localhost:27017/vitesell",
      collection: "logs",
      format: winston.format.json(),
    }),
  ];

  winston.configure({
    level: "info",
    format: winston.format.json(),
    transports: transportsList,
  });

  // Handle uncaught exceptions and write them to the file/console
  winston.exceptions.handle(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "uncaught-exceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    // Convert unhandled promise rejections into uncaught exceptions handled by Winston
    throw ex;
  });

  // Attach logger to app for convenience where a direct logger instance is preferred
  app.logger = winston;
};

export default initLogger;
