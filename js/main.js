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
    nombre: "remera overzise",
    precio: 12000,
    impuesto: 0.12
};

// Creo una función para mostrar los productos disponibles
function mostrarProductosDisponibles() {
    let mensaje = 'Productos disponibles:\n';
    const productos = [producto1, producto2, producto3];

    for (let i = 0; i < productos.length; i++) {
        mensaje += `${i + 1}. ${productos[i].nombre}\n`;
    }

    // Mostrar el mensaje en la consola y en unA ALERTA
    console.log(mensaje);
    alert(mensaje);
}

// Creo función para elegir un producto y realizar la compra
function elegirProductos() {
    mostrarProductosDisponibles();

    // Solicito al usuario que elija un producto ingresando el número que corresponda
    let opcion = prompt("Elige un producto ingresando el número correspondiente");

    // Validar la opcion que ingreso
    while (opcion !== "1" && opcion !== "2" && opcion !== "3") {
        opcion = prompt("Opción inválida. Elige un producto ingresando el número correspondiente");
    }

    // Creo variables para almacenar la informacion del producto y el resumen de la compra
    let productoElegido;
    let mensajeCompra = "Resumen de la compra:\n";

    // Asignar el producto correspondiente según la opción seleccionada y agregarlo al resumen de la compra
    if (opcion === '1') {
        productoElegido = producto1;
        mensajeCompra += `Producto: ${productoElegido.nombre}\n`;
    } else if (opcion === '2') {
        productoElegido = producto2;
        mensajeCompra += `Producto: ${productoElegido.nombre}\n`;
    } else if (opcion === '3') {
        productoElegido = producto3;
        mensajeCompra += `Producto: ${productoElegido.nombre}\n`;
    }

    // Calculo el precio total de la compra sumando el precio base y el impuesto que le corresponde al producto
    const precioTotal = productoElegido.precio + (productoElegido.precio * productoElegido.impuesto);
    mensajeCompra += `Precio Total: ${precioTotal.toFixed(2)}\n`;

    // Muestro el resumen de la compra 
    console.log(mensajeCompra);
    alert(mensajeCompra);

    // Solicito la confirmacion del usuario para comprar
    const confirmacion = confirm("¿Deseas confirmar la compra?");
    if (confirmacion) {
        alert("Compra realizada con éxito.");
        console.log("Compra realizada con éxito.");
    } else {
        alert("Compra cancelada.");
        console.log("Compra cancelada.");
    }
}

// Llamo a la funcion
elegirProductos();



