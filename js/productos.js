// =====================
// VARIABLES GLOBALES
// =====================
let todosLosProductos = [];

// =====================
// FUNCIÓN PARA CARGAR PRODUCTOS DESDE JSON
// =====================
async function cargarProductos() {
    try {
        const response = await fetch('../data/productos.json');
        
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        
        const data = await response.json();
        todosLosProductos = data.productos;
        
        return todosLosProductos;
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudieron cargar los productos. Por favor, recarga la página.');
        return [];
    }
}

// =====================
// FUNCIÓN PARA OBTENER PRODUCTOS POR CATEGORÍA
// =====================
function obtenerProductosPorCategoria(categoria) {
    return todosLosProductos.filter(producto => producto.categoria === categoria);
}

// =====================
// FUNCIÓN PARA OBTENER PRODUCTOS DESTACADOS
// =====================
function obtenerProductosDestacados(limite = null) {
    const destacados = todosLosProductos.filter(producto => producto.destacado);
    return limite ? destacados.slice(0, limite) : destacados;
}

// =====================
// FUNCIÓN PARA OBTENER PRODUCTOS DESTACADOS POR CATEGORÍA
// =====================
function obtenerDestacadosPorCategoria(limite = 2) {
    const categorias = ['indumentaria', 'entrenamiento', 'consumibles'];
    const resultado = [];
    
    categorias.forEach(categoria => {
        const productosCategoria = todosLosProductos
            .filter(p => p.categoria === categoria)
            .sort((a, b) => b.precio - a.precio) // Ordenar por precio descendente
            .slice(0, limite);
        
        resultado.push(...productosCategoria);
    });
    
    return resultado;
}

// =====================
// FUNCIÓN PARA CREAR UNA CARD DE PRODUCTO
// =====================
function crearCardProducto(producto) {
    return `
        <div class="col-md-4">
            <div class="card h-100 shadow-sm">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 250px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <div class="mt-auto">
                        <p class="fw-bold text-success">$${producto.precio.toFixed(2)}</p>
                        
                        <!-- Controles de cantidad -->
                        <div class="d-flex align-items-center justify-content-center mb-3">
                            <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${producto.id}, -1)">
                                <strong>-</strong>
                            </button>
                            <span class="mx-3 fw-bold" id="cantidad-${producto.id}">1</span>
                            <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${producto.id}, 1)">
                                <strong>+</strong>
                            </button>
                        </div>
                        
                        <button class="btn btn-primary w-100" onclick="agregarAlCarrito(${producto.id})">
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// =====================
// FUNCIÓN PARA RENDERIZAR PRODUCTOS POR CATEGORÍA
// =====================
async function renderizarProductos(categoria) {
    const contenedor = document.getElementById('productos-container');
    
    if (!contenedor) {
        console.error('No se encontró el contenedor de productos');
        return;
    }
    
    // Mostrar mensaje de carga
    contenedor.innerHTML = '<div class="col-12 text-center"><p class="text-white">Cargando productos...</p></div>';
    
    // Cargar productos si aún no están cargados
    if (todosLosProductos.length === 0) {
        await cargarProductos();
    }
    
    // Obtener productos de la categoría
    const productos = obtenerProductosPorCategoria(categoria);
    
    if (productos.length === 0) {
        contenedor.innerHTML = '<div class="col-12 text-center"><p class="text-white">No hay productos disponibles en esta categoría.</p></div>';
        return;
    }
    
    // Generar las cards
    let productosHTML = '';
    productos.forEach(producto => {
        productosHTML += crearCardProducto(producto);
    });
    
    // Insertar en el contenedor
    contenedor.innerHTML = productosHTML;
}

// =====================
// FUNCIÓN PARA RENDERIZAR PRODUCTOS DESTACADOS (PARA HOME)
// =====================
async function renderizarProductosDestacados(contenedorId = 'productos-destacados', limite = 2) {
    const contenedor = document.getElementById(contenedorId);
    
    if (!contenedor) {
        console.error('No se encontró el contenedor de productos destacados');
        return;
    }
    
    // Mostrar mensaje de carga
    contenedor.innerHTML = '<div class="col-12 text-center"><p class="text-white">Cargando productos destacados...</p></div>';
    
    // Cargar productos si aún no están cargados
    if (todosLosProductos.length === 0) {
        await cargarProductos();
    }
    
    // Obtener productos destacados por categoría
    const productos = obtenerDestacadosPorCategoria(limite);
    
    if (productos.length === 0) {
        contenedor.innerHTML = '<div class="col-12 text-center"><p class="text-white">No hay productos destacados disponibles.</p></div>';
        return;
    }
    
    // Generar las cards
    let productosHTML = '';
    productos.forEach(producto => {
        productosHTML += crearCardProducto(producto);
    });
    
    // Insertar en el contenedor
    contenedor.innerHTML = productosHTML;
}

// =====================
// FUNCIONES DE INTERACCIÓN
// =====================

// Objeto para almacenar las cantidades en memoria
const cantidades = {};

// Función para cambiar la cantidad
function cambiarCantidad(productoId, cambio) {
    // Inicializar cantidad si no existe
    if (!cantidades[productoId]) {
        cantidades[productoId] = 1;
    }
    
    // Calcular nueva cantidad
    let nuevaCantidad = cantidades[productoId] + cambio;
    
    // No permitir cantidades menores a 1
    if (nuevaCantidad < 1) {
        nuevaCantidad = 1;
    }
    
    // Actualizar cantidad en memoria
    cantidades[productoId] = nuevaCantidad;
    
    // Actualizar en la interfaz
    const elementoCantidad = document.getElementById(`cantidad-${productoId}`);
    if (elementoCantidad) {
        elementoCantidad.textContent = nuevaCantidad;
    }
}

// Función para agregar al carrito
function agregarAlCarrito(productoId) {
    const cantidad = cantidades[productoId] || 1;
    
    // Buscar el producto
    const producto = todosLosProductos.find(p => p.id === productoId);
    
    if (!producto) {
        alert('Producto no encontrado');
        return;
    }
    
    // Aquí iría la lógica real del carrito
    // Por ahora solo mostramos un mensaje
    alert(`✅ ${producto.nombre}\nCantidad: ${cantidad}\nTotal: $${(producto.precio * cantidad).toFixed(2)}`);
    
    // Resetear la cantidad después de agregar
    cantidades[productoId] = 1;
    const elementoCantidad = document.getElementById(`cantidad-${productoId}`);
    if (elementoCantidad) {
        elementoCantidad.textContent = 1;
    }
}