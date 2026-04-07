const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

class ServicioAutenticacion {
  async login(email, password) {
    const usuario = await Usuario.findOne({ where: { email, activo: true } });
    
    if (!usuario || !(await usuario.validarPassword(password))) {
      const error = new Error('Credenciales inválidas');
      error.status = 401;
      throw error;
    }

    const token = this.generarToken(usuario);

    return {
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        foto_url: usuario.foto_url,
        qr_pago_url: usuario.qr_pago_url,
      },
      token,
    };
  }

  generarToken(usuario) {
    return jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '8h' }
    );
  }

  async registrar(datosUsuario) {
    const usuarioExistente = await Usuario.findOne({ where: { email: datosUsuario.email } });
    if (usuarioExistente) {
      const error = new Error('El email ya está registrado');
      error.status = 400;
      throw error;
    }
    return await Usuario.create(datosUsuario);
  }
}

module.exports = new ServicioAutenticacion();
