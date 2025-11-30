// errorMiddleware.js
export const  errorMiddleware=(err, req, res, next) =>{
  console.error(err); // Log error for debugging
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
}

