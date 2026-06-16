const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Permitir comunicación con frontend
app.use(cors());
app.use(express.json());

// Configuración de conexión
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "contactos_db",
});

// Conectar a MySQL
db.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor conectado a MySQL");
});

// lista de Productos pagina productos.html✅
app.get("/productos", (req, res) => {
  // Le pedimos a MySQL que traiga todo de la tabla productos
  const sql = "SELECT * FROM productos";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al consultar:", err);
      return res.status(500).send("Error al obtener datos");
    }
    // Si todo sale bien, enviamos los datos en formato JSON
    res.json(results);
  });
});

// AGREGAR PRODUCTOS A LA BASE DE DATOS.✅
app.post("/agregar", (req, res) => {
  const { nombre, descripcion, precio, categoria, stock, imagen } = req.body;
  const sql =
    "INSERT INTO productos (nombre, descripcion, precio, categoria, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [nombre, descripcion, precio, categoria, stock, imagen],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al guardar" });
      res.status(201).json({ mensaje: "Creado con éxito" });
    },
  );
});

//LISTAR PRODUCTOS A PAGINA ADMINISTRADOR✅
app.get("/administracion/productos", (req, res) => {
  const sql = "SELECT * FROM productos";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Error");
    res.json(results);
  });
});

// ELIMINAR PRODUCTOS PAGINA ADMINISTRADOR ✅
app.delete("/eliminar/productos/:id", (req, res) => {
  db.query(
    "DELETE FROM productos WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al eliminar" });
      res.json({ mensaje: "Eliminado con éxito" });
    },
  );
});

// EDITAR PRODUCTOS PAGINA ADMINISTRADOR ✅
app.put("/administracion/productos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, categoria, stock, imagen } = req.body;

  const sql =
    "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, stock = ?, imagen = ? WHERE id = ?";

  db.query(
    sql,
    [nombre, descripcion, precio, categoria, stock, imagen, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al actualizar" });
      res.json({ mensaje: "Producto actualizado con éxito" });
    },
  );
});

// LOGIN
app.post("/login", (req, res) => {
  const { correo, password } = req.body;
  const sql =
    "SELECT id, nombre, correo, rol FROM usuarios WHERE correo = ? AND password = ?";

  db.query(sql, [correo, password], (err, resultados) => {
    if (err)
      return res
        .status(500)
        .json({ ok: false, mensaje: "Error en el servidor" });
    if (resultados.length === 0)
      return res
        .status(401)
        .json({ ok: false, mensaje: "Credenciales incorrectas" });

    res.json({ ok: true, mensaje: "Ingreso correcto", usuario: resultados[0] });
  });
});

// // AGREGAR CONTACTO - ESTO FALTABA
app.post("/guardar", (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  // IMPORTANTE: Asegúrate de que esta tabla 'contactos' exista en tu BD
  const sql =
    "INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)";

  db.query(sql, [nombre, correo, mensaje], (err, result) => {
    if (err) {
      console.error("Error al guardar contacto:", err);
      return res
        .status(500)
        .json({ error: "Error al guardar en base de datos" });
    }
    res.status(201).json({ mensaje: "Contacto guardado con éxito" });
  });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
