const { Producto, Categoria, Proveedor } = require('../models');
const { StatusCodes } = require('http-status-codes');

class ProductoController {
  async obtenerTodos(req, res, next) {
    try {
      const productos = await Producto.findAll({
        include: [
          { model: Categoria, as: 'Categoria' },
          { model: Proveedor, as: 'Proveedor' }
        ],
        where: { activo: true }
      });
      res.status(StatusCodes.OK).json({ status: 'success', data: productos });
    } catch (error) { next(error); }
  }

  async obtenerUno(req, res, next) {
    try {
      const producto = await Producto.findByPk(req.params.id, { 
        include: [
          { model: Categoria, as: 'Categoria' },
          { model: Proveedor, as: 'Proveedor' }
        ] 
      });
      if (!producto) return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', message: 'Producto no encontrado' });
      res.status(StatusCodes.OK).json({ status: 'success', data: producto });
    } catch (error) { next(error); }
  }

  async crear(req, res, next) {
    try {
      const producto = await Producto.create(req.body);
      res.status(StatusCodes.CREATED).json({ status: 'success', data: producto });
    } catch (error) { next(error); }
  }

  async actualizar(req, res, next) {
    try {
      const producto = await Producto.findByPk(req.params.id);
      if (!producto) return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', message: 'Producto no encontrado' });
      await producto.update(req.body);
      res.status(StatusCodes.OK).json({ status: 'success', data: producto });
    } catch (error) { next(error); }
  }

  async eliminar(req, res, next) {
    try {
      const producto = await Producto.findByPk(req.params.id);
      if (!producto) return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', message: 'Producto no encontrado' });
      await producto.update({ activo: false });
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) { next(error); }
  }

  async lookupExterno(req, res, next) {
    const { sku } = req.params;
    const cleanSku = sku.toUpperCase().replace(/[^A-Z0-9]/g, '');

    // 1. Base maestra de Alta Precisión (Códigos Específicos)
    const master_db = {
      'DAC408200402RS': { nombre: 'Rodamiento de Rueda Delantera (Doble Sello)', marca: 'Koyo / NTN', modelo: 'Varios / Universal', precio: 185, categoria: 'Suspensión' },
      'M129050110A': { nombre: 'Empaque de Culata (Laminado)', marca: 'King Long', modelo: 'View / Minibus', precio: 145, categoria: 'Motor' },
      'M130700020A': { nombre: 'Bomba de Agua Reforzada', marca: 'King Long', modelo: 'View', precio: 380, categoria: 'Motor' },
      '9091510001': { nombre: 'Filtro de Aceite Genuino', marca: 'Toyota', modelo: 'Caldina / Corolla', precio: 55, categoria: 'Motor' },
      'KY750': { nombre: 'Bobina de Encendido M70', marca: 'Keyton', modelo: 'Minibus M70', precio: 275, categoria: 'Motor' }
    };

    if (master_db[cleanSku]) {
      return res.status(StatusCodes.OK).json({ status: 'success', data: master_db[cleanSku] });
    }

    // 2. Motor de Heurística (Detección por Inteligencia de Código)
    let sugerencia = null;

    // Patrón Rodamientos (DAC / 6xxx / 3xxx / 90363)
    if (/^DAC/i.test(cleanSku) || cleanSku.startsWith('90363')) {
      sugerencia = { nombre: 'Rodamiento / Rulemán (Sugerido)', marca: 'Universal / Koyo', modelo: 'Varios', precio: 120, categoria: 'Suspensión' };
    } 
    // Patrón Filtros (FIL / 90915 / 15601)
    else if (cleanSku.startsWith('909') || cleanSku.startsWith('1560') || cleanSku.includes('FIL')) {
      sugerencia = { nombre: 'Filtro (Aceite/Aire/Gasolina)', marca: 'Toyota / Genérico', modelo: 'Universal', precio: 60, categoria: 'Motor' };
    }
    // Patrón Componentes Chinos (M12 / M13 / KY)
    else if (cleanSku.startsWith('M12') || cleanSku.startsWith('M13') || cleanSku.startsWith('KY')) {
      sugerencia = { nombre: 'Componente de Motor / Transmisión', marca: 'Chino (KL/Keyton)', modelo: 'Minibus', precio: 0, categoria: 'Motor' };
    }
    // Patrón Frenos (PAS / D... / 04465)
    else if (cleanSku.startsWith('D') || cleanSku.startsWith('04465')) {
      sugerencia = { nombre: 'Pastillas de Freno (Sugerido)', marca: 'Universal / Toyota', modelo: 'Varios', precio: 220, categoria: 'Frenos' };
    }

    if (sugerencia) {
      return res.status(StatusCodes.OK).json({ 
        status: 'success', 
        message: 'Info detectada por inteligencia de código', 
        data: sugerencia 
      });
    }

    res.status(StatusCodes.NOT_FOUND).json({ 
      status: 'error', 
      message: 'Código no reconocido. Sugerencia: Ingrese la marca manualmente.' 
    });
  }

  async subirImagen(req, res, next) {
    try {
      if (!req.file) {
        return res.status(StatusCodes.BAD_REQUEST).json({ status: 'error', message: 'No se subió ningún archivo' });
      }
      // Generar URL pública (asumiendo que corre en puerto 3000)
      const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      res.status(StatusCodes.OK).json({ status: 'success', url });
    } catch (error) { next(error); }
  }
}

module.exports = new ProductoController();
