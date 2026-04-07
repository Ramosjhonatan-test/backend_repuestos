const { Venta, DetalleVenta, Producto, Factura, Cliente, sequelize } = require('../models');
const { v4: uuidv4 } = require('uuid');
const ServicioEmail = require('./email.service');

class ServicioVenta {
  async crearVenta(datosVenta, detalles) {
    const t = await sequelize.transaction();

    try {
      let subtotal = 0;
      const registrosDetalle = [];

      for (const item of detalles) {
        const producto = await Producto.findByPk(item.producto_id, { transaction: t });
        
        if (!producto || producto.stock < item.cantidad) {
          throw new Error(`Stock insuficiente o producto no encontrado para: ${producto ? producto.nombre : item.producto_id}`);
        }

        const subtotalItem = parseFloat(producto.precio) * item.cantidad;
        subtotal += subtotalItem;

        registrosDetalle.push({
          producto_id: item.producto_id,
          cantidad: item.cantidad,
          precio_unitario: producto.precio,
          subtotal: subtotalItem
        });

        // Actualizar stock
        await producto.update({ stock: producto.stock - item.cantidad }, { transaction: t });
      }

      const tasaImpuesto = 16.00; 
      const totalImpuesto = subtotal * (tasaImpuesto / 100);
      const total = subtotal + totalImpuesto;

      const venta = await Venta.create({
        ...datosVenta,
        metodo_pago: datosVenta.metodo_pago || 'efectivo',
        subtotal,
        tasa_impuesto: tasaImpuesto,
        total_impuesto: totalImpuesto,
        total,
        estado: 'completada'
      }, { transaction: t });

      for (const registro of registrosDetalle) {
        await DetalleVenta.create({
          ...registro,
          venta_id: venta.id
        }, { transaction: t });
      }

      // Generar Factura
      const numeroFactura = `FAC-${new Date().getFullYear()}-${uuidv4().substring(0, 8).toUpperCase()}`;
      await Factura.create({
        venta_id: venta.id,
        numero_factura: numeroFactura,
        metodo_pago: datosVenta.metodo_pago || 'efectivo',
      }, { transaction: t });

      await t.commit();
      
      const ventaCompleta = await Venta.findByPk(venta.id, {
        include: [
          { model: DetalleVenta, as: 'detalles', include: [Producto] }, 
          { model: Factura, as: 'Factura' },
          { model: Cliente, as: 'Cliente' }
        ]
      });

      // Enviar correo si el cliente tiene email
      if (ventaCompleta.Cliente && ventaCompleta.Cliente.email) {
        ServicioEmail.enviarEmailFactura(ventaCompleta.Cliente.email, ventaCompleta);
      }

      return ventaCompleta;

    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async anularVenta(ventaId) {
    const t = await sequelize.transaction();

    try {
      const venta = await Venta.findByPk(ventaId, {
        include: [{ model: DetalleVenta, as: 'detalles' }],
        transaction: t
      });

      if (!venta) {
        const error = new Error('Venta no encontrada');
        error.status = 404;
        throw error;
      }

      if (venta.estado === 'anulada') {
        throw new Error('La venta ya está anulada');
      }

      // Devolver stock
      for (const detalle of venta.detalles) {
        const producto = await Producto.findByPk(detalle.producto_id, { transaction: t });
        if (producto) {
          await producto.update({ stock: producto.stock + detalle.cantidad }, { transaction: t });
        }
      }

      // Actualizar estado
      await venta.update({ estado: 'anulada' }, { transaction: t });

      await t.commit();
      return venta;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async obtenerVentas() {
    return await Venta.findAll({
      include: ['Cliente', 'Usuario', { model: DetalleVenta, as: 'detalles', include: [Producto] }, 'Factura'],
      order: [['created_at', 'DESC']]
    });
  }
}

module.exports = new ServicioVenta();
