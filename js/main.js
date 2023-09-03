let productosJSON = [];

fetch("productos.json")
    .then(response => response.json())
    .then(data => {
        productosJSON = data;
    });

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

    function obtenerImagen(nombre) {
        const productoEnJSON = productosJSON.find(producto => producto.nombre === nombre);
        return productoEnJSON ? productoEnJSON.imagen : '';
    }

    function agregarAlCarrito(producto) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += producto.cantidad;
        } else {
            const productoConImagen = { ...producto, imagen: obtenerImagen(producto.nombre) };
            carrito.push(productoConImagen);
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

    function calcularTotal() {
        let total = 0;
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        carrito.forEach(producto => {
            total += producto.precio * producto.cantidad;
        });

        return total.toFixed(3);
    }

    function actualizarCarrito() {
        const contenedorCarrito = document.getElementById('productos-container');
        contenedorCarrito.innerHTML = '';

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        carrito.forEach((producto, indice) => {
            const elementoProducto = document.createElement('div');
            elementoProducto.classList.add('item-carrito');

            const imagenProducto = document.createElement('img');
            imagenProducto.src = `../img/${producto.imagen}`;
            imagenProducto.alt = producto.nombre;

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

            elementoProducto.appendChild(imagenProducto);
            elementoProducto.appendChild(nombreProducto);
            elementoProducto.appendChild(cantidadProducto);
            elementoProducto.appendChild(precioTotalProducto);
            elementoProducto.appendChild(botonEliminar);

            contenedorCarrito.appendChild(elementoProducto);
        });


        const totalMonto = document.getElementById('monto-total');
        totalMonto.textContent = calcularTotal();
    }

    actualizarCarrito();

    const botonComprarCarrito = document.getElementById('boton-comprar-carrito');
    botonComprarCarrito.addEventListener('click', function () {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        if (carrito.length > 0) {
            comprar();
        } else {
            mostrarAlerta("No hay productos");
        }
    });

    function comprar() {
        localStorage.removeItem("carrito");

        const contenedorCarrito = document.getElementById('productos-container');
        contenedorCarrito.innerHTML = '';

        const totalMonto = document.getElementById('monto-total');
        totalMonto.textContent = "0";

        mostrarAlerta("¡Compra finalizada!");
    }

    function mostrarAlerta(mensaje) {

        const alertElement = document.createElement('div');
        alertElement.textContent = mensaje;
        alertElement.classList.add('alert', 'alert-success', 'center-alert');
        document.body.appendChild(alertElement);


        const windowHeight = window.innerHeight;
        const alertHeight = alertElement.clientHeight;


        const topPosition = (windowHeight - alertHeight) / 2;

        alertElement.style.top = `${topPosition}px`;

        anime({
            targets: alertElement,
            translateY: [-50, 0],
            opacity: [0, 1], 
            duration: 1000, 
            easing: 'easeOutElastic',
        });

        setTimeout(() => {
            anime({
                targets: alertElement,
                translateY: [0, -50],
                opacity: [1, 0],
                duration: 1000,
                easing: 'easeInExpo', 
                complete: () => {
                    document.body.removeChild(alertElement);
                },
            });
        }, 3000); 
    }
});


