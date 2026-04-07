const nodemailer = require('nodemailer');

class ServicioEmail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || 'test@example.com',
        pass: process.env.EMAIL_PASS || 'testpassword',
      },
    });
  }

  async enviarEmailFactura(emailCliente, datosVenta) {
    try {
      const info = await this.transporter.sendMail({
        from: '"Sistema Repuestos Auto" <noreply@repuestos.com>',
        to: emailCliente,
        subject: `Factura ${datosVenta.Factura.numero_factura} - Repuestos Auto`,
        html: `
          <h1>Gracias por su compra</h1>
          <p>Hola, adjuntamos el detalle de su compra:</p>
          <table border="1" style="width:100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>P. Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${datosVenta.detalles.map(item => `
                <tr>
                  <td>${item.Producto ? item.Producto.nombre : 'Producto'}</td>
                  <td>${item.cantidad}</td>
                  <td>Bs. ${item.precio_unitario}</td>
                  <td>Bs. ${item.subtotal}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p><strong>Subtotal:</strong> Bs. ${datosVenta.subtotal}</p>
          <p><strong>IVA (15%):</strong> Bs. ${datosVenta.total_impuesto}</p>
          <h3><strong>Total a Pagar:</strong> Bs. ${datosVenta.total}</h3>
          <p>Factura No: ${datosVenta.Factura.numero_factura}</p>
          <p>Esperamos verle pronto.</p>
        `,
      });
      console.log('Correo enviado: %s', info.messageId);
      return true;
    } catch (error) {
      console.error('Error enviando correo:', error);
      return false;
    }
  }
}

module.exports = new ServicioEmail();
