import express from "express";
import cors from "cors";
import { createConnection } from "mysql2/promise";

const PORT = process.env.PORT || 3000;

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "root";
const DB_NAME = process.env.DB_NAME || "crud_react";
const DB_PORT = process.env.DB_PORT || "3306";

const startServer = async () => {
  const db = await createConnection({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
  });

  const app = express();

  app.use(cors({
    origin: "https://musical-otter-ec6469.netlify.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }));

  app.get("/", (req, res) => {
    res.send("bienvenido al servidor");
  });

  app.get("/get", async (req, res) => {
    try {
      const [result] = await db.query("SELECT * FROM empleados");
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${PORT}`);
  });
};

startServer();
