import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const conexion = mysql.createPool({
  host: process.env.DB_HOST || "localhost", 
  user: process.env.DB_USER || "root",      
  password: process.env.DB_PASSWORD || "",  
  database: process.env.DB_NAME || "mibase",
  port: process.env.DB_PORT || 3306,
});

// Probar conexión
async function probarConexion() {
  try {
    const conn = await conexion.getConnection();
    console.log("Conexión a la base de datos correcta");
    conn.release();
  } catch (err) {
    console.error("Error de conexión:", err);
  }
}

probarConexion();

export default conexion;
