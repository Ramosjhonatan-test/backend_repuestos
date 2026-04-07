const { Proveedor } = require('../models');
const { StatusCodes } = require('http-status-codes');

class ProveedorController {
  async obtenerTodos(req, res, next) {
    try {
      const proveedores = await Proveedor.findAll({ where: { activo: true } });
      res.status(StatusCodes.OK).json({ status: 'success', data: proveedores });
    } catch (error) { next(error); }
  }

  async obtenerUno(req, res, next) {
    try {
      const proveedor = await Proveedor.findByPk(req.params.id);
      if (!proveedor) return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', message: 'Proveedor no encontrado' });
      res.status(StatusCodes.OK).json({ status: 'success', data: proveedor });
    } catch (error) { next(error); }
  }

  async crear(req, res, next) {
    try {
      const proveedor = await Proveedor.create(req.body);
      res.status(StatusCodes.CREATED).json({ status: 'success', data: proveedor });
    } catch (error) { next(error); }
  }

  async actualizar(req, res, next) {
    try {
      const proveedor = await Proveedor.findByPk(req.params.id);
      if (!proveedor) return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', message: 'Proveedor no encontrado' });
      await proveedor.update(req.body);
      res.status(StatusCodes.OK).json({ status: 'success', data: proveedor });
    } catch (error) { next(error); }
  }

  async eliminar(req, res, next) {
    try {
      const proveedor = await Proveedor.findByPk(req.params.id);
      if (!proveedor) return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', message: 'Proveedor no encontrado' });
      await proveedor.update({ activo: false });
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) { next(error); }
  }
}

module.exports = new ProveedorController();
