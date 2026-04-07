const ServicioAutenticacion = require('../services/autenticacion.service');
const { Usuario } = require('../models');
const { StatusCodes } = require('http-status-codes');

class AutenticacionController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const resultado = await ServicioAutenticacion.login(email, password);
      res.status(StatusCodes.OK).json({
        status: 'success',
        data: resultado,
      });
    } catch (error) {
      next(error);
    }
  }

  async registrar(req, res, next) {
    try {
      const usuario = await ServicioAutenticacion.registrar(req.body);
      res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async obtenerTodos(req, res, next) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ['id', 'nombre', 'email', 'rol', 'activo'],
        order: [['nombre', 'ASC']]
      });
      res.status(StatusCodes.OK).json({ status: 'success', data: usuarios });
    } catch (error) {
      next(error);
    }
  }

  async actualizar(req, res, next) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', message: 'Usuario no encontrado' });
      }
      await usuario.update(req.body);
      res.status(StatusCodes.OK).json({ status: 'success', data: usuario });
    } catch (error) {
      next(error);
    }
  }

  async obtenerPerfil(req, res, next) {
    try {
      const usuario = await Usuario.findByPk(req.user.id, {
        attributes: ['id', 'nombre', 'email', 'rol', 'foto_url', 'qr_pago_url']
      });
      res.status(StatusCodes.OK).json({ status: 'success', data: usuario });
    } catch (error) {
      next(error);
    }
  }

  async actualizarPerfil(req, res, next) {
    try {
      const { nombre, email, password, foto_url, qr_pago_url } = req.body;
      const usuario = await Usuario.findByPk(req.user.id);
      
      if (nombre) usuario.nombre = nombre;
      if (email) usuario.email = email;
      if (password) usuario.password = password;
      
      // Actualización directa para permitir limpiar campos si es necesario
      usuario.foto_url = foto_url !== undefined ? foto_url : usuario.foto_url;
      usuario.qr_pago_url = qr_pago_url !== undefined ? qr_pago_url : usuario.qr_pago_url;
      
      await usuario.save();
      
      res.status(StatusCodes.OK).json({ 
        status: 'success', 
        data: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
          foto_url: usuario.foto_url,
          qr_pago_url: usuario.qr_pago_url
        } 
      });
    } catch (error) {
      next(error);
    }
  }

  // Endpoint público (autenticado) para que vendedores obtengan el QR del negocio
  async obtenerQrNegocio(req, res, next) {
    try {
      const admin = await Usuario.findOne({
        where: { rol: 'admin', qr_pago_url: { [require('sequelize').Op.ne]: null } },
        attributes: ['qr_pago_url']
      });
      res.status(StatusCodes.OK).json({
        status: 'success',
        data: { qr_pago_url: admin?.qr_pago_url || null }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AutenticacionController();
