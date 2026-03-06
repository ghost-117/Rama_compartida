import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registro.css";

interface FormRegistro {
  usuario_nombre: string;
  usuario_aPaterno: string;
  usuario_aMaterno: string;
  usuario_password: string;
  matricula_id: string;
}

export default function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormRegistro>({
    usuario_nombre: "",
    usuario_aPaterno: "",
    usuario_aMaterno: "",
    usuario_password: "",
    matricula_id: ""
  });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);
    try {
      const response = await fetch("http://localhost:8000/api/registro/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) navigate("/login");
      else {
        const data = await response.json();
        setError(Object.values(data)[0] as string || "Error al registrar.");
      }
    } catch {
      setError("Error de conexión.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="registro-container">
      {/* Panel Imagen (Oculto en móviles pequeños para mejor UX) */}
      <div className="registro-side-image">
        <div className="registro-panel-texto">
          <div className="registro-logo-wrap">
            <div className="registro-logo-icon">B</div>
            <span className="registro-logo-text">Biblioteca Web</span>
          </div>
          <h2 className="registro-panel-titulo">Únete a nuestra comunidad</h2>
          <p className="registro-panel-sub">
            Crea tu cuenta y accede a todo nuestro catálogo en línea.
          </p>
        </div>
      </div>

      {/* Panel Formulario */}
      <div className="registro-side-form">
        <div className="form-content-box">
          <h1 className="form-main-title">Crear cuenta</h1>
          <p className="form-subtitle">Ingresa tus datos para continuar</p>

          <form onSubmit={handleSubmit} className="vertical-form">
            <div className="input-field">
              <label>Nombre(s)</label>
              <input type="text" name="usuario_nombre" placeholder="Ej. Juan" value={form.usuario_nombre} onChange={handleChange} required />
            </div>

            <div className="input-field">
              <label>Apellido Paterno</label>
              <input type="text" name="usuario_aPaterno" placeholder="Ej. Pérez" value={form.usuario_aPaterno} onChange={handleChange} required />
            </div>

            <div className="input-field">
              <label>Apellido Materno</label>
              <input type="text" name="usuario_aMaterno" placeholder="Ej. García" value={form.usuario_aMaterno} onChange={handleChange} />
            </div>

            <div className="input-field">
              <label>Matrícula</label>
              <input type="text" name="matricula_id" placeholder="Ej. 202312345" value={form.matricula_id} onChange={handleChange} required />
            </div>

            <div className="input-field">
              <label>Contraseña</label>
              <input type="password" name="usuario_password" placeholder="••••••••" value={form.usuario_password} onChange={handleChange} required />
            </div>

            {error && <p className="error-msg">{error}</p>}

            <button type="submit" className="submit-btn" disabled={cargando}>
              {cargando ? "Procesando..." : "Crear cuenta"}
            </button>
          </form>

          <p className="footer-text">
            ¿Ya tienes cuenta? <span className="link-action" onClick={() => navigate("/login")}>Inicia sesión</span>
          </p>
        </div>
      </div>
    </div>
  );
}