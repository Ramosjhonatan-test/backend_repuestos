const app = require('../src/app');
const { sequelize } = require('../src/models');

module.exports = async (req, res) => {
  try {
    // Asegurar conexión a DB antes de procesar petición (Neon)
    await sequelize.authenticate();
    return app(req, res);
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
};
