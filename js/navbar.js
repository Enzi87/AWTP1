// =====================
// ESTRUCTURA DE DATOS DE PÁGINAS
// =====================

const paginasNav = [
    { url: '../index.html', titulo: 'Home' },
    { url: './cat1.html', titulo: 'Indumentaria' },
    { url: './cat2.html', titulo: 'Entrenamiento' },
    { url: './cat3.html', titulo: 'Consumibles' },
    { url: './aboutus.html', titulo: 'Acerca de' }
];

// =====================
// FUNCIÓN PARA GENERAR EL NAVBAR
// =====================

function generarNavbar(paginaActiva) {
    // Obtener el contenedor del navbar
    const navbarContainer = document.getElementById('navbarNav');
    
    if (!navbarContainer) {
        console.error('No se encontró el contenedor del navbar');
        return;
    }
    
    // Crear la lista de navegación
    let navbarHTML = '<ul class="navbar-nav ms-auto">';
    
    // Agregar cada página al navbar
    paginasNav.forEach(pagina => {
        const isActive = pagina.titulo === paginaActiva ? 'active' : '';
        navbarHTML += `
            <li class="nav-item">
                <a class="nav-link ${isActive}" href="${pagina.url}">${pagina.titulo}</a>
            </li>
        `;
    });
    
    // Agregar el botón de logout
    navbarHTML += `
        <li class="nav-item">
            <a class="btn btn-outline-warning ms-2" href="./login.html" onclick="return confirmarLogout()">Logout</a>
        </li>
    `;
    
    navbarHTML += '</ul>';
    
    // Insertar el navbar generado
    navbarContainer.innerHTML = navbarHTML;
}

// =====================
// FUNCIÓN PARA CONFIRMAR LOGOUT
// =====================

function confirmarLogout() {
    return confirm('¿Estás seguro que deseas cerrar sesión?');
}

// =====================
// INICIALIZAR NAVBAR AUTOMÁTICAMENTE
// =====================

// Esta función se ejecuta cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Detectar la página actual basándose en el título o URL
    const pageTitle = document.querySelector('title').textContent;
    
    let paginaActiva = 'Home';
    
    if (pageTitle.includes('Indumentaria') || pageTitle.includes('indumentaria')) {
        paginaActiva = 'Indumentaria';
    } else if (pageTitle.includes('Entrenamiento') || pageTitle.includes('entrenamiento')) {
        paginaActiva = 'Entrenamiento';
    } else if (pageTitle.includes('Consumibles') || pageTitle.includes('consumibles')) {
        paginaActiva = 'Consumibles';
    } else if (pageTitle.includes('Acerca')) {
        paginaActiva = 'Acerca de';
    }
    
    generarNavbar(paginaActiva);
});