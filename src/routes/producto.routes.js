const express = require('express');
const { body, param } = require('express-validator');
const ProductoController = require('../controllers/producto.controller');
const { validate } = require('../middlewares/validate.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const upload = require('../middlewares/upload.middleware');


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required: [nombre, sku, precio, stock, categoria_id, proveedor_id]
 *       properties:
 *         id: { type: string, format: uuid }
 *         nombre: { type: string }
 *         sku: { type: string }
 *         precio: { type: number }
 *         stock: { type: integer }
 *         categoria_id: { type: string, format: uuid }
 *         proveedor_id: { type: string, format: uuid }
 *         url_imagen: { type: string }
 */

router.get('/lookup/:sku', ProductoController.lookupExterno);
router.post('/upload', authMiddleware, authorize('admin'), upload.single('imagen'), ProductoController.subirImagen);


/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Listar todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida
 */
router.get('/', ProductoController.obtenerTodos);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Datos del producto
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', [param('id').isUUID()], validate, ProductoController.obtenerUno);

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/', 
  authMiddleware,
  authorize('admin'),
  [
    body('nombre').notEmpty(),
    body('sku').notEmpty(),
    body('precio').isNumeric(),
    body('stock').isInt(),
    body('categoria_id').isUUID(),
    body('proveedor_id').isUUID(),
  ], 
  validate, 
  ProductoController.crear
);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
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
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
router.put('/:id', 
  authMiddleware,
  authorize('admin'),
  [param('id').isUUID()], 
  validate, 
  ProductoController.actualizar
);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto (Desactivar)
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       204:
 *         description: Producto eliminado
 */
router.delete('/:id', 
  authMiddleware,
  authorize('admin'),
  [param('id').isUUID()], 
  validate, 
  ProductoController.eliminar
);

module.exports = router;
