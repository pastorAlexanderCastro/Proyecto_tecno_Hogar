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

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
