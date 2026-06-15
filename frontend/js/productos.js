document.addEventListener("DOMContentLoaded", cargarProductosDesdeBD);
async function cargarProductosDesdeBD() {
  try {
    // 1. Hacemos la petición al servidor (el "puente")
    const respuesta = await fetch("http://localhost:3000/productos");

    // 2. Convertimos la respuesta (JSON) en datos que JS entiende
    const productos = await respuesta.json();
    // funcion color de categoria
    const colorCategoria = (p) => {
      const categoria = p.categoria;

      switch (categoria) {
        case "Altavoces":
          return "bg-primary";
          break;

        case "PC":
          return "bg-secondary";
          break;

        case "Redes":
          return "bg-success";
          break;
        case "Monitores":
          return "bg-danger";
          break;
        case "Tefonos Portatiles":
          return "bg-info";
          break;
        default:
          return "bg-warning";
      }
    };

    // 3. Seleccionamos donde queremos mostrar las tarjetas
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = ""; // Limpiamos el contenido previo

    // 4. Recorremos los datos y creamos las tarjetas de Bootstrap
    productos.forEach((p) => {
      const col = document.createElement("div");
      // col.className = "col-md-4 mb-4";
      console.log(p);

      col.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img loading="lazy" src="${p.imagen}" class="card-img-top img-producto" alt="${p.descripcion}">
                <div class="card-body">
                    <h5 class="card-title">${p.nombre}</h5>
                    <p class="card-text">${p.descripcion}</p>
                    <p class="fw-bold">$${p.precio}</p>
                   <div d-grid gap-5>
                <button class="btn btn-primary me-5">Enviar al Carrito</button>
                <span class="badge ${colorCategoria(p)}">${p.categoria}</span>
            </div>
            </div>`;

      contenedor.appendChild(col);
    });
  } catch (error) {
    console.error("Hubo un error al conectar con el servidor:", error);
  }
}
