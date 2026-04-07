// Forzar la inclusión del driver de Postgres para Vercel
require('pg'); 

// Solo cargar dotenv si no estamos en producción
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = require('../src/app');
const { sequelize } = require('../src/models');

module.exports = async (req, res) => {
  try {
    // Verificar conexión a la DB (Neon)
    // Usamos authenticate() pero sin bloquear demasiado el arranque serverless
    await sequelize.authenticate();
    
    // Delegar la petición a Express
    return app(req, res);
  } catch (error) {
    console.error('SERVERLESS BOOTSTRAP ERROR:', error);
    
    // En producción no queremos mostrar detalles sensibles, pero en logs sí
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Check server logs'
    });
  }
};
