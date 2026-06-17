const formLogin = document.getElementById("formLogin");
const mensajeLogin = document.getElementById("mensajeLogin");



formLogin.addEventListener("submit", async function (event) {
  event.preventDefault();
  const correo = document.getElementById("correo");
  const password = document.getElementById("password");
  const nombre = document.getElementById("nombre");

  /* <li id="i" class="nav-item"><a class=" nav-link" href="admin-productos.html">Administración</a></li>*/

  try {
    const respuesta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo: correo.value, password: password.value }),
    });
    const datos = await respuesta.json();
    if (datos.ok) {
      localStorage.setItem("usuario", JSON.stringify(datos.usuario));
      mensajeLogin.innerHTML = `<div class="alert alert-success">${datos.mensaje}</div>`;
      nombre.classList.add("is-valid");
      correo.classList.add("is-valid");
      password.classList.add("is-valid");

      setTimeout(() => {
        window.location.href = "admin-productos.html";
        agrgarNav();
      }, 1000);
    } else {
      mensajeLogin.innerHTML = `<div class="alert alert-danger">${datos.mensaje}</div>`;

      nombre.classList.add("is-invalid");
      correo.classList.add("is-invalid");
      password.classList.add("is-invalid");
      setTimeout(() => {
        nombre.classList.remove("is-invalid");
        correo.classList.remove("is-invalid");
        password.classList.remove("is-invalid");
        mensajeLogin.innerHTML = "";
        formLogin.reset();
      }, 3000);
    }
  } catch (error) {
    console.error("Error:", error);
    mensajeLogin.innerHTML = `<div class="alert alert-danger">No se pudo conectar con el servidor</div>`;
  }
});
