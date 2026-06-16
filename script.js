function buscarProductos() {
    let texto = document.getElementById("buscar").value.toLowerCase();
    let productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {
        let nombre = producto.querySelector("h3").textContent.toLowerCase();

        if (nombre.includes(texto)) {
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

    // Obtiene la lista de imágenes
    let imagenes = JSON.parse(imagen.dataset.imagenes);

    // Posición actual
    let actual = parseInt(imagen.dataset.actual);

      // Si está en la portada del iPhone, ir a la primera imagen real
     if (actual === -1) {
    actual = 0;
     } else {
    actual = actual + direccion;
    }


    // Si el producto tiene un rango de color seleccionado
    if (imagen.dataset.inicio !== undefined) {

        let inicio = parseInt(imagen.dataset.inicio);
        let fin = parseInt(imagen.dataset.fin);


        // Si pasa del último del color, vuelve al primero
        if (actual > fin) {
            actual = inicio;
        }

        // Si va antes del primero, vuelve al último
        if (actual < inicio) {
            actual = fin;
        }

    } else {

        // Funcionamiento normal para otros productos
        if (actual >= imagenes.length) {
            actual = 0;
        }

        if (actual < 0) {
            actual = imagenes.length - 1;
        }
    }


    // Cambia la imagen
    imagen.src = imagenes[actual];

    // Guarda la posición
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



function agregarBotonesWhatsApp() {

    let productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {

        let nombre = producto.querySelector("h3").textContent;
        let precio = producto.querySelector(".precio").textContent;

        let mensaje = 
        `Hola 👋, estoy interesado en ${nombre} con un precio de ${precio}. ¿Sigue disponible?`;

        let enlace = document.createElement("a");

        enlace.href = 
        "https://wa.me/59160006575?text=" + encodeURIComponent(mensaje);

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

function cambiarColor(colorSeleccionado, posicion) {

    // Busca el producto donde se hizo clic
    let producto = colorSeleccionado.closest(".producto");

    // Busca la imagen de ese producto
    let imagen = producto.querySelector(".imagen-producto");

    // Obtiene la lista de imágenes del carrusel
    let imagenes = JSON.parse(imagen.dataset.imagenes);

    // Cambia a la primera imagen del color elegido
    imagen.src = imagenes[posicion];

    // Actualiza la posición actual del carrusel
    imagen.dataset.actual = posicion;

    // Guarda el rango de imágenes del color seleccionado
    imagen.dataset.inicio = posicion;
    imagen.dataset.fin = posicion + 3;
    


    // Quita el color seleccionado anterior
    let colores = producto.querySelectorAll(".color-item");

    colores.forEach(color => {
        color.classList.remove("activo");
    });


    // Activa el nuevo color seleccionado
    colorSeleccionado.classList.add("activo");

}

// Filtrar productos por categoría

let botonesCategorias = document.querySelectorAll(".categorias button");

botonesCategorias.forEach(boton => {

    boton.addEventListener("click", function() {

        // Quitar selección anterior
        botonesCategorias.forEach(b => {
            b.classList.remove("activo");
        });

        // Marcar botón actual
        boton.classList.add("activo");

        let categoria = boton.dataset.categoria;

        let productos = document.querySelectorAll(".producto");

        productos.forEach(producto => {

            if (
                categoria === "todos" ||
                producto.dataset.categoria.trim().toLowerCase() === categoria
            ) {
                producto.style.display = "block";
            } else {
                producto.style.display = "none";
            }

        });

    });

});

function actualizarContadoresCategorias() {

    let productos = document.querySelectorAll(".producto");

    // Reiniciar contadores
    let conteo = {
        todos: 0,   
        iphone: 0,
        ipad: 0,
        airpods: 0,
        watch: 0,
        mac: 0,
        cables: 0,
        adaptadores: 0
    };

    // Contar productos
    productos.forEach(producto => {

        let categoria = producto.dataset.categoria;

        if (conteo[categoria] !== undefined) {
            conteo[categoria]++;
        }

    });

    // Actualizar números en los botones
    
    document.getElementById("total-productos").textContent = productos.length;
    document.getElementById("total-iphone").textContent = conteo.iphone;
    document.getElementById("total-ipad").textContent = conteo.ipad;
    document.getElementById("total-airpods").textContent = conteo.airpods;
    document.getElementById("total-watch").textContent = conteo.watch;
    document.getElementById("total-mac").textContent = conteo.mac;
    document.getElementById("total-cables").textContent = conteo.cables;
    document.getElementById("total-adaptadores").textContent = conteo.adaptadores;

}
actualizarContadoresCategorias();
