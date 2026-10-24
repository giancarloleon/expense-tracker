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
// Variable para saber qué gasto estamos editando (null significa que estamos creando uno nuevo)
let editingExpenseId = null;
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
        // 1. CREAMOS EL CONTENEDOR PRINCIPAL DEL GASTO (¡Esto era lo que faltaba!)
        const expenseElement = document.createElement("div");
        
        // 2. CREAMOS EL CONTENEDOR DE LOS BOTONES
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-group"); 

                // 3. BOTÓN EDITAR
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.addEventListener("click", function() {
            // 1. Llenamos el formulario con los datos del gasto
            descriptionInput.value = expense.description;
            amountInput.value = expense.amount;
            categoryInput.value = expense.category;
            dateInput.value = expense.date;
            timeInput.value = expense.time;

            // 2. Guardamos el ID en nuestra variable global
            editingExpenseId = expense.id;

            // 3. Cambiamos el texto del botón de enviar
            const submitButton = expenseForm.querySelector("button[type='submit']");
            submitButton.textContent = "Guardar cambios";
            
            // 4. Hacemos scroll hacia arriba para que el usuario vea el formulario
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // 4. BOTÓN ELIMINAR
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", function() {
            expenses.splice(index, 1);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            renderExpenses();
            calculateTotal();
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
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtenemos los valores del formulario
    const description = descriptionInput.value;
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;
    const time = timeInput.value;

    // ¿Estamos editando o creando?
        if (editingExpenseId !== null) {
        // MODO EDICIÓN: Buscamos el gasto por su ID
        const expenseToEdit = expenses.find(function(expense) {
            return expense.id === editingExpenseId;
        });

        // Si lo encontramos, actualizamos sus datos
        if (expenseToEdit) {
            expenseToEdit.description = description;
            expenseToEdit.amount = amount;
            expenseToEdit.category = category;
            expenseToEdit.date = date;
            expenseToEdit.time = time;
        }

        // Reseteamos la variable para volver al modo normal
        editingExpenseId = null; 
        
        // Devolvemos el texto al botón
        const submitButton = expenseForm.querySelector("button[type='submit']");
        submitButton.textContent = "Agregar gasto";

    } else {
        // MODO CREACIÓN: Es un gasto nuevo
        const expense = {
            id: Date.now(),
            description: description,
            amount: amount,
            category: category,
            date: date,
            time: time
        };
        expenses.push(expense);
    }
    
    // Guardamos en localStorage (ya sea el nuevo o el editado)
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Actualizamos pantalla
    renderExpenses();
    calculateTotal();

    // Limpiamos el formulario
    expenseForm.reset();
});

// 7. Ejecutamos al cargar la página
// Esto dibujará los gastos recuperados de localStorage y calculará el total
renderExpenses();
calculateTotal();
