document.addEventListener("DOMContentLoaded", function () {
    const categoriaSelect = document.getElementById("categoria");
    const containerItems = document.querySelector(".container-items");

    categoriaSelect.addEventListener("change", () => {
        const selectedCategoria = categoriaSelect.value;

        containerItems.innerHTML = "";

        fetch("productos.json")
            .then((response) => response.json())
            .then((data) => {
                const productosFiltrados = data.filter(
                    (producto) => producto.categoria === selectedCategoria || selectedCategoria === "TodosP"
                );

                productosFiltrados.forEach((producto) => {
                    const section = document.createElement("section");
                    section.innerHTML = `
                        <article>
                            <div class="item">
                                <figure>
                                    <img src="../img/${producto.imagen}" alt="${producto.nombre}">
                                </figure>
                                <div class="info-product">
                                    <h4>${producto.nombre}</h4>
                                    <p class="price">$${producto.precio}</p>
                                    <label for="cantidad">Cantidad:</label>
                                    <select class="cantidad-select">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                    <button class="boton-agregar">Añadir al carrito</button>
                                </div>
                            </div>
                        </article>
                    `;
                    containerItems.appendChild(section);
                });
            })
            .catch((error) => {
                console.error("Error al cargar los productos:", error);
            });
    });
});