const ServicioVenta = require('../services/venta.service');
const { StatusCodes } = require('http-status-codes');

class VentaController {
  async crear(req, res, next) {
    try {
      const { cliente_id, usuario_id, metodo_pago, detalles } = req.body;
      console.log('[VENTA] Datos recibidos:', JSON.stringify({ cliente_id, usuario_id, metodo_pago, detalles_count: detalles?.length }));
      const venta = await ServicioVenta.crearVenta({ cliente_id, usuario_id, metodo_pago }, detalles);
      res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: venta,
      });
    } catch (error) {
      console.error('[VENTA] Error al crear:', error.message, error.stack);
      next(error);
    }
  }

  async obtenerTodas(req, res, next) {
    try {
      const ventas = await ServicioVenta.obtenerVentas();
      res.status(StatusCodes.OK).json({
        status: 'success',
        data: ventas,
      });
    } catch (error) {
      next(error);
    }
  }

  async anular(req, res, next) {
    try {
      const { id } = req.params;
      const venta = await ServicioVenta.anularVenta(id);
      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Venta anulada correctamente y stock devuelto',
        data: venta,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new VentaController();
