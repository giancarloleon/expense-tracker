// 1. Definimos la URL de nuestro Backend (Reemplázala con tu URL real del puerto 3000)
const URL_BACKEND = "https://redesigned-fishstick-r76grrj57g9vh5jg-3000.app.github.dev";

// 2. Función para obtener los gastos (GET)
async function obtenerGastosAPI() {
    try {
        const respuesta = await fetch(`${URL_BACKEND}/api/expenses`);
        const gastos = await respuesta.json();
        console.log("Gastos obtenidos de la API:", gastos);
        // Aquí luego llamaremos a una función para dibujarlos en pantalla
    } catch (error) {
        console.error("Error al obtener gastos:", error);
    }
}

// 3. Función para guardar un gasto (POST)
async function guardarGastoAPI(gasto) {
    try {
        const respuesta = await fetch(`${URL_BACKEND}/api/expenses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gasto) // Convertimos el objeto a texto JSON
        });
        const gastoGuardado = await respuesta.json();
        console.log("Gasto guardado en la API:", gastoGuardado);
        // Aquí luego actualizaremos la pantalla
    } catch (error) {
        console.error("Error al guardar gasto:", error);
    }
}

// Ejecutamos la prueba al cargar la página
obtenerGastosAPI();

async function cargarGastosDesdeAPI() {
    try {
        const respuesta = await fetch(`${URL_BACKEND}/api/expenses`);
        const gastosDelBackend = await respuesta.json();
        
        // Limpiamos el array actual y lo llenamos con los datos del backend
        expenses.length = 0; // Esto vacía el array sin perder la referencia
        gastosDelBackend.forEach(g => expenses.push(g));
        
        // Volvemos a dibujar la pantalla
        renderExpenses();
        calculateTotal();
        
    } catch (error) {
        console.error("Error al cargar gastos:", error);
    }
}