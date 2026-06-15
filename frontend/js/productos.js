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

// funcion para Guardar nuevos productos.
const formularioProductos = document.getElementById("form-producto");

formularioProductos.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const datos = Object.fromEntries(formData.entries());

  // Asegurarse de que precio y stock sean números
  datos.precio = parseFloat(datos.precio);
  datos.stock = parseInt(datos.stock);

  try {
    const respuesta = await fetch(
      "http://localhost:3000/administracion/productos",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      },
    );

    if (respuesta.ok) {
      const contenedorAlerta = document.getElementById("contenedor-alert");
      contenedorAlerta.innerHTML = `<p class="text-success">El producto se guardo con exito</p>`;

      setTimeout(() => {
        contenedorAlerta.innerHTML = "";
      }, 3000);
      e.target.reset();
      await cargarProductosAdministracion();
    } else {
      alert("Error al guardar el producto");
    }
  } catch (error) {
    console.error("Error de conexión:", error);
  }
});

//AGREGAR PRODUCTOS A LA PAGINA ADMINISTRACIÓN
document.addEventListener("DOMContentLoaded", cargarProductosAdministracion);
async function cargarProductosAdministracion() {
  try {
    const respuesta = await fetch("http://localhost:3000/administracion");
    const productos = await respuesta.json();

    const tbody = document.getElementById("tabla-productos");
    tbody.innerHTML = ""; // Limpiamos solo el cuerpo de la tabla

    productos.forEach((p) => {
      const fila = document.createElement("tr");
      console.log(p);

      fila.innerHTML = `
          <td>${p.nombre}</td>
          <td>${p.categoria}</td>
          <td>$${p.precio}</td>
          <td>${p.stock}</td>
          <td><img src="${p.imagen}" width="50" alt="img"></td>
          <td>
              <button data-id="${p.id}" class="btn btn-sm btn-warning btn-editar">Editar</button>
              <button data-id="${p.id}" class="btn btn-sm btn-danger btn-eliminar">Eliminar</button>
          </td>
      `;
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar:", error);
  }
}

// ELIMINAR PRODUCTOS
// Seleccionamos el elemento donde está la tabla (o un contenedor padre)
const tablaProductos = document.getElementById("tabla-productos");

// Usamos "Delegación de Eventos":
// Escuchamos el clic en toda la tabla, pero solo actuamos si el botón es 'btn-eliminar'
tablaProductos.addEventListener("click", async (e) => {
  // Verificamos si el elemento clicado tiene la clase 'btn-eliminar'
  if (e.target.classList.contains("btn-eliminar")) {
    // Obtenemos el ID desde el atributo 'data-id' del botón
    const id = e.target.getAttribute("data-id");

    // Pedimos confirmación al usuario
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        // Enviamos la petición DELETE al servidor
        const respuesta = await fetch(
          `http://localhost:3000/administracion/productos/${id}`,
          {
            method: "DELETE",
          },
        );

        // Convertimos la respuesta para leer el mensaje
        const resultado = await respuesta.json();

        if (respuesta.ok) {
          // Si todo salió bien, mostramos el mensaje y refrescamos la tabla
          alert(resultado.mensaje);
          cargarProductosAdministracion(); // ¡La tabla se actualiza sola!
        } else {
          alert("Error: " + resultado.error);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
        alert("No se pudo conectar con el servidor");
      }
    }
  }
});

// EDITAR PRODUCTOS
// Variable global para saber qué producto estamos editando
