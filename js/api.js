// 1. Definimos la URL de nuestro Backend (Reemplázala con tu URL real del puerto 3000)
const URL_BACKEND = "https://redesigned-fishstick-r76grrj57g9vh5jg-3000.app.github.dev";

// 2. Función para obtener los gastos (GET)


// 3. Función para guardar un gasto (POST)
async function guardarGastoAPI(gasto) {
    try {
        // Si el gasto ya tiene _id, es una edición (PUT). Si no, es creación (POST)
        const esEdicion = gasto._id !== undefined;
        const url = esEdicion ? `${URL_BACKEND}/api/expenses/${gasto._id}` : `${URL_BACKEND}/api/expenses`;
        const metodo = esEdicion ? "PUT" : "POST";

        const respuesta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gasto)
        });
        
        const gastoGuardado = await respuesta.json();
        console.log("Gasto guardado/actualizado en la API:", gastoGuardado);
        
        // Recargamos la lista desde la base de datos para reflejar los cambios
        await cargarGastosDesdeAPI();
    } catch (error) {
        console.error("Error al guardar gasto:", error);
    }
}


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

async function eliminarGastoAPI(id) {
    try {
        await fetch(`${URL_BACKEND}/api/expenses/${id}`, {
            method: "DELETE"
        });
        // Recargamos la lista para que desaparezca de la pantalla
        await cargarGastosDesdeAPI();
    } catch (error) {
        console.error("Error al eliminar gasto:", error);
    }
}

cargarGastosDesdeAPI();