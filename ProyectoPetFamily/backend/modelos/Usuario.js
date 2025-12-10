import conexion from "../config/conexion.js";
// Crea usuario
export const crearUsuario = async (nombre, email, password, rol) => {
  try {
    const query = `
      INSERT INTO usuarios (nombre, email, password, rol)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await conexion.execute(query, [nombre, email, password, rol]);
    return result;
  } catch (error) {
    console.error("Error en crearUsuario:", error);
    throw error;
  }
};
// obtener usuario por email
export const obtenerUsuarioPorEmail = async (email) => {
  try {
    const query = `SELECT * FROM usuarios WHERE email = ?`;
    const [rows] = await conexion.execute(query, [email]);
    return rows || [];
  } catch (error) {
    console.error("Error en obtenerUsuarioPorEmail:", error);
    throw error;
  }
};