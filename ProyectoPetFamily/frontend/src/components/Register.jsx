import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import axios from "axios"; // <-- necesario para conectar con backend

// Validaciones con Yup
const schema = yup.object().shape({
  nombre: yup.string().required("Nombre requerido"),
  email: yup.string().email("Email inválido").required("Email requerido"),
  password: yup
    .string()
    .required("Contraseña requerida")
    .min(6, "Debe tener al menos 6 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
});

export default function Register({ onLogin }) {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const password = watch("password");

  const evaluatePassword = (pwd) => {
    if (!pwd) return "";
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const medium = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (strong.test(pwd)) return "Fuerte";
    if (medium.test(pwd)) return "Intermedia";
    return "Débil";
  };

  const strengthColor = { "Débil": "red", "Intermedia": "orange", "Fuerte": "green" };

  const onSubmit = async (data) => {
    if (!captchaValue) {
      setError("Por favor, completa el CAPTCHA");
      return;
    }

    if (passwordStrength === "Débil") {
      setError("La contraseña es demasiado débil. Usa números y letras.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Petición POST al backend
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/usuarios`,
        {
          nombre: data.nombre,
          email: data.email,
          password: data.password,
        }
      );
      reset();
      setCaptchaValue(null);
      onLogin(response.data);

    } catch (err) {
      const mensaje = err.response?.data?.error || "Error al registrar usuario";
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register-container" style={{ maxWidth: "400px", margin: "80px auto" }}>
      <h2 className="text-center mb-4">Registrar Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* nombre */}
        <div>
          <label className="form-label">Nombre</label>
          <input type="text" {...register("nombre")} className="form-control" disabled={loading} />
          <p className="text-danger">{errors.nombre?.message}</p>
        </div>
        {/* email */}
        <div>
          <label className="form-label">Email</label>
          <input type="email" {...register("email")} className="form-control" disabled={loading} />
          <p className="text-danger">{errors.email?.message}</p>
        </div>
        {/* contraseña */}
        <div>
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            {...register("password")}
            className="form-control"
            onChange={(e) => setPasswordStrength(evaluatePassword(e.target.value))}
            disabled={loading}
          />
          <p className="text-danger">{errors.password?.message}</p>
          {password && (
            <small style={{ color: strengthColor[passwordStrength], fontWeight: "bold" }}>
              Fuerza de contraseña: {passwordStrength}
            </small>
          )}
        </div>
        {/* confirmar contraseña */}
        <div>
          <label className="form-label">Confirmar Contraseña</label>
          <input type="password" {...register("confirmPassword")} className="form-control" disabled={loading} />
          <p className="text-danger">{errors.confirmPassword?.message}</p>
        </div>
        {/* captcha */}
        <div className="d-flex justify-content-center">
          <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={setCaptchaValue} />
        </div>
        {error && <p className="text-danger text-center fw-bold">{error}</p>}
        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
      <p className="text-center mt-3">
        ¿Ya tienes cuenta? <Link to="/login" className="text-primary fw-bold">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}
