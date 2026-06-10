function buscarProductos() {
    let texto = document.getElementById("buscar").value.toLowerCase();
    let productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {
        let nombre = producto.textContent.toLowerCase();

        if (nombre.includes(texto)) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }
    });
}


function mostrarCategoria(categoria) {

    let productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {

        if (categoria === "todos") {
            producto.style.display = "block";

        } else if (producto.classList.contains(categoria)) {
            producto.style.display = "block";

        } else {
            producto.style.display = "none";
        }

    });

}
// Posición actual de la imagen
let imagenActual = 0;

// Lista de imágenes del Titanio Negro
let imagenes = [
    "imagenes/iphone16promax-frente-titanio negro.png",
    "imagenes/iphone16promax-posterior-titanio negro.png"
];

// Mostrar la primera imagen al cargar
document.getElementById("imagenProducto").src = imagenes[imagenActual];


// Flecha derecha
function imagenSiguiente() {

    imagenActual++;

    if (imagenActual >= imagenes.length) {
        imagenActual = 0;
    }

    document.getElementById("imagenProducto").src = imagenes[imagenActual];
}


// Flecha izquierda
function imagenAnterior() {

    imagenActual--;

    if (imagenActual < 0) {
        imagenActual = imagenes.length - 1;
    }

    document.getElementById("imagenProducto").src = imagenes[imagenActual];
}