const ServicioCategoria = require('../services/categoria.service');
const { StatusCodes } = require('http-status-codes');

class CategoriaController {
  async obtenerTodas(req, res, next) {
    try {
      const categorias = await ServicioCategoria.obtenerTodasLasCategorias();
      res.status(StatusCodes.OK).json({
        status: 'success',
        data: categorias,
      });
    } catch (error) {
      next(error);
    }
  }

  async obtenerUna(req, res, next) {
    try {
      const { id } = req.params;
      const categoria = await ServicioCategoria.obtenerCategoriaPorId(id);
      res.status(StatusCodes.OK).json({
        status: 'success',
        data: categoria,
      });
    } catch (error) {
      next(error);
    }
  }

  async crear(req, res, next) {
    try {
      const categoria = await ServicioCategoria.crearCategoria(req.body);
      res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: categoria,
      });
    } catch (error) {
      next(error);
    }
  }

  async actualizar(req, res, next) {
    try {
      const { id } = req.params;
      const categoria = await ServicioCategoria.actualizarCategoria(id, req.body);
      res.status(StatusCodes.OK).json({
        status: 'success',
        data: categoria,
      });
    } catch (error) {
      next(error);
    }
  }

  async eliminar(req, res, next) {
    try {
      const { id } = req.params;
      await ServicioCategoria.eliminarCategoria(id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoriaController();
