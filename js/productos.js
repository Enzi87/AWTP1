// =====================
// ESTRUCTURA DE DATOS DE PRODUCTOS
// =====================

const productosIndumentaria = [
    {
        id: 1,
        nombre: 'Armadura Flexible',
        descripcion: 'Protección avanzada con máxima movilidad. Ideal para combate y entrenamiento intensivo.',
        precio: 299.99,
        imagen: '../images/armadura-flexible.jpg'
    },
    {
        id: 2,
        nombre: 'Gi de Escuela Tortuga',
        descripcion: 'Uniforme tradicional de la prestigiosa Escuela Tortuga. Confeccionado con materiales premium.',
        precio: 179.99,
        imagen: '../images/gi-escuela-tortuga.jpg'
    },
    {
        id: 3,
        nombre: 'Gi Básico',
        descripcion: 'Uniforme clásico para principiantes. Cómodo, duradero y perfecto para entrenamientos diarios.',
        precio: 89.99,
        imagen: '../images/gi-basico.jpg'
    }
];

const productosEntrenamiento = [
    {
        id: 4,
        nombre: 'Pesas de Gravedad',
        descripcion: 'Pesas de gravedad con regulador de peso. Ideal para entrenamiento intensivo.',
        precio: 29.99,
        imagen: '../images/pesas-de-gravedad.jpg'
    },
    {
        id: 5,
        nombre: 'Caparazón de Escuela Tortuga',
        descripcion: 'Caparazón de 20 kg tradicional de la prestigiosa Escuela Tortuga. Confeccionado con materiales premium.',
        precio: 129.99,
        imagen: '../images/caparazon-tortuga.jpg'
    },
    {
        id: 6,
        nombre: 'Medidor de Impacto',
        descripcion: 'Máquina medidora de fuerza de impacto. Perfecta para llevar un registro de la evolución del usuario.',
        precio: 249.99,
        imagen: '../images/medidor-de-impacto.jpg'
    }
];

const productosConsumibles = [
    {
        id: 7,
        nombre: 'Senzu',
        descripcion: 'Semillas del Ermitaño. Restauran al instante toda tu energía y te permiten sobrevivir hasta diez días sin necesidad de comer.',
        precio: 49.99,
        imagen: '../images/senzu.jpg'
    },
    {
        id: 8,
        nombre: 'Suplementos de Kaiō',
        descripcion: 'Suplementos de Kaiō. Aumentan temporalmente tu fuerza y concentración, potenciando al máximo tu entrenamiento bajo la gravedad del planeta del Gran Kaiō.',
        precio: 79.99,
        imagen: '../images/suplementos-kaio.jpg'
    }
];

// =====================
// FUNCIÓN PARA CREAR UNA CARD DE PRODUCTO
// =====================

function crearCardProducto(producto) {
    return `
        <div class="col-md-4">
            <div class="card h-100 shadow-sm">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
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
// FUNCIÓN PARA RENDERIZAR PRODUCTOS
// =====================

function renderizarProductos(categoria) {
    const contenedor = document.getElementById('productos-container');
    
    if (!contenedor) {
        console.error('No se encontró el contenedor de productos');
        return;
    }
    
    let productos = [];
    
    // Seleccionar los productos según la categoría
    switch(categoria) {
        case 'indumentaria':
            productos = productosIndumentaria;
            break;
        case 'entrenamiento':
            productos = productosEntrenamiento;
            break;
        case 'consumibles':
            productos = productosConsumibles;
            break;
        default:
            console.error('Categoría no válida');
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
    
    // Aquí iría la lógica real del carrito
    // Por ahora solo mostramos un mensaje
    alert(`Producto agregado al carrito!\nCantidad: ${cantidad}`);
    
    // Resetear la cantidad después de agregar
    cantidades[productoId] = 1;
    const elementoCantidad = document.getElementById(`cantidad-${productoId}`);
    if (elementoCantidad) {
        elementoCantidad.textContent = 1;
    }
}