const url = "http://localhost:8000/products";


// obtencion de lista de productos
const listaProductos = async () => {
  try {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
  }
};

// crear producto
const crearProducto = async (name, price, image) => {
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, image }),
    });

    const data = await respuesta.json();
    console.log("Solicitud POST exitosa:", data);
    return data;
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
  }
};

// borrar producto
const borrarProducto = async (id) => {
  try {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`Producto con id ${id} eliminado exitosamente`);
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
  }
};

export const servicios = {
  listaProductos,
  crearProducto,
  borrarProducto,
};
