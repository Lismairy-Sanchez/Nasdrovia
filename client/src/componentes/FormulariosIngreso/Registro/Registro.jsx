import React, { useState } from "react";
import "./Registro.css";
import Axios from "axios";
import swal from "sweetalert";

const Registro = ({ setTipo }) => {
  const [datos, setDatos] = useState({});

  const [errorContraseña, setErrorContraseña] = useState(false);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, email, contrasena, contrasena2 } = datos;

    if (contrasena !== contrasena2) {
      return setErrorContraseña(true);
    }

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (!emailRegex.test(email)) {
      return alert("correo invalido"); //Lo voy a cambiar más adelante,tranqui
    }

    setErrorContraseña(false);
    let password = contrasena;
    Axios.post("http://localhost:3001/usuario", { nombre, email, password })
      .then((ele) => console.log(ele))
      .catch((err) => {
        return console.log(err);
      });
    e.target.reset();
    swal("Buen trabajo!", "Te has registrado correctamente!", "success");

    setTimeout(() => setTipo("ingresar"), 1000);
  };

  return (
    <form className="formulario-registro" onSubmit={handleSubmit}>
      <div className="mensaje-bienvenida mb-5">
        <h2 className="mb-4">Regístrate</h2>
        <p>
          ¿Ya tienes un perfil personal?
          <span onClick={() => setTipo("ingresar")}>Iniciar sesión</span>
        </p>
      </div>

      {errorContraseña && (
        <p className="error-contraseña mb-5">
          <i className="fas fa-unlock"></i> Las contraseñas no coinciden
          <i className="fas fa-unlock"></i>
        </p>
      )}

      <div className="grupo-formulario">
        <input type="text" name="nombre" onChange={handleChange} required />
        <label className="etiqueta">Nombre</label>
        <i className="fas fa-user"></i>
      </div>

      <div className="grupo-formulario">
        <input type="text" name="email" onChange={handleChange} required />
        <label className="etiqueta" id="email">
          Email
        </label>
        <i className="fas fa-envelope"></i>
      </div>

      <div className="grupo-formulario">
        <input
          type="password"
          name="contrasena"
          onChange={handleChange}
          required
        />
        <label className="etiqueta">Contraseña</label>
        <i className="fas fa-unlock"></i>
      </div>

      <div className="grupo-formulario">
        <input
          type="password"
          name="contrasena2"
          onChange={handleChange}
          required
        />
        <label className="etiqueta">Repetir contraseña</label>
        <i className="fas fa-lock"></i>
      </div>

      <button className="mt-3">Registrate</button>
    </form>
  );
};

export default Registro;
