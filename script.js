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

    let botones = document.querySelectorAll(".categorias button");

     botones.forEach(boton => {
        
    boton.classList.remove("activo");
});

event.target.classList.add("activo");

    let productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {

        let categoriaProducto = producto.getAttribute("data-categoria");

        if (categoria === "todos" || categoriaProducto === categoria) {

            producto.style.display = "block";

            // Reinicia la animación
            producto.style.animation = "none";

            producto.offsetHeight; // fuerza el reinicio

            producto.style.animation = "aparecerProducto 0.4s ease forwards";

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

function actualizarContador() {

    let productos = document.querySelectorAll(".producto");

    let totalProductos = productos.length;
    let totalUnidades = 0;

    document.querySelectorAll(".cantidad").forEach(item => {

        let texto = item.textContent;

        let numero = parseInt(texto);

        if (!isNaN(numero)) {
            totalUnidades += numero;
        }

    });

    document.getElementById("total-productos").textContent = totalProductos;
    document.getElementById("total-unidades").textContent = totalUnidades;

}


actualizarContador();

function actualizarCategorias() {

    let productos = document.querySelectorAll(".producto");

    let conteo = {
        iphone: 0,
        ipad: 0,
        airpods: 0,
        watch: 0,
        mac: 0,
        cables: 0,
        adaptadores: 0
    };

    productos.forEach(producto => {

        let categoria = producto.dataset.categoria;

        if (conteo[categoria] !== undefined) {
            conteo[categoria]++;
        }

    });

    document.getElementById("cat-todos").textContent = productos.length;

    for (let categoria in conteo) {
        document.getElementById("cat-" + categoria).textContent = conteo[categoria];
    }

}

actualizarCategorias();

function agregarBotonesWhatsApp() {

    let productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {

        let nombre = producto.querySelector("h3").textContent;
        let precio = producto.querySelector(".precio").textContent;

        let mensaje = 
        `Hola 👋, estoy interesado en ${nombre} con un precio de ${precio}. ¿Sigue disponible?`;

        let enlace = document.createElement("a");

        enlace.href = 
        "https://wa.me/59174663104?text=" + encodeURIComponent(mensaje);

        enlace.className = "boton-whatsapp-producto";

        enlace.innerHTML = "💬 Consultar por WhatsApp";

        enlace.target = "_blank";

        producto.appendChild(enlace);

    });

}

agregarBotonesWhatsApp();

function volverArriba() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


window.addEventListener("scroll", function() {

    let boton = document.getElementById("volver-arriba");


    if (window.scrollY > 400) {

    boton.classList.add("visible");

} else {

    boton.classList.remove("visible");

}

});