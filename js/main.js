// Defino a los productos
const producto1 = {
    nombre: "Buzo",
    precio: 20000,
    impuesto: 0.21
};

const producto2 = {
    nombre: "Zapatilla",
    precio: 5000,
    impuesto: 0.09
};

const producto3 = {
    nombre: "remera oversize",
    precio: 12000,
    impuesto: 0.12
};

const producto4 = {
    nombre: "Gorra",
    precio: 6400,
    impuesto: 0.15
};

const producto5 = {
    nombre: "Pantalon",
    precio: 10800,
    impuesto: 0.18
};

const producto6 = {
    nombre: "Chaqueta",
    precio: 25000,
    impuesto: 0.10
};

const producto7 = {
    nombre: "Vestido",
    precio: 18000,
    impuesto: 0.20
};

const producto8 = {
    nombre: "Bolso",
    precio: 8000,
    impuesto: 0.07
};

const producto9 = {
    nombre: "Calcetines",
    precio: 1200,
    impuesto: 0.05
};

const producto10 = {
    nombre: "Camisa",
    precio: 16000,
    impuesto: 0.22
};

const producto11 = {
    nombre: "Sudadera",
    precio: 18000,
    impuesto: 0.25
};

const producto12 = {
    nombre: "Shorts",
    precio: 9500,
    impuesto: 0.14
};

// Array que contiene los productos disponibles
const productos = [
    producto1, producto2, producto3, producto4, producto5, producto6,
    producto7, producto8, producto9, producto10, producto11, producto12
];

// Función para mostrar los productos disponibles
function mostrarProductosDisponibles() {
    let mensaje = 'Productos disponibles:\n';

    for (let i = 0; i < productos.length; i++) {
        mensaje += `${i + 1}. ${productos[i].nombre}\n`;
    }

    // Muestro el mensaje en la consola y en un alert
    console.log(mensaje);
    alert(mensaje);
}

// Agrego una función de orden superior
function buscarPorNombre(nombre) {
    return productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
}

// grego una función flecha para calcular el precio total de un producto
const calcularPrecioTotal = (producto) => producto.precio + (producto.precio * producto.impuesto);

// Agrego una función para elegir un producto y agregarlo al carrito
function elegirProductos() {
    let carrito = []; // Array para almacenar los productos seleccionados por el usuario 

    do {
        mostrarProductosDisponibles();

        // Solicito al usuario que elija un producto ingresando el número que corresponda
        let opcion = prompt("Elige un producto ingresando el número correspondiente (o ingresa '0' para finalizar la compra)");

        // Validar la opción que ingresó
        while (opcion < 0 || opcion > productos.length) {
            opcion = prompt("Opción inválida. Elige un producto ingresando el número correspondiente (o ingresa '0' para finalizar la compra)");
        }

        // Si la opción es 0, se finaliza la compra
        if (opcion === "0") {
            break;
        }

        // Asignar el producto correspondiente según la opción seleccionada y agregarlo al carrito
        const productoElegido = productos[opcion - 1];
        carrito.push(productoElegido);

        // Muestro el producto agregado al carrito
        console.log(`Producto agregado al carrito: ${productoElegido.nombre}`);

        // Mostrar el resumen parcial de la compra hasta el momento
        let mensajeCompra = "Resumen parcial de la compra:\n";
        let totalCompra = 0;

        carrito.forEach(producto => {
            mensajeCompra += `Producto: ${producto.nombre} - Precio: $${producto.precio.toFixed(2)}\n`;
            totalCompra += producto.precio;
        });

        mensajeCompra += `Total parcial: $${totalCompra.toFixed(2)}\n`;

        console.log(mensajeCompra);
        alert(mensajeCompra);

    } while (true);

    //muestro el resumen final
    if (carrito.length > 0) {
        let mensajeCompraFinal = "Resumen de la compra:\n";
        let totalCompraFinal = 0;

        carrito.forEach(producto => {
            mensajeCompraFinal += `Producto: ${producto.nombre} - Precio: $${producto.precio.toFixed(2)}\n`;
            totalCompraFinal += producto.precio;
        });

        mensajeCompraFinal += `Total: $${totalCompraFinal.toFixed(2)}\n`;

        console.log(mensajeCompraFinal);
        alert(mensajeCompraFinal);

        const confirmacion = confirm("¿Deseas confirmar la compra?");
        
        if (confirmacion) {
            console.log("Compra realizada con éxito.");
            alert("Compra realizada con éxito.");
        } else {
            console.log("Compra cancelada.");
            alert("Compra cancelada.");
        }
    } else {
        console.log("Compra cancelada. El carrito está vacío.");
        alert("Compra cancelada. El carrito está vacío.");
    }
}

// Llamo a la función
elegirProductos();