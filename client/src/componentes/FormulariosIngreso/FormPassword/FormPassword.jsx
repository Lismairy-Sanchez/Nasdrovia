import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import Axios from "axios";


export default function FormPassword({setTipo}) {
  //--------------------- Hooks-----------------------
  const [inputValues, setInputValues] = useState({ email: null });
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    if (error) setError(false);
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValues.email) return setError(true);
    swal({
      title: "Es este tu email?",
      text: "Asegurate de escribir bien tu email o quizas no recibas ningun enlace de reseteo",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((correct) => {
      if (correct) {
        swal("Si tu email se encuentra registrado recibiras un enlace en un instante!, asegurate de revisar tu carpeta de spam", {
          icon: "success",
        });
        setTipo('ingresar') 
        Axios.post("http://localhost:3001/usuario/askForPasswordReset", inputValues)
      
      .then((respuesta)=>  respuesta)
      .catch((err) => setError(err));
      } else {
        return;
      }
    });
    
  };

  return (
    <form className="formulario-login" onSubmit={handleSubmit}>
      <div className="mensaje-bienvenida mb-5">
        <h3 className="mb-4">Cambio de Password</h3>
      </div>

      <div className="grupo-formulario mt-0">
        <input type="text" name="email" required onChange={handleChange} />
        <label className="etiqueta">Email</label>
        <i className="fas fa-envelope"></i>
      </div>

      <button className="mt-1">Enviar</button>
      <small className='mt-2' onClick={()=>setTipo('ingresar')}>Iniciar Sesión</small>
    </form>
  );
}
