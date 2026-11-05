// 1. Importamos Express
const express = require("express");



// 2. Creamos la aplicación de Express
const app = express();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./Models/User"); // Importamos el modelo de usuario
const JWT_SECRET = "mi_palabra_secreta_super_segura"; // Luego la moveremos al .env

const cors = require("cors"); // Arriba, junto a express
// ...
const mongoose = require("mongoose");
require("dotenv").config(); // Carga las variables del .env

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));
// 3. Definimos un puerto
const PORT = 3000;

const Expense = require("./Models/Expense"); // <-- Importamos el modelo

// 4. Middleware para que Express entienda JSON
app.use(express.json());

// Permitir peticiones desde cualquier origen (útil en desarrollo con Codespaces)
// Configuración de CORS para producción
app.use(cors({
    origin: [
        "https://expense-tracker-iota-azure.vercel.app", // Tu URL de Producción
        /https:\/\/expense-tracker-.*\.vercel\.app$/     // Permite URLs de Preview de Vercel
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// Middleware para verificar el Token
function verificarToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ mensaje: "Acceso denegado. No hay token." });

    try {
        // Verificamos que el token sea válido
        const verificado = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
        req.userId = verificado.id; // Guardamos el ID del usuario en la petición
        next(); // Le decimos que puede pasar
    } catch (error) {
        res.status(400).json({ mensaje: "Token inválido" });
    }
}
// 1. GET: Obtener todos los gastos
// GET: Solo devuelve los gastos del usuario logueado
app.get("/api/expenses", verificarToken, async function(req, res) {
    try {
        const gastos = await Expense.find({ userId: req.userId }); // Filtramos por dueño
        res.json(gastos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener gastos" });
    }
});

// POST: Guarda el gasto con el ID del usuario
app.post("/api/expenses", verificarToken, async function(req, res) {
    try {
        const nuevoGasto = new Expense({ ...req.body, userId: req.userId }); // Le asignamos el dueño
        await nuevoGasto.save(); 
        res.status(201).json(nuevoGasto);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al guardar el gasto" });
    }
});

// 3. PUT: Actualizar un gasto existente
app.put("/api/expenses/:id", verificarToken, async function(req, res) {
    try {
        // Quitamos el _id del body para que Mongo no se confunda al actualizar
        const { _id, ...datosActualizados } = req.body;
        
        const gastoActualizado = await Expense.findByIdAndUpdate(req.params.id, datosActualizados, { new: true });
        if (gastoActualizado) {
            res.json(gastoActualizado);
        } else {
            res.status(404).json({ mensaje: "Gasto no encontrado" });
        }
    } catch (error) {
        console.error("❌ Error al actualizar:", error.message);
        res.status(400).json({ mensaje: "Error al actualizar", error: error.message });
    }
});

// 4. DELETE: Eliminar un gasto
app.delete("/api/expenses/:id", verificarToken, async function(req, res) {
    try {
        const gastoEliminado = await Expense.findByIdAndDelete(req.params.id);
        if (gastoEliminado) {
            res.json({ mensaje: "Gasto eliminado correctamente" });
        } else {
            res.status(404).json({ mensaje: "Gasto no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ mensaje: "Error al eliminar", error });
    }
});

app.listen(PORT, "0.0.0.0", function() {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// RUTA DE REGISTRO
app.post("/api/register", async function(req, res) {
    try {
        const { email, password } = req.body;

        // 1. Verificar si el usuario ya existe
        const usuarioExiste = await User.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: "El correo ya está registrado" });
        }

        // 2. Encriptar la contraseña (el "10" es el nivel de seguridad)
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = await bcrypt.hash(password, salt);

        // 3. Guardar el usuario en MongoDB
        const nuevoUsuario = new User({ email, password: passwordEncriptada });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: "Usuario creado exitosamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});

// RUTA DE LOGIN
app.post("/api/login", async function(req, res) {
    try {
        const { email, password } = req.body;

        // 1. Buscar al usuario por email
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensaje: "Credenciales inválidas" });
        }

        // 2. Comparar la contraseña que escribió con la encriptada en la base de datos
        const passwordCorrecta = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecta) {
            return res.status(400).json({ mensaje: "Credenciales inválidas" });
        }

        // 3. Crear el Token (Pase VIP)
        const token = jwt.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: "1d" });

        res.json({ token: token, mensaje: "Login exitoso" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});