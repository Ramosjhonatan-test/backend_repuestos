const express = require('express');
const { body } = require('express-validator');
const AutenticacionController = require('../controllers/autenticacion.controller');
const { validate } = require('../middlewares/validate.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Registro:
 *       type: object
 *       required: [nombre, email, password]
 *       properties:
 *         nombre: { type: string, example: "Juan Perez" }
 *         email: { type: string, format: email, example: "juan@example.com" }
 *         password: { type: string, minLength: 6, example: "123456" }
 *         rol: { type: string, enum: [admin, vendedor], example: "vendedor" }
 *     Login:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email: { type: string, format: email, example: "admin@repuestos.com" }
 *         password: { type: string, example: "admin123" }
 */

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registro'
 *     responses:
 *       201:
 *         description: Usuario registrado
 */
router.post('/registrar', 
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  validate,
  AutenticacionController.registrar
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login exitoso
 */
router.post('/login', 
  [
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  ],
  validate,
  AutenticacionController.login
);

/**
 * @swagger
 * /auth/perfil:
 *   get:
 *     summary: Obtener perfil del usuario actual
 *     tags: [Autenticacion]
 *   put:
 *     summary: Actualizar perfil del usuario actual
 *     tags: [Autenticacion]
 */
router.get('/perfil', authMiddleware, AutenticacionController.obtenerPerfil);
router.put('/perfil', authMiddleware, AutenticacionController.actualizarPerfil);

/**
 * @swagger
 * /auth/usuarios:
 *   get:
 *     summary: Listar todos los usuarios (Admin)
 *     tags: [Autenticacion]
 */
router.get('/usuarios', authMiddleware, authorize('admin'), AutenticacionController.obtenerTodos);

/**
 * @swagger
 * /auth/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario (Admin)
 *     tags: [Autenticacion]
 */
router.put('/usuarios/:id', authMiddleware, authorize('admin'), AutenticacionController.actualizar);

// QR de pago del negocio (accesible por vendedores y admin)
router.get('/qr-pago-negocio', authMiddleware, AutenticacionController.obtenerQrNegocio);

module.exports = router;
