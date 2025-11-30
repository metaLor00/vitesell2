import { createLogger, transports, format, exceptions } from 'winston';
import 'winston-mongodb';

const initLogger = (app) => {
  // Define the logger
  const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.simple(),
        ),
      }),
      new transports.File({ filename: 'logfile.log' }),
      new transports.MongoDB({
        level: 'info',
        db: 'mongodb://localhost:27017/vitesell',
        collection: 'logs',
        format: format.json(),
      }),
    ],
  });

  // Handle uncaught exceptions
  exceptions.handle(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
      ),
    }),
    new transports.File({ filename: 'uncaught-exceptions.log' })
  );

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  // You can also attach the logger to the app if needed
  app.logger = logger; // Example: attaching logger to the app object
};

export default initLogger;
