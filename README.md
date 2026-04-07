# Sistema de Venta de Repuestos - Backend Profesional

Este es un backend profesional desarrollado con **Node.js**, **Express** y **PostgreSQL**, diseñado para gestionar un sistema de venta de repuestos de autos con facturación integrada.

## 🚀 Características
- **Arquitectura Limpia**: Separación por capas (Controladores, Servicios, Repositorios, Modelos, Rutas).
- **Base de Datos**: PostgreSQL con Sequelize ORM.
- **Identificadores Únicos**: Uso de UUID v4 en todas las tablas.
- **Autenticación**: JWT (JSON Web Tokens) con roles (`admin`, `vendedor`).
- **Facturación Completa**:
  - Registro de ventas transaccional.
  - Control de inventario automático (descuento de stock).
  - Cálculo de impuestos (IVA 15%).
  - Generación de número de factura único.
  - Anulación de ventas con retorno de stock.
- **Email**: Envío automático de facturas por correo electrónico (Nodemailer).
- **Documentación**: API documentada con **Swagger**.
- **Seguridad**: Helmet, CORS y encriptación de contraseñas con bcryptjs.

## 🛠️ Estructura del Proyecto
- `src/config/`: Configuración de base de datos y variables de entorno.
- `src/models/`: Modelos de Sequelize (Usuarios, Productos, Ventas, etc.).
- `src/services/`: Lógica de negocio (Cálculos de factura, envío de emails, validación de stock).
- `src/controllers/`: Manejo de peticiones HTTP.
- `src/routes/`: Definición de endpoints y validaciones.
- `migrations/`: Historial de cambios en la base de datos.
- `seeders/`: Datos iniciales de prueba.

## 📋 Requisitos Previos
- Node.js (v14 o superior)
- PostgreSQL corriendo localmente
- Una base de datos llamada `repuestos_db`

## ⚙️ Instalación y Configuración

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   Edita el archivo `.env` con tus credenciales de PostgreSQL:
   ```env
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña
   DB_NAME=repuestos_db
   ```

3. **Ejecutar Migraciones y Datos Iniciales**:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. **Iniciar el servidor**:
   ```bash
   npm run dev
   ```

## 📖 Uso de la API
Una vez iniciado el servidor, puedes acceder a:
- **API Base**: `http://localhost:3000/api/v1`
- **Documentación Swagger**: `http://localhost:3000/api-docs`

### Credenciales de Prueba (Seeder)
- **Usuario**: `admin@repuestos.com`
- **Password**: `admin123`

## 📧 Facturación por Email
El sistema usa **Ethereal Email** por defecto para pruebas. Puedes ver los correos enviados en la consola del servidor o configurar tu propio servicio SMTP en el `.env`.

---
Desarrollado para la gestión eficiente de repuestos automotrices.
