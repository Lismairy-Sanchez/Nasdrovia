import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./LineaOrdenes.css";
import Encabezado from "./Encabezado/Encabezado";
import Ordenes from "./TitulosOrdenes/TitulosOrdenes";
import Listado from "./Listado/Listado";
import Error404 from "../Error404/error404";
import Axios from "axios";

const LineaOrdenes = () => {
  //-------------------- State Redux------------
  //prettier-ignore
  const usuarioLogin = useSelector(state => state.usuario);

  const [listado, setListado] = useState({ res: null, isLoaded: false });
  const [estado, setEstado] = useState("");
  const [actualizar, setActualizar] = useState(false);

  // useEffect(() => {
  //   Axios.get(`http://localhost:3001/ordenes/`)
  //     .then((ordenes) => {
  //       setListado({ res: ordenes.data, isLoaded: true })
  //     })
  //     .catch((err) => { console.log(err.message) })
  // }, [])

  useEffect(() => {
    filtrado()
    setActualizar(false)
  }, [estado, actualizar])

  const filtrado = () => {
    if (estado === "estado..." || estado === "") {
      Axios.get(`http://localhost:3001/ordenes/`)
        .then((ordenes) => {
          setListado({ res: ordenes.data, isLoaded: true })
        })
        .catch((err) => { setListado({ res: null, isLoaded: false }) })
    }
    else Axios.get(`http://localhost:3001/ordenes?estado=${estado}`)
      .then((ordenes) => {
        setListado({ res: ordenes.data, isLoaded: true })
      })
      .catch((err) => { setListado({ res: null, isLoaded: false }) })
  }

  const stateHandler = (estad) => {
    setEstado(estad)
  }


  if (usuarioLogin.rol === "admin") {
    return (
      
        <div className="container general-ordenes ">
          <Encabezado setActualizar={setActualizar} stateHandler={stateHandler} />
          <Ordenes />
          <Listado lista={listado} setActualizar={setActualizar} />
        </div>
  
    );
  }
  return (
    <div>
      <Error404 />
    </div>
  );
};

export default LineaOrdenes;
