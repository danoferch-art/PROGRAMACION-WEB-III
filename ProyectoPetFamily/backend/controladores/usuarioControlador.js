import bcrypt from "bcryptjs";
import { crearUsuario, obtenerUsuarioPorEmail } from "../modelos/Usuario.js";
//regitrar usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password)
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    // Verificar si el email ya existe
    const usuariosExistentes = await obtenerUsuarioPorEmail(email);
    if (usuariosExistentes.length > 0)
      return res.status(400).json({ message: "El email ya está registrado" });
    const passwordHash = bcrypt.hashSync(password, 10);
    const userRol = rol || "cliente";
    const result = await crearUsuario(nombre, email, passwordHash, userRol);
    console.log("Usuario creado correctamente");
    res.status(201).json({
      message: "Usuario creado correctamente",
      usuario: {
        id: result.insertId,
        nombre,
        email,
        rol: userRol
      }
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Ocurrió un error al registrar el usuario", error: error.message });
  }
};
//login de usuario
export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    const usuarios = await obtenerUsuarioPorEmail(email);
    if (usuarios.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    const user = usuarios[0];
    if (!bcrypt.compareSync(password, user.password))
      return res.status(400).json({ message: "Contraseña incorrecta" });
    res.json({
      message: "Login exitoso",
      usuario: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Ocurrió un error al iniciar sesión", error: error.message });
  }
};
