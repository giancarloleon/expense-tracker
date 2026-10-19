// 1. Obtenemos los elementos del DOM
const expenseForm = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const totalExpenses = document.getElementById("total-expenses");
const expenseList = document.getElementById("expense-list");

// 2. El array donde guardaremos los gastos
const expenses = [];
// 3. Recuperar datos de localStorage al cargar la página
const storedExpenses = localStorage.getItem("expenses");

if (storedExpenses !== null) {
    // Si hay datos, los convertimos de string a array
    const parsedExpenses = JSON.parse(storedExpenses);
    
    // Y los metemos en nuestro array principal usando push y forEach
    parsedExpenses.forEach(function(expense) {
        expenses.push(expense);
    });
}
// 4. Función para mostrar los gastos en la página
function renderExpenses() {
    expenseList.innerHTML = ""; // Limpiamos la lista

    expenses.forEach(function(expense, index) {
        const expenseElement = document.createElement("div");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";

        deleteButton.addEventListener("click", function() {
            expenses.splice(index, 1);
            localStorage.setItem("expenses", JSON.stringify(expenses)); // Actualizamos localStorage al borrar
            renderExpenses();
            calculateTotal();
        });

        expenseElement.innerHTML = `
            <h3>${expense.description}</h3>
            <p>Monto: S/ ${expense.amount}</p>
            <p>Categoría: ${expense.category}</p>
            <p>Fecha: ${expense.date}</p>
            <p>Hora: ${expense.time}</p>
        `;

        expenseElement.appendChild(deleteButton);
        expenseList.appendChild(expenseElement);
    });
}

// 5. Función para calcular el total
function calculateTotal() {
    let total = 0;
    expenses.forEach(function(expense) {
        total += expense.amount;
    });
    totalExpenses.textContent = `S/ ${total.toFixed(2)}`;
}
// 6. Evento para agregar un nuevo gasto
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const description = descriptionInput.value;
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;
    const time = timeInput.value;

    const expense = {
        description: description,
        amount: amount,
        category: category,
        date: date,
        time: time
    };

    expenses.push(expense);
    
    // Guardamos en localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    renderExpenses();
    calculateTotal();

    // Limpiamos el formulario (opcional, pero buena práctica)
    expenseForm.reset();
});

// 7. Ejecutamos al cargar la página
// Esto dibujará los gastos recuperados de localStorage y calculará el total
renderExpenses();
calculateTotal();
