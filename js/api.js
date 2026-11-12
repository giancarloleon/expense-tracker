const URL_BACKEND = "https://expense-tracker-6xko.onrender.com";

// 2. Función para obtener los gastos (GET)


// 3. Función para guardar un gasto (POST)
async function guardarGastoAPI(gasto) {
    try {
        // Si el gasto ya tiene _id, es una edición (PUT). Si no, es creación (POST)
        const esEdicion = gasto._id !== undefined;
        const url = esEdicion ? `${URL_BACKEND}/api/expenses/${gasto._id}` : `${URL_BACKEND}/api/expenses`;
        const metodo = esEdicion ? "PUT" : "POST";
        
         const token = localStorage.getItem("token");
        const respuesta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Enviamos el pase VIP
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
        const token = localStorage.getItem("token");
        const respuesta = await fetch(`${URL_BACKEND}/api/expenses`, {
            headers: {
                "Authorization": `Bearer ${token}` // Enviamos el pase VIP
            }
        });
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
        const token = localStorage.getItem("token"); // Obtenemos el pase VIP
        
        const respuesta = await fetch(`${URL_BACKEND}/api/expenses/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}` // <-- ¡Enviamos el pase VIP!
            }
        });

        if (respuesta.ok) {
            // Recargamos la lista para que desaparezca de la pantalla
            await cargarGastosDesdeAPI();
        } else {
            const errorData = await respuesta.json();
            console.error("Error al eliminar:", errorData.mensaje);
            alert("No se pudo eliminar el gasto. Inicia sesión de nuevo.");
        }
    } catch (error) {
        console.error("Error de red al eliminar:", error);
    }
}


cargarGastosDesdeAPI();