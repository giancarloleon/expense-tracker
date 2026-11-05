const API_URL = "https://expense-tracker-6xko.onrender.com/api";//produccion
//const API_URL = "https://refactored-barnacle-9659qqpg66q4hw77-3000.app.github.dev/api";// local

const loginSection = document.getElementById("auth-section");
const registerSection = document.getElementById("register-section");
const appSection = document.getElementById("app-section");

// Lógica para mostrar/ocultar formularios
document.getElementById("show-register").addEventListener("click", (e) => {
    e.preventDefault();
    loginSection.style.display = "none";
    registerSection.style.display = "block";
});

document.getElementById("show-login").addEventListener("click", (e) => {
    e.preventDefault();
    registerSection.style.display = "none";
    loginSection.style.display = "block";
});

// Lógica de Registro
document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        
        if (res.ok) {
            alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
            document.getElementById("show-login").click();
        } else {
            alert(data.mensaje);
        }
    } catch (error) {
        alert("Error al conectar con el servidor.");
    }
});

// Lógica de Login
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok) {
            // Guardamos el Token en el navegador (localStorage, ¡esta vez para el token sí está bien!)
            localStorage.setItem("token", data.token);
            
            // Mostramos la app y ocultamos el login
            loginSection.style.display = "none";
            appSection.style.display = "block";
            
            // Cargamos los gastos de este usuario
            if (typeof cargarGastosDesdeAPI === "function") {
                cargarGastosDesdeAPI();
            }
        } else {
            alert(data.mensaje);
        }
    } catch (error) {
        alert("Error al conectar con el servidor.");
    }
});

// Verificar si el usuario ya estaba logueado al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token) {
        loginSection.style.display = "none";
        appSection.style.display = "block";
        if (typeof cargarGastosDesdeAPI === "function") {
            cargarGastosDesdeAPI();
        }
    }
});