const express = require('express');
const { body, param } = require('express-validator');
const ProveedorController = require('../controllers/proveedor.controller');
const { validate } = require('../middlewares/validate.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Proveedor:
 *       type: object
 *       required: [nombre]
 *       properties:
 *         id: { type: string, format: uuid }
 *         nombre: { type: string }
 *         nombre_contacto: { type: string }
 *         email: { type: string }
 *         telefono: { type: string }
 */

/**
 * @swagger
 * /proveedores:
 *   get:
 *     summary: Listar todos los proveedores
 *     tags: [Proveedores]
 */
router.get('/', ProveedorController.obtenerTodos);

/**
 * @swagger
 * /proveedores/{id}:
 *   get:
 *     summary: Obtener un proveedor por ID
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 */
router.get('/:id', [param('id').isUUID()], validate, ProveedorController.obtenerUno);

/**
 * @swagger
 * /proveedores:
 *   post:
 *     summary: Crear un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proveedor'
 */
router.post('/', 
  authMiddleware, 
  authorize('admin'), 
  [body('nombre').notEmpty()], 
  validate, 
  ProveedorController.crear
);

/**
 * @swagger
 * /proveedores/{id}:
 *   put:
 *     summary: Actualizar un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 */
router.put('/:id', 
  authMiddleware, 
  authorize('admin'), 
  [param('id').isUUID()], 
  validate, 
  ProveedorController.actualizar
);

/**
 * @swagger
 * /proveedores/{id}:
 *   delete:
 *     summary: Eliminar un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 */
router.delete('/:id', 
  authMiddleware, 
  authorize('admin'), 
  [param('id').isUUID()], 
  validate, 
  ProveedorController.eliminar
);

module.exports = router;
