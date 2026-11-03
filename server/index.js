// 1. Importamos Express
const express = require("express");

// 2. Creamos la aplicación de Express
const app = express();

const cors = require("cors"); // Arriba, junto a express
// ...

// 3. Definimos un puerto
const PORT = 3000;

// 4. Middleware para que Express entienda JSON
app.use(express.json());

app.use(cors()); // Debajo de app.use(express.json());

// 5. Creamos nuestra primera ruta
app.get("/api/saludo", function(req, res) {
    res.json({ mensaje: "¡Hola desde el Backend con Node.js y Express!" });
});

// Simulamos una base de datos con un array
let gastos = [];

// 1. GET: Obtener todos los gastos
app.get("/api/expenses", function(req, res) {
    res.json(gastos);
});

// 2. POST: Crear un nuevo gasto
app.post("/api/expenses", function(req, res) {
    const nuevoGasto = req.body; // Aquí llegan los datos del Frontend
    nuevoGasto.id = Date.now();  // Le generamos el ID único
    gastos.push(nuevoGasto);
    res.status(201).json(nuevoGasto); // 201 significa "Creado"
});

// 3. PUT: Actualizar un gasto existente
app.put("/api/expenses/:id", function(req, res) {
    const idBuscado = Number(req.params.id);
    
    // Buscamos el gasto por su ID
    const gastoIndex = gastos.findIndex(g => g.id === idBuscado);
    
    if (gastoIndex !== -1) {
        // Si lo encuentra, actualiza los datos
        gastos[gastoIndex] = { ...gastos[gastoIndex], ...req.body };
        res.json(gastos[gastoIndex]);
    } else {
        res.status(404).json({ mensaje: "Gasto no encontrado" });
    }
});

// 4. DELETE: Eliminar un gasto
app.delete("/api/expenses/:id", function(req, res) {
    const idBuscado = Number(req.params.id);
    
    // Filtramos el array para quitar el gasto con ese ID
    const gastosFiltrados = gastos.filter(g => g.id !== idBuscado);
    
    if (gastosFiltrados.length !== gastos.length) {
        gastos = gastosFiltrados;
        res.json({ mensaje: "Gasto eliminado" });
    } else {
        res.status(404).json({ mensaje: "Gasto no encontrado" });
    }
});

// 6. Levantamos el servidor
app.listen(PORT, function() {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



