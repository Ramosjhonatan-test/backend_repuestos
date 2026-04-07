const express = require('express');
const VentaController = require('../controllers/venta.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     DetalleVenta:
 *       type: object
 *       required: [producto_id, cantidad]
 *       properties:
 *         producto_id: { type: string, format: uuid, example: "uuid-producto" }
 *         cantidad: { type: integer, example: 2 }
 *     Venta:
 *       type: object
 *       required: [cliente_id, usuario_id, detalles]
 *       properties:
 *         cliente_id: { type: string, format: uuid, example: "uuid-cliente" }
 *         usuario_id: { type: string, format: uuid, example: "uuid-usuario" }
 *         metodo_pago: { type: string, enum: [efectivo, tarjeta, transferencia], example: "efectivo" }
 *         detalles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DetalleVenta'
 */

/**
 * @swagger
 * /ventas:
 *   post:
 *     summary: Crear una nueva venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venta'
 *     responses:
 *       201:
 *         description: Venta creada
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authMiddleware, authorize('admin', 'vendedor'), VentaController.crear);

/**
 * @swagger
 * /ventas:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authMiddleware, authorize('admin', 'vendedor'), VentaController.obtenerTodas);

/**
 * @swagger
 * /ventas/{id}/anular:
 *   post:
 *     summary: Anular una venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid, example: "uuid-venta" }
 */
router.post('/:id/anular', VentaController.anular);

module.exports = router;
