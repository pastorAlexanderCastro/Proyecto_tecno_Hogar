const { arch } = require("node:os");

function agrgarNav() {
  const nav = document.getElementById("nav");
  const li = document.createElement("li");
  li.className = "nav-item";
  li.innerHTML = `<a class=" nav-link" href="admin-productos.html">Administración</a>`;
  nav.appendChild(li);
}

document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("usuario");
  if (usuario) {
    agrgarNav();
  } else {
    alert("Debe iniciar sesión para acceder al panel administrativo");
    window.location.href = "login.html";
  }
});
const botonCerrarSeccion = document.getElementById("cerrar-seccion");
console.log(botonCerrarSeccion);

botonCerrarSeccion.addEventListener("click", () => {
  alert(todobien);
});
