const { Categoria } = require('../models');

class CategoriaRepositorio {
  async obtenerTodas() {
    return await Categoria.findAll({
      where: { activo: true },
      order: [['nombre', 'ASC']],
    });
  }

  async obtenerPorId(id) {
    return await Categoria.findByPk(id);
  }

  async crear(datos) {
    return await Categoria.create(datos);
  }

  async actualizar(id, datos) {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return null;
    return await categoria.update(datos);
  }

  async eliminar(id) {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return null;
    return await categoria.update({ activo: false });
  }
}

module.exports = new CategoriaRepositorio();
