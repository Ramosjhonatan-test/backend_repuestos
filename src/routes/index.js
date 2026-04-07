const express = require('express');
const categoriaRutas = require('./categoria.routes');
const autenticacionRutas = require('./autenticacion.routes');
const ventaRutas = require('./venta.routes');
const productoRutas = require('./producto.routes');
const clienteRutas = require('./cliente.routes');
const proveedorRutas = require('./proveedor.routes');

const router = express.Router();

router.use('/categorias', categoriaRutas);
router.use('/auth', autenticacionRutas);
router.use('/ventas', ventaRutas);
router.use('/productos', productoRutas);
router.use('/clientes', clienteRutas);
router.use('/proveedores', proveedorRutas);

module.exports = router;
