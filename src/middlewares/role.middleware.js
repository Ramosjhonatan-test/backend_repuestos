const { StatusCodes } = require('http-status-codes');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(StatusCodes.FORBIDDEN).json({
        status: 'error',
        message: 'Acceso denegado: no tienes permisos de administrador',
      });
    }
    next();
  };
};

module.exports = authorize;
