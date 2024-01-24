import express from "express";
import { createPool } from "mysql2/promise";
const PORT = process.env.PORT || 3000


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

app.get("/", (req, res) => {
  res.send("bienvenidoa l servidor");
});

app.get("/get", async (req, res) => {
  const [result] = await pool.query("SELECT * FROM empleados");
  console.log(result);
  res.json(result[0]);
});

app.listen(PORT);
console.log("conectado el puerto 3000");
