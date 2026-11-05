# Expense Tracker 💸

Una aplicación web Fullstack para registrar y controlar gastos personales. Este proyecto fue construido desde cero como parte de mi portafolio para demostrar habilidades en el desarrollo web moderno, abarcando desde la interfaz de usuario hasta el despliegue en la nube.

## Demo en vivo
- **Frontend:** [https://expense-tracker-iota-azure.vercel.app](https://expense-tracker-iota-azure.vercel.app)
- **Backend API:** [https://expense-tracker-6xko.onrender.com/api/expenses](https://expense-tracker-6xko.onrender.com/api/expenses)

## Características
- **CRUD Completo:** Crear, leer, actualizar y eliminar gastos.
- **Persistencia en la nube:** Los datos se guardan en MongoDB Atlas, por lo que no se pierden al recargar o cambiar de dispositivo.
- **Diseño Responsive:** Adaptado para computadoras y teléfonos móviles.
- **Feedback visual:** Mensajes de carga y manejo de errores si la API tarda en responder (útil en planes gratuitos de hosting).
- **Seguridad:** Configuración de CORS para permitir solo peticiones desde dominios autorizados.

## Tecnologías utilizadas
**Frontend:**
- HTML5, CSS3 (Flexbox, Grid, Media Queries)
- JavaScript Vanilla (Fetch API, async/await, manipulación del DOM)

**Backend:**
- Node.js y Express.js
- MongoDB (MongoDB Atlas) y Mongoose
- CORS y Dotenv

**Despliegue y Control de Versiones:**
- Frontend en Vercel
- Backend en Render
- Git y GitHub

## Arquitectura del proyecto
- `/index.html` - Punto de entrada del Frontend.
- `/css/` - Estilos y diseño responsive.
- `/js/` - Lógica del Frontend (`app.js`, `api.js`).
- `/server/` - Código del Backend.
  - `/Models/` - Esquemas de la base de datos (Mongoose).
  - `/index.js` - Servidor Express y rutas de la API.

## Próximos pasos (Roadmap)
- [ ] Implementar autenticación de usuarios (Login/Registro) con JWT.
- [ ] Agregar filtros por categoría y fechas.
- [ ] Mejorar el manejo de errores y estados de carga.