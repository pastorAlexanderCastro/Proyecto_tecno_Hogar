/*const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

/*
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

// ✅ RUTA PARA GUARDAR DATOS
app.post("/guardar", (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  console.log("Datos recibidos:", req.body);

  if (!nombre || !correo || !mensaje) {
    return res.status(400).send("Datos incompletos");
  }

  const sql =
    "INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)";

  db.query(sql, [nombre, correo, mensaje], (err, result) => {
    if (err) {
      console.error("Error SQL:", err);
      return res.status(500).send("Error en servidor");
    }

    console.log("Registro insertado:", result);
    res.send("Datos guardados correctamente");
  });
});

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

// Agregar productos a la pagina administración1

const express = require("express");
const app = express();

// ... tus otras configuraciones (cors, json, etc)

// Esta ruta debe estar escrita tal cual, sin estar dentro de otra función
app.get("/administracion", (req, res) => {
  const sql = "SELECT * FROM productos";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Error");
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});*/
/*const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
*/

/*app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "contactos_db",
});

db.connect((err) => {
  if (err) console.error("Error de conexión:", err);
  else console.log("Conectado a MySQL");
});

// --- RUTAS DE PRODUCTOS ---

// Obtener todos
/*app.get("/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) return res.status(500).send("Error");
    res.json(results);
  });
});*/
/*app.get("/productos", (req, res) => {
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

// Ruta para administración (igual que productos)
app.get("/administracion", (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) return res.status(500).send("Error");
    res.json(results);
  });
});

// Agregar
app.post("/administracion/productos", (req, res) => {
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

// Editar (PUT)
app.put("/administracion/productos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, categoria, stock, imagen } = req.body;
  const sql =
    "UPDATE productos SET nombre=?, descripcion=?, precio=?, categoria=?, stock=?, imagen=? WHERE id=?";
  db.query(
    sql,
    [nombre, descripcion, precio, categoria, stock, imagen, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al actualizar" });
      res.json({ mensaje: "Actualizado con éxito" });
    },
  );
});

// Eliminar
app.delete("/administracion/productos/:id", (req, res) => {
  db.query(
    "DELETE FROM productos WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al eliminar" });
      res.json({ mensaje: "Eliminado con éxito" });
    },
  );
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));*/
