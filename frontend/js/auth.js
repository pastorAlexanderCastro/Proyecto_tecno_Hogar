//const { arch } = require("node:os");

const usuario = localStorage.getItem("usuario");

function ValidarSeccion() {
  if (!usuario) {
    window.location.href = "login.html";
    alert("Debe iniciar sesión para acceder al panel administrativo");
  }
}

ValidarSeccion(usuario);
