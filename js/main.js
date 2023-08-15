document.addEventListener("DOMContentLoaded", function () {
    const productos = document.querySelectorAll('.item');

    productos.forEach((producto, indice) => {
        const botonAgregarCarrito = producto.querySelector('.boton-agregar');
        const cantidadSelect = producto.querySelector('.cantidad-select');

        botonAgregarCarrito.addEventListener("click", () => {
            const productoSeleccionado = obtenerProductoSeleccionado(producto);
            agregarAlCarrito(productoSeleccionado);
        });
    });

    function obtenerProductoSeleccionado(producto) {
        const nombreProducto = producto.querySelector('.info-product h4').textContent;
        const cantidadSelect = producto.querySelector('.cantidad-select');
        const precioProducto = parseFloat(producto.querySelector('.price').textContent.replace('$', ''));

        return {
            nombre: nombreProducto,
            cantidad: parseInt(cantidadSelect.value),
            precio: precioProducto
        };
    }

    function agregarAlCarrito(producto) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);
        
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += producto.cantidad;
        } else {
            carrito.push(producto);
        }
        
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }

    function eliminarProducto(indice) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        
        if (indice >= 0 && indice < carrito.length) {
            carrito.splice(indice, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        }
    }

    function actualizarCarrito() {
        const contenedorCarrito = document.getElementById('productos-container');
        contenedorCarrito.innerHTML = '';
        
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        
        carrito.forEach((producto, indice) => {
            const elementoProducto = document.createElement('div');
            elementoProducto.classList.add('item-carrito');
            
            const nombreProducto = document.createElement('h4');
            nombreProducto.textContent = producto.nombre;
            
            const cantidadProducto = document.createElement('p');
            cantidadProducto.textContent = `Cantidad: ${producto.cantidad}`;
            
            const precioTotalProducto = document.createElement('p');
            precioTotalProducto.textContent = `Precio total: $${(producto.precio * producto.cantidad).toFixed(3)}`;
            
            const botonEliminar = document.createElement('button');
            botonEliminar.classList.add('eliminar-producto');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener("click", () => {
                eliminarProducto(indice);
            });
            
            elementoProducto.appendChild(nombreProducto);
            elementoProducto.appendChild(cantidadProducto);
            elementoProducto.appendChild(precioTotalProducto);
            elementoProducto.appendChild(botonEliminar);
            
            contenedorCarrito.appendChild(elementoProducto);
        });
    }

    actualizarCarrito();
});