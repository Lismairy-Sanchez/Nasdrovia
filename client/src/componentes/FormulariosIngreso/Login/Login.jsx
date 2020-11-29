import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
import Axios from "axios";
import allActions from "../../../redux/actions/allActions.js";

const Login = ({ setTipo, cerrar }) => {
  const dispatch = useDispatch();
  // const usuarioLogin = useSelector((state) => state.usuario);
  const usuarioLogin = useSelector((state) => state.usuario);
  const rol = usuarioLogin.rol;

  const productoStore = useSelector(
    (state) => state.productos.TodosLosProductos
  );

  //----Hooks------

  const [show, setShow] = useState(false);
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [sac, setSac] = useState("as");

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let usuarioLog = {};
    try {
      const usuario = await Axios.post(
        "http://localhost:3001/auth/login",
        inputValues
      );
      if (usuario.status === 201) {
        usuarioLog.id = usuario.data.id;
        usuarioLog.nombre = usuario.data.nombre;
        usuarioLog.email = usuario.data.email;
        usuarioLog.rol = usuario.data.rol;
      }
      if (!error) cerrar("inactivo");

      const getId = await Axios.get(
        `http://localhost:3001/usuario/${usuario.data.id}/cart`
      );

      if (getId.statusText !== "No Content") {
        usuarioLog.carritoId = getId.data.id;
        dispatch(allActions.login(usuarioLog));

        let productosActual = localStorage["carrito"]
          ? JSON.parse(localStorage["carrito"])
          : [];
        getId.data.lineaDeOrdens.forEach((producto) => {
          Axios.get(`http://localhost:3001/producto/${producto.productoId}`)
            .then((res) => {
              let objeto = {
                nombre: res.data.nombre,
                precio: res.data.precio,
                imagen: res.data.images[0][0],
                cantidad: producto.cantidad,
                stock: res.data.stock,
                productoId: producto.productoId,
              };
              let actual = productosActual.find(
                (prod) => prod.nombre === objeto.nombre
              );
              if (actual) {
                let nuevo = productosActual.filter(
                  (prod) => prod.nombre !== objeto.nombre
                );
                actual.cantidad = actual.cantidad + objeto.cantidad;
                nuevo.push(actual);
                productosActual = nuevo;
              } else {
                productosActual.push(objeto);
              }
              console.log(productosActual);
              localStorage.setItem("carrito", JSON.stringify(productosActual));
              window.location.reload();
            })
            .catch((err) => console.log(err));
        });
      } else {
        console.log("entre al post!");
        const carrito = await Axios.post(
          `http://localhost:3001/usuario/${usuario.data.id}/cart`
        );

        if (carrito.status === 200) {
          usuarioLog.carritoId = carrito.data.id;
          window.location.reload();
        }
        dispatch(allActions.login(usuarioLog));
      }
      dispatch(allActions.login(usuarioLog));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="formulario-login" onSubmit={handleSubmit} id="cd">
      <div className="mensaje-bienvenida mb-5">
        <h2 className="mb-4">Iniciar Sesión</h2>
        <p>
          ¿Eres nuevo en este sitio?{" "}
          <span onClick={() => setTipo("registrar")}>Regístrate</span>
        </p>

        {error && <p className="error-login text-white">Datos incorrectos</p>}
      </div>

      <div className="grupo-formulario">
        <input
          type="text"
          name="email"
          value={inputValues.email}
          required
          onChange={handleChange}
        />

        <label className="etiqueta">Email</label>
        <i className="fas fa-envelope"></i>
      </div>

      <div className="grupo-formulario">
        <input
          type="password"
          name="password"
          value={inputValues.password}
          required
          onChange={handleChange}
        />
        <label className="etiqueta">Contraseña</label>
        <i className="fas fa-unlock"></i>
      </div>

      <small onClick={() => setTipo("cambio")}>¿Olvidaste la contraseña?</small>

      <Link to="/">
        <button className="mt-3 btn-ingresar" onClick={handleSubmit}>
          Iniciar sesión
        </button>
      </Link>

      {/* Boton Facebook  */}
      <a href="http://localhost:3001/auth/facebook">
        <div
          className="btn-alternativo btn-fac d-flex align-items-center my-2 "
          id="face"
          value="facebook"
          onClick={handleSend}
        >
          <i className="fab fa-facebook-f mr-3 pl-3"></i>Continuar con Facebook
          <div className="sombra-facebook"></div>
        </div>
      </a>
      {/* Boton Google */}
      <a href="http://localhost:3001/auth/google">
        <div
          className="btn-alternativo btn-goo d-flex align-items-center my-2"
          id="goog"
          value="google"
          onClick={handleSend}
        >
          <i className="fab fa-google mr-3 pl-3"></i>Continuar con Google
          <div className="sombra-facebook"></div>
        </div>
      </a>
    </form>
  );
};

export default Login;
