// =====================
// DETECTAR UBICACIÓN Y AJUSTAR RUTAS
// =====================
function obtenerRutasNavbar() {
    // Detectar si estamos en la raíz o en una subcarpeta
    const path = window.location.pathname;
    const enPages = path.includes('/pages/');
    
    if (enPages) {
        // Estamos en pages/ (cat1.html, cat2.html, etc.)
        return {
            home: '../index.html',
            cat1: './cat1.html',
            cat2: './cat2.html',
            cat3: './cat3.html',
            aboutus: './aboutus.html',
            login: './login.html'
        };
    } else {
        // Estamos en la raíz (index.html)
        return {
            home: './index.html',
            cat1: './pages/cat1.html',
            cat2: './pages/cat2.html',
            cat3: './pages/cat3.html',
            aboutus: './pages/aboutus.html',
            login: './pages/login.html'
        };
    }
}

// =====================
// ESTRUCTURA DE DATOS DE PÁGINAS
// =====================
function obtenerPaginasNav() {
    const rutas = obtenerRutasNavbar();
    
    return [
        { url: rutas.home, titulo: 'Home' },
        { url: rutas.cat1, titulo: 'Indumentaria' },
        { url: rutas.cat2, titulo: 'Entrenamiento' },
        { url: rutas.cat3, titulo: 'Consumibles' },
        { url: rutas.aboutus, titulo: 'Acerca de' }
    ];
}

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
    
    // Obtener las páginas con rutas correctas
    const paginasNav = obtenerPaginasNav();
    const rutas = obtenerRutasNavbar();
    
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
            <a class="btn btn-outline-warning ms-2" href="${rutas.login}" onclick="return confirmarLogout()">Logout</a>
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