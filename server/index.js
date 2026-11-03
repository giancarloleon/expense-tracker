// 1. Importamos Express
const express = require("express");

// 2. Creamos la aplicación de Express
const app = express();

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
app.use(cors({
    origin: "https://expense-tracker-iota-azure.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// 1. GET: Obtener todos los gastos
app.get("/api/expenses", async function(req, res) {
    try {
        // Busca todos los documentos en la colección de MongoDB
        const gastos = await Expense.find(); 
        res.json(gastos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener gastos", error });
    }
});

// 2. POST: Crear un nuevo gasto
app.post("/api/expenses", async function(req, res) {
    try {
        const nuevoGasto = new Expense(req.body); 
        await nuevoGasto.save(); 
        res.status(201).json(nuevoGasto);
    } catch (error) {
        console.error("❌ Error de Mongoose:", error.message); // <-- ESTO NOS DIRÁ QUÉ PASA
        res.status(400).json({ mensaje: "Error al guardar el gasto", error: error.message });
    }
});

// 3. PUT: Actualizar un gasto existente
app.put("/api/expenses/:id", async function(req, res) {
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
app.delete("/api/expenses/:id", async function(req, res) {
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
