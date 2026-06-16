const BASE_URL = "http://localhost:3000";

const formularioProductos =
  document.getElementById("form-producto") ||
  document.getElementById("formProducto");
const tablaProductos =
  document.getElementById("tabla-productos") ||
  document.getElementById("tablaProductos");
const contenedorAlerta = document.getElementById("contenedor-alert");

let idEditando = null;

function colorCategoria(categoria) {
  switch (categoria) {
    case "Altavoces":
      return "bg-primary";
    case "PC":
      return "bg-secondary";
    case "Redes":
      return "bg-success";
    case "Monitores":
      return "bg-danger";
    case "Tefonos Portatiles":
      return "bg-info";
    default:
      return "bg-warning";
  }
}
// LISTAR PRODUCTOS PAGINA PRODUCTOS✅
async function cargarProductosDesdeBD() {
  try {
    const respuesta = await fetch(`${BASE_URL}/productos`);
    const productos = await respuesta.json();
    const contenedor = document.getElementById("contenedor-productos");

    if (!contenedor) return;

    contenedor.innerHTML = "";
    productos.forEach((p) => {
      const tarjeta = document.createElement("article");
      tarjeta.className = "col-md-3 mb-4";
      tarjeta.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${p.imagen}" class="card-img-top" alt="${p.descripcion}" style="height: 180px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text">${p.descripcion}</p>
            <p class="fw-bold">$${p.precio}</p>
            <span class="badge ${colorCategoria(p.categoria)}">${p.categoria}</span>
          </div>
        </div>`;
      contenedor.appendChild(tarjeta);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}
// LISTAR PRODUCTOS PAGINA ADMINISTRACION✅
async function cargarProductosAdministracion() {
  try {
    const respuesta = await fetch(`${BASE_URL}/administracion/productos`);
    const productos = await respuesta.json();

    if (!tablaProductos) return;

    tablaProductos.innerHTML = "";

    productos.forEach((p) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${p.nombre}</td>
        <td>${p.categoria}</td>
        <td>$${p.precio}</td>
        <td>${p.stock}</td>
        <td><img src="${p.imagen}" width="75" height="75" alt="${p.nombre}"></td>
        <td>
          <button type="button" class="btn btn-sm btn-warning btn-editar" data-id="${p.id}">Editar</button>
          <button type="button" class="btn btn-sm btn-danger btn-eliminar" data-id="${p.id}">Eliminar</button>
        </td>`;
      tablaProductos.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar administración:", error);
  }
}

function mostrarMensaje(texto, tipo = "success") {
  if (!contenedorAlerta) return;
  contenedorAlerta.innerHTML = `<p class="text-${tipo}">${texto}</p>`;
  setTimeout(() => {
    contenedorAlerta.innerHTML = "";
  }, 3000);
}

if (formularioProductos) {
  formularioProductos.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(e.target).entries());
    datos.precio = parseFloat(datos.precio);
    datos.stock = parseInt(datos.stock, 10);

    try {
      const url = idEditando
        ? `${BASE_URL}/administracion/productos/${idEditando}`
        : `${BASE_URL}/agregar`;
      const metodo = idEditando ? "PUT" : "POST";

      const respuesta = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json().catch(() => ({}));

      if (respuesta.ok) {
        mostrarMensaje(
          idEditando ? "Producto actualizado" : "Producto guardado",
        );
        e.target.reset();
        idEditando = null;
        const boton = e.target.querySelector('button[type="submit"]');
        if (boton) boton.textContent = "Guardar Producto";
        await cargarProductosAdministracion();
      } else {
        mostrarMensaje(
          resultado.error || "No se pudo guardar el producto",
          "danger",
        );
      }
    } catch (error) {
      console.error("Error al guardar producto:", error);
      mostrarMensaje("No se pudo conectar con el servidor", "danger");
    }
  });
}

if (tablaProductos) {
  tablaProductos.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-editar")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // 'smooth' hace que el movimiento sea suave
      });
      const id = e.target.getAttribute("data-id");
      idEditando = id;

      const respuesta = await fetch(`${BASE_URL}/administracion/productos`);
      const productos = await respuesta.json();
      const producto = productos.find((p) => String(p.id) === String(id));

      if (!producto) return;

      document.querySelector('input[name="nombre"]').value = producto.nombre;
      document.querySelector('textarea[name="descripcion"]').value =
        producto.descripcion;
      document.querySelector('input[name="categoria"]').value =
        producto.categoria;
      document.querySelector('input[name="precio"]').value = producto.precio;
      document.querySelector('input[name="stock"]').value = producto.stock;
      document.querySelector('input[name="imagen"]').value = producto.imagen;

      const boton = document.querySelector('button[type="submit"]');
      if (boton) boton.textContent = "Actualizar Producto";
      mostrarMensaje("Edita los datos y guarda para actualizar", "warning");
    }

    if (e.target.classList.contains("btn-eliminar")) {
      const id = e.target.getAttribute("data-id");

      if (confirm("¿Deseas eliminar este producto?")) {
        try {
          const respuesta = await fetch(
            `${BASE_URL}/eliminar/productos/${id}`,
            {
              method: "DELETE",
            },
          );
          const resultado = await respuesta.json().catch(() => ({}));

          if (respuesta.ok) {
            mostrarMensaje(resultado.mensaje || "Producto eliminado");
            await cargarProductosAdministracion();
          } else {
            mostrarMensaje(resultado.error || "No se pudo eliminar", "danger");
          }
        } catch (error) {
          console.error("Error al eliminar:", error);
          mostrarMensaje("No se pudo conectar con el servidor", "danger");
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarProductosDesdeBD();
  cargarProductosAdministracion();
});
