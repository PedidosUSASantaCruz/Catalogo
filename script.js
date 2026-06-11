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
console.log(categoria);

    let productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {
        let categoriaProducto = producto.getAttribute("data-categoria");

        if (categoria === "todos" || categoriaProducto === categoria) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }
    });
}

// Posición actual de la imagen

function cambiarImagen(boton, direccion) {

    // Busca la imagen del mismo producto
    let galeria = boton.parentElement;
    let imagen = galeria.querySelector(".imagen-producto");

    // Obtiene la lista de imágenes guardada en HTML
    let imagenes = JSON.parse(imagen.dataset.imagenes);

    // Saber cuál imagen está mostrando actualmente
    let actual = parseInt(imagen.dataset.actual);

    // Cambiar posición
    actual = actual + direccion;

    // Si pasa del límite vuelve al inicio
    if (actual >= imagenes.length) {
        actual = 0;
    }

    // Si va antes de la primera va a la última
    if (actual < 0) {
        actual = imagenes.length - 1;
    }

    // Cambia la foto
    imagen.src = imagenes[actual];

    // Guarda la posición actual
    imagen.dataset.actual = actual;
}
function precargarImagenes() {

    let imagenes = document.querySelectorAll(".imagen-producto");

    imagenes.forEach(imagen => {

        let lista = JSON.parse(imagen.dataset.imagenes);

        lista.forEach(ruta => {

            let img = new Image();
            img.src = ruta;

        });

    });

}

precargarImagenes();