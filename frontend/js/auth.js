document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("usuario");
  if (!usuario) {
    alert("Debe iniciar sesión para acceder al panel administrativo");
    window.location.href = "login.html";
  }
});
