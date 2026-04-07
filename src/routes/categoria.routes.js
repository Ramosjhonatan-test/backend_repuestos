const express = require('express');
const { body, param } = require('express-validator');
const CategoriaController = require('../controllers/categoria.controller');
const { validate } = require('../middlewares/validate.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       required: [nombre]
 *       properties:
 *         nombre: { type: string, example: "Motor" }
 *         descripcion: { type: string, example: "Repuestos del motor" }
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Listar todas las categorías
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get('/', CategoriaController.obtenerTodas);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 */
router.get('/:id', [param('id').isUUID()], validate, CategoriaController.obtenerUna);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 */
router.post('/', 
  authMiddleware, 
  authorize('admin'), 
  [body('nombre').notEmpty()], 
  validate, 
  CategoriaController.crear
);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 */
router.put('/:id', 
  authMiddleware, 
  authorize('admin'), 
  [param('id').isUUID()], 
  validate, 
  CategoriaController.actualizar
);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categorias]
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
  CategoriaController.eliminar
);

module.exports = router;
