import winston from 'winston';
// Centralized error-handling middleware for Express
export function errorMiddleware(err, req, res,next) {
winston.error(err.message, err);

///error (default)
///warn
///info
///debug
///verbose
/// silly

res.status(500).send('something failed!');
}
