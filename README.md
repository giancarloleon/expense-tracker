# Expense Tracker 💸

Una aplicación web Fullstack para registrar y controlar gastos personales. Este proyecto fue construido desde cero como parte de mi portafolio para demostrar habilidades en el desarrollo web moderno, abarcando desde la interfaz de usuario hasta el despliegue en la nube.

## ⚠️ Nota sobre el rendimiento
Este proyecto está desplegado utilizando las capas gratuitas de **Render** y **Vercel**. 
- El servidor backend en Render se "duerme" automáticamente después de 15 minutos de inactividad para ahorrar recursos.
- **¿Qué significa esto?** Si intentas iniciar sesión o guardar un gasto y la aplicación tarda unos segundos (o muestra un mensaje de "Cargando..."), es normal. El servidor está "despertando". 
- Por favor, ten paciencia: la primera petición puede tardar hasta **50 segundos** en responder. Las siguientes serán inmediatas.

##  Demo en vivo
- **Frontend:** [https://expense-tracker-iota-azure.vercel.app](https://expense-tracker-iota-azure.vercel.app)
- **Backend API:** [https://expense-tracker-6xko.onrender.com/api/expenses](https://expense-tracker-6xko.onrender.com/api/expenses)

##  Credenciales de prueba
Para probar la aplicación sin necesidad de registrarte, puedes usar:
- **Email:** `prueba@test.com`
- **Contraseña:** `123456`

## Capturas de pantalla

| Inicio de Sesión | 
| :---: | 

<img width="1127" height="1752" alt="login Responsive" src="https://github.com/user-attachments/assets/103a87a3-518c-41a6-8e9b-6f6e6c6ed239" />

| Home | 
| :---: | 

<img width="3838" height="1788" alt="Home" src="https://github.com/user-attachments/assets/ca3433f9-a2cc-4bbd-8bb6-890fd24fd1bf" />
<img width="720" height="1600" alt="Responsive" src="https://github.com/user-attachments/assets/ad533e72-578c-4850-a9e2-232ac74ba0cc" />
<img width="720" height="1600" alt="Home  responsive" src="https://github.com/user-attachments/assets/9b18e5a3-b68c-4e56-a479-ab325d5526ac" />

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

