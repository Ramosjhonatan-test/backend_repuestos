const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const routes = require('./routes');

const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
// Permitir CORS (puedes restringirlo después al dominio de Vercel)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos Estáticos (Imágenes)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Venta de Repuestos API',
      version: '1.0.0',
      description: 'API para la gestión de ventas de repuestos de autos',
    },
    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL ? `${process.env.RENDER_EXTERNAL_URL}/api/v1` : `http://localhost:${process.env.PORT || 3000}/api/v1`,
        description: process.env.RENDER_EXTERNAL_URL ? 'Servidor de Producción' : 'Servidor Local'
      },
    ],
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido al API de Venta de Repuestos' });
});

// Routes
app.use('/api/v1', routes);

// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
