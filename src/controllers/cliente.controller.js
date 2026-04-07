const { Cliente } = require('../models');
const { StatusCodes } = require('http-status-codes');

class ClienteController {
  async obtenerTodos(req, res, next) {
    try {
      const clientes = await Cliente.findAll({ where: { activo: true } });
      res.status(StatusCodes.OK).json({ status: 'success', data: clientes });
    } catch (error) { next(error); }
  }

  async obtenerUno(req, res, next) {
    try {
      const cliente = await Cliente.findByPk(req.params.id);
      if (!cliente) return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', message: 'Cliente no encontrado' });
      res.status(StatusCodes.OK).json({ status: 'success', data: cliente });
    } catch (error) { next(error); }
  }

  async crear(req, res, next) {
    try {
      const cliente = await Cliente.create(req.body);
      res.status(StatusCodes.CREATED).json({ status: 'success', data: cliente });
    } catch (error) { next(error); }
  }

  async actualizar(req, res, next) {
    try {
      const cliente = await Cliente.findByPk(req.params.id);
      if (!cliente) return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', message: 'Cliente no encontrado' });
      await cliente.update(req.body);
      res.status(StatusCodes.OK).json({ status: 'success', data: cliente });
    } catch (error) { next(error); }
  }

  async eliminar(req, res, next) {
    try {
      const cliente = await Cliente.findByPk(req.params.id);
      if (!cliente) return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', message: 'Cliente no encontrado' });
      await cliente.update({ activo: false });
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) { next(error); }
  }
}

module.exports = new ClienteController();
