import { crearMascota, obtenerMascotas, eliminarMascota } from "../modelos/Mascota.js";
// Agregar mascota
export const agregarMascota = async (req, res) => {
  try {
    const { usuario_id, nombre, especie, raza } = req.body;
    if (!usuario_id || !nombre || !especie || !raza) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }
    const result = await crearMascota(usuario_id, nombre, especie, raza);
    if (result && result.insertId) {
      res.status(201).json({
        message: "Mascota creada correctamente",
        mascota: {
          id: result.insertId,
          usuario_id,
          nombre,
          especie,
          raza
        }
      });
    } else {
      res.status(500).json({ message: "No se pudo crear la mascota" });
    }
  } catch (error) {
    console.error("Error al crear mascota:", error);
    res.status(500).json({ message: "Ocurrió un error al crear la mascota", error: error.message });
  }
};
// Lista de mascotas
export const listarMascotas = async (req, res) => {
  try {
    const results = await obtenerMascotas();
    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No hay mascotas registradas" });
    }
    res.json({ message: "Lista de mascotas", mascotas: results });
  } catch (error) {
    console.error("Error al listar mascotas:", error);
    res.status(500).json({ message: "Ocurrió un error al obtener las mascotas", error: error.message });
  }
};
// Eliminar mascota por ID
export const eliminarUnaMascota = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Falta el ID de la mascota" });
    const result = await eliminarMascota(id);
    if (result && result.affectedRows > 0) {
      res.json({ message: "Mascota eliminada correctamente" });
    } else {
      res.status(404).json({ message: "No se encontró la mascota" });
    }
  } catch (error) {
    console.error("Error al eliminar mascota:", error);
    res.status(500).json({ message: "Ocurrió un error al eliminar la mascota", error: error.message });
  }
};
