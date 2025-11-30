///### Reusable helper functions (formatDate, logger, email)

const validate = (schemas) => {  
  return (req, res, next) => {
    const sources = ['body', 'params', 'query'];

    for (const source of sources) {
      if (schemas[source]) {
        
        const { error, value } = schemas[source].validate(req[source], {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) {
          return res.status(400).json({
            status: 'error',
            errors: error.details.map((err) => err.message),
          });
        }

        // Attach validated value to req object
        req[`validated${source.charAt(0).toUpperCase() + source.slice(1)}`] = value;
      }
    }

    next();
  };
};
export default validate;