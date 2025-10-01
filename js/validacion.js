// =====================
// REDIRECCIONES
// =====================

// Función para redirigir al usuario después del login
function redirectToHome() {
    window.location.href = '../index.html';
}

// Función para cerrar sesión y volver al login
function logout() {
    // Aquí puedes agregar lógica adicional como limpiar sesión
    window.location.href = './pages/login.html';
}

// Función para ir al login desde el registro
function redirectToLogin() {
    window.location.href = 'login.html';
}

// =====================
// VALIDACIÓN DE FORMULARIOS (Opcional para futuro)
// =====================

// Función para validar el formulario de login
function validateLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username.trim() === '' || password.trim() === '') {
        alert('Por favor completa todos los campos');
        return false;
    }
    
    // Aquí irían las validaciones reales
    // Por ahora solo redirigimos
    redirectToHome();
}

// Función para validar el formulario de registro
function validateRegister(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const fechaNacimiento = document.getElementById('fecha_nacimiento').value;
    
    if (nombre.trim() === '' || apellido.trim() === '' || 
        email.trim() === '' || password.trim() === '' || 
        fechaNacimiento === '') {
        alert('Por favor completa todos los campos');
        return false;
    }
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor ingresa un email válido');
        return false;
    }
    
    // Si todo está bien, redirigir al login
    alert('Registro exitoso! Ahora puedes iniciar sesión');
    redirectToLogin();
}