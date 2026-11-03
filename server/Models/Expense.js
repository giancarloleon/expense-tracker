const mongoose = require("mongoose");

// Creamos el "molde" (Schema) de cómo se ve un gasto
const ExpenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: String,
    time: String
}, { timestamps: true }); // timestamps guarda automáticamente createdAt y updatedAt

// Exportamos el modelo (la Clase) para usarlo en otras partes
module.exports = mongoose.model("Expense", ExpenseSchema);