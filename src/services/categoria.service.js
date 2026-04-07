const CategoriaRepositorio = require('../repositories/categoria.repositorio');

class ServicioCategoria {
  async obtenerTodasLasCategorias() {
    return await CategoriaRepositorio.obtenerTodas();
  }

  async obtenerCategoriaPorId(id) {
    const categoria = await CategoriaRepositorio.obtenerPorId(id);
    if (!categoria) {
      const error = new Error('Categoría no encontrada');
      error.status = 404;
      throw error;
    }
    return categoria;
  }

  async crearCategoria(datos) {
    return await CategoriaRepositorio.crear(datos);
  }

  async actualizarCategoria(id, datos) {
    const actualizada = await CategoriaRepositorio.actualizar(id, datos);
    if (!actualizada) {
      const error = new Error('Categoría no encontrada para actualizar');
      error.status = 404;
      throw error;
    }
    return actualizada;
  }

  async eliminarCategoria(id) {
    const eliminada = await CategoriaRepositorio.eliminar(id);
    if (!eliminada) {
      const error = new Error('Categoría no encontrada para eliminar');
      error.status = 404;
      throw error;
    }
    return eliminada;
  }
}

module.exports = new ServicioCategoria();
