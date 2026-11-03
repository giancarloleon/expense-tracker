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
        alert("No se pudo guardar el gasto. Puede que el servidor esté despertando. Intenta de nuevo en unos segundos.");
    }
}


async function cargarGastosDesdeAPI() {
    const loadingMsg = document.getElementById("loading-message");
    if (loadingMsg) loadingMsg.style.display = "block";

    try {
        const respuesta = await fetch(`${URL_BACKEND}/api/expenses`);
        const gastosDelBackend = await respuesta.json();
        
        expenses.length = 0;
        gastosDelBackend.forEach(g => expenses.push(g));
        
        renderExpenses();
        calculateTotal();
        
        if (loadingMsg) loadingMsg.style.display = "none"; // Ocultar al terminar
    } catch (error) {
        console.error("Error al cargar gastos:", error);
        if (loadingMsg) loadingMsg.textContent = "Error al conectar con el servidor. Recarga la página.";
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