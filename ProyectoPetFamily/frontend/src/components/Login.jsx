import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import axios from "axios";
const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email requerido"),
  password: yup.string().required("Contraseña requerida"),
});
export default function Login({ onLogin }) {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    if (!captchaValue) {
      setError("Por favor, completa el CAPTCHA");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/usuarios/login`,
        {
          email: data.email,
          password: data.password,
          captcha: captchaValue,
        }
      );
      reset();
      setCaptchaValue(null);
      onLogin(response.data);
    } catch (err) {
      console.error(err);
      const mensaje = err.response?.data?.error || "Error al iniciar sesión";
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container" style={{ maxWidth: "400px", margin: "80px auto" }}>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {/* email */}
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            {...register("email")}
            className="form-control"
            disabled={loading}
          />
          <p className="text-danger">{errors.email?.message}</p>
        </div>
        {/* contraseña */}
        <div>
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            {...register("password")}
            className="form-control"
            disabled={loading}
          />
          <p className="text-danger">{errors.password?.message}</p>
        </div>
        {/* captcha */}
        <div className="d-flex justify-content-center">
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={setCaptchaValue}
          />
        </div>
        {error && (
          <p className="text-danger text-center fw-bold">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Iniciando..." : "Iniciar Sesión"}
        </button>
      </form>
      <p className="text-center mt-3">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-success fw-bold">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}