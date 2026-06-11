console.log("Script cargado correctamente");

// Capturar formulario
const formulario = document.getElementById("formulario");

if (formulario) {
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("Evento submit ejecutado");

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const mensaje = document.getElementById("mensaje").value;

    console.log("Nombre:", nombre);
    console.log("Correo:", correo);
    console.log("Mensaje:", mensaje);

    const respuesta = document.getElementById("respuesta");

    // Validación
    if (nombre === "" || correo === "" || mensaje === "") {
      respuesta.textContent = "Todos los campos son obligatorios.";
      return;
    }

    // ENVIAR AL BACKEND
    fetch("http://localhost:3000/guardar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        correo: correo,
        mensaje: mensaje,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log("Respuesta servidor:", data);
        respuesta.textContent = "Datos guardados en MySQL correctamente";
        formulario.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        respuesta.textContent = "Error al guardar los datos";
      });
  });
}
// Agregar productos
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

// 5. Ejecutamos la función al cargar la página
document.addEventListener("DOMContentLoaded", cargarProductosDesdeBD);
//${p.imagen}
