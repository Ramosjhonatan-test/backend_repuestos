const express = require('express');
const { body, param } = require('express-validator');
const ClienteController = require('../controllers/cliente.controller');
const { validate } = require('../middlewares/validate.middleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required: [nombre, documento_identidad]
 *       properties:
 *         id: { type: string, format: uuid }
 *         nombre: { type: string }
 *         documento_identidad: { type: string }
 *         email: { type: string }
 *         telefono: { type: string }
 *         direccion: { type: string }
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Listar todos los clientes
 *     tags: [Clientes]
 */
router.get('/', ClienteController.obtenerTodos);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 */
router.get('/:id', [param('id').isUUID()], validate, ClienteController.obtenerUno);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 */
router.post('/', 
  [
    body('nombre').notEmpty(),
    body('documento_identidad').notEmpty(),
  ], 
  validate, 
  ClienteController.crear
);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 */
router.put('/:id', [param('id').isUUID()], validate, ClienteController.actualizar);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 */
router.delete('/:id', [param('id').isUUID()], validate, ClienteController.eliminar);

module.exports = router;
