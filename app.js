import express from "express";
import cors from "cors";
import { createPool } from "mysql2/promise";
import ReactDOMServer from "react-dom/server";
import React from "react";
import { StaticRouter } from "react-router-dom";
import App from "./path/to/your/ReactComponent"; // Importa tu componente React aquí

const PORT = process.env.PORT || 3000;

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "root";
const DB_NAME = process.env.DB_NAME || "crud_react";
const DB_PORT = process.env.DB_PORT || "3306";

const pool = createPool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
});

const app = express();

// Agregar middleware para manejar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://musical-otter-ec6469.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/", (req, res) => {
  res.send("bienvenido al servidor");
});

app.get("/get", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM empleados");
    console.log(result);

    // Renderizar el componente React en el servidor
    const reactApp = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={{}}>
        <App data={result[0]} /> {/* Pasa los datos al componente React */}
      </StaticRouter>
    );

    // Enviar la respuesta HTML generada al cliente
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>React App</title>
        </head>
        <body>
          <div id="app">${reactApp}</div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor conectado en el puerto ${PORT}`);
});
