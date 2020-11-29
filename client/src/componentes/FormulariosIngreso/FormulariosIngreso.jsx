import React from "react";
import "./FormulariosIngreso.css";
import Login from "./Login/Login";
import Registro from "./Registro/Registro";
import Password from "./FormPassword/FormPassword";
import Reset from "./resetpassword/passReset";

const FormulariosIngreso = ({ formulario, setFormulario, setTipo, tipo }) => {
  return (
    formulario === "activo" && (
      <div className="contenedor-formularios">
        <p
          className="salir text-white"
          onClick={() => setFormulario("inactivo")}
        >
          X
        </p>
        {tipo === "registrar" && <Registro setTipo={setTipo} />}
        {tipo === "ingresar" && <Login setTipo={setTipo} cerrar={setFormulario} />}
        {tipo === "cambio" && <Password setTipo={setTipo}/>}
        {tipo === "reset" && <Reset setTipo={setTipo}/>}
     
      </div>
    )
  );
};

export default FormulariosIngreso;
