import React, { useState } from "react";
import { useParams } from 'react-router-dom'
import swal from 'sweetalert';
import "./passReset.css";
import Axios from "axios";
import { set } from "js-cookie";
//reset password
const Login = ({ setFormulario, setLogueado,setTipo }) => {
  const [contr1, setContr1] = useState();
  const [contr2, setContr2] = useState();
  const [error, setError] = useState(false);
  const [postError, setPostError] = useState(false);
  let { token } = useParams()

  const handleChange1 = (e) => {
    setContr1(e.target.value);
  };
  const handleChange2 = (e) => {
    setContr2(e.target.value);
  };
  // const handleSubmit = e => {
  //     e.preventDefault();
  //     if (contr1 === contr2) {
  //         setError(false);
  //         setFormulario('inactivo')
  //         setLogueado(true);
  //     } else {
  //         setError(true)e
  //     }
  // }
  const handleConfirmar = (e) => {
    e.preventDefault();
    console.log(contr2, contr1)
    //alert(token)
    if (!contr1 || !contr2|| !token) return setError(true);
    if (contr1 !== contr2) {return setError(true)
    }else{
     
      Axios.post("http://localhost:3001/usuario/passwordReset", { password:contr1, token:token })
      .then((res) => res.status == 200 ?  swal({
        title: "Buen trabajo",
        text: "Su contraseña fue actualizada con exito",
        icon: "success",
        button: "Aceptar",
      }) :
      swal({
        title: "Token expirado",
        text: "No pudimos actualizar su contraseña, puede intentar pidiendo un nuevo enlace de reseteo",
        icon: "error",
        button: "Aceptar",
      }))
      .catch(() => setPostError("No se pudo actualizar la contraseña"));
      // window.location='/';as

    }

    
  };

  return (

    <form className="formulario-login" >

      <div className="mensaje-bienvenida mb-5">
        <h2 className="mb-4">Resetear Contraseña</h2>
        {error && (
          <p className="error-login text-white">Las contraseñas no coinciden</p>
        )}
      </div>

      <div className="grupo-formulario">
        <input
          type="password"
          name="contraseña"
          required
          onChange={handleChange1}
        />
        <label className="etiqueta">Contraseña nueva</label>
        <i className="fas fa-unlock"></i>
      </div>

      <div className="grupo-formulario">
        <input
          type="password"
          name="contraseña"
          required
          onChange={handleChange2}
        />
        <label className="etiqueta">repetir Contraseña</label>
        <i className="fas fa-unlock"></i>
      </div>

     <button className="mt-3" onClick={handleConfirmar}>Confirmar</button>
    </form>
  );
};

export default Login;
