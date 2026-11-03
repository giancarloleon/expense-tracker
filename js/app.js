// 1. Obtenemos los elementos del DOM
const expenseForm = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const totalExpenses = document.getElementById("total-expenses");
const expenseList = document.getElementById("expense-list");

// Al cargar la página, ponemos la fecha y hora actuales por defecto
function establecerFechaHoraActual() {
    const ahora = new Date();
    
    // Formatear la fecha como YYYY-MM-DD (el estándar que usa el input date)
    const year = ahora.getFullYear();
    const month = String(ahora.getMonth() + 1).padStart(2, '0');
    const day = String(ahora.getDate()).padStart(2, '0');
    dateInput.value = `${year}-${month}-${day}`;
    
    // Formatear la hora como HH:MM
    const hours = String(ahora.getHours()).padStart(2, '0');
    const minutes = String(ahora.getMinutes()).padStart(2, '0');
    timeInput.value = `${hours}:${minutes}`;
}

// Ejecutamos la función al cargar
establecerFechaHoraActual();

// 2. El array donde guardaremos los gastos
const expenses = [];
// Variable para saber qué gasto estamos editando (null significa que estamos creando uno nuevo)
let editingExpenseId = null;
// 3. Recuperar datos de localStorage al cargar la página
/**********************************const storedExpenses = localStorage.getItem("expenses");

if (storedExpenses !== null) {
    // Si hay datos, los convertimos de string a array
    const parsedExpenses = JSON.parse(storedExpenses);
    
    // Y los metemos en nuestro array principal usando push y forEach
    parsedExpenses.forEach(function(expense) {
        expenses.push(expense);
    });
}**********************************************************************************/
// 4. Función para mostrar los gastos en la página
function renderExpenses() {
    expenseList.innerHTML = ""; // Limpiamos la lista

    expenses.forEach(function(expense, index) {
        // 1. CREAMOS EL CONTENEDOR PRINCIPAL DEL GASTO (¡Esto era lo que faltaba!)
        const expenseElement = document.createElement("div");
        
        // 2. CREAMOS EL CONTENEDOR DE LOS BOTONES
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-group"); 

                     // 3. BOTÓN EDITAR
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.addEventListener("click", function() {
            // Llenamos el formulario
            descriptionInput.value = expense.description;
            amountInput.value = expense.amount;
            categoryInput.value = expense.category;
            dateInput.value = expense.date;
            timeInput.value = expense.time;

            // ¡AQUÍ ESTÁ EL CAMBIO! Guardamos el _id de Mongo, no el id
            editingExpenseId = expense._id;

            // Cambiamos el texto del botón
            const submitButton = expenseForm.querySelector("button[type='submit']");
            submitButton.textContent = "Guardar cambios";
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // 4. BOTÓN ELIMINAR
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", async function() {
            // Llamamos a la función de la API pasándole el _id de Mongo
            await eliminarGastoAPI(expense._id);
        });

        // 5. AGREGAMOS BOTONES AL CONTENEDOR
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        // 6. AGREGAMOS EL HTML DEL GASTO
        expenseElement.innerHTML = `
            <h3>${expense.description}</h3>
            <p>Monto: S/ ${expense.amount}</p>
            <p>Categoría: ${expense.category}</p>
            <p>Fecha: ${expense.date}</p>
            <p>Hora: ${expense.time}</p>
        `;

        // 7. AGREGAMOS LOS BOTONES AL GASTO Y EL GASTO A LA LISTA
        expenseElement.appendChild(buttonContainer);
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
expenseForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const expense = {
        description: descriptionInput.value,
        amount: Number(amountInput.value),
        category: categoryInput.value,
        date: dateInput.value,
        time: timeInput.value
    };

    // Si estamos editando, le pasamos el _id que guardamos del botón
    if (editingExpenseId !== null) {
        expense._id = editingExpenseId;
    }

    // Guardamos en la API
    await guardarGastoAPI(expense);

    // Limpiamos el formulario y volvemos al estado normal
    expenseForm.reset();
    editingExpenseId = null; 
    
    const submitButton = expenseForm.querySelector("button[type='submit']");
    submitButton.textContent = "Agregar gasto";
    
    establecerFechaHoraActual();
});

