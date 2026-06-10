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