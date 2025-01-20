import { servicios } from "../service/servicioAPI.js";


const contenedorProductos = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");


function crearCard({ name, price, image, id }) {
  const card = document.createElement("div");
  card.classList.add("card");

//   manipulando el DOM
  card.innerHTML = `
		<div class="img-container">
			<img src="${image}" alt="${name}">
		</div>
		<div class="card-container--info">
			<p>${name}</p>
			<div class="card-container--value">
				<p>$ ${price}</p>
				<button class="delete-button" data-id="${id}">
					<img src="./assets/trashIcon.svg" alt="Eliminar">
				</button>
			</div>
		</div>
	`;

//  para eliminar
  borrar(card, id);

  return card;
}


function borrar(card, id) {
  const deleteButton = card.querySelector(".delete-button");
  deleteButton.addEventListener("click", async () => {
    try {
      await servicios.borrarProducto(id);
      card.remove();
      console.log(`Producto con id ${id} eliminado`);
    } catch (error) {
      console.error(`Error al eliminar el producto con id ${id}:`, error);
    }
  });
}

//ayuda de alura
const renderProducts = async () => {
  try {
    const listProducts = await servicios.listaProductos();
    listProducts.forEach((product) => {
      const productCard = crearCard(product);
      contenedorProductos.appendChild(productCard);
    });
  } catch (err) {
    console.error("Error al renderizar productos:", err);
  }
};


form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  if (name === "" || price === "" || image === "") {
    alert("Por favor, complete todos los campos");
  } else {
    try {
      const newProduct = await servicios.crearProducto(
        name,
        price,
        image
      );
      console.log("Producto creado:", newProduct);
      const newCard = crearCard(newProduct);
      contenedorProductos.appendChild(newCard);
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }

    form.reset(); // Reinicia el formulario
  }
});

// Ejecuta la función de renderizado inicial
renderProducts();
