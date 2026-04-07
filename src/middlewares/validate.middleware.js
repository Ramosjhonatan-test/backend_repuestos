const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    status: 'error',
    errors: extractedErrors,
  });
};

module.exports = {
  validate,
};
