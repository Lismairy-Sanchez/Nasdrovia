import React, { useState, useEffect } from "react";
import "./CrudCategoria.css";
import EncabezadoCategoria from "./EncabezadoCategorias/EncabezadoCategoria";
import SubformularioCategorias from "./Subformularioategorias/SubformularioCategorias";
import ListaCategorias from "./ListaCategorias/ListaCategorias";
import { useSelector } from "react-redux";
import TitulosCategorias from "./TitulosCategorias/TitulosCategorias";
import Error404 from "../Error404/error404";
import axios from "axios";

const CrudCategoria = () => {
  //-------------------- State Redux------------
  //prettier-ignore
  const usuarioLogin = useSelector(state => state.usuario);

  //----------LocalStorage, se descomenta cada vez que se resetee la db-----

  // localStorage.setItem("mayorCategorias", "0");

  //------------------Hooks------------------
  const [listadoCategorias, setListadoCategorias] = useState([]); //Listado de categorias
  const [accionCategorias, setAccionCategorias] = useState(""); //Tipo de acción que se va a ejecutar
  const [categoriaEditar, setCategoriaEditar] = useState({}); //Categoria que se va a editar
  const [categoriaCrear, setCategoriaCrear] = useState({}); //Categoria que se va a crear
  const [solicitud, setSolicitud] = useState(false); //Dependencia que  recarga el componente con las categorias cada vez que cambia
  const [nextId, setNextId] = useState(0); //Id de la próxima categoria creada
  const consultarCategorias = () => {
    axios
      .get("http://localhost:3001/categorias")
      .then((data) => {
        //listado de categorias ordenado de forma ascedente por id
        const ordenado = data.data.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });
        setListadoCategorias(ordenado); //guarda el listado de categorias en el state
        //determina la categoria con mayor id
        let nuevo = 0;
        for (let i = 0; i < ordenado.length; i++) {
          nuevo = ordenado[i].id > nuevo && ordenado[i].id;
        }
        //Almacena la categoria con mayor id en localstorage porque apesar de eliminar una categoria el id sigue aumentando en la base de datos
        const mayorCLS = localStorage["mayorCategorias"];
        nuevo > mayorCLS && localStorage.setItem("mayorCategorias", nuevo);
        setNextId(parseInt(mayorCLS));
      })
      /* .then(data =>setListadoCategorias(data.data)) */
      .catch((error) => console.log(error));
  };

  //Rearga el componente que contiene las categorias cada vez que se ejecuta un método axios
  useEffect(() => {
    consultarCategorias();
    setSolicitud(false);
  }, [solicitud]);

  if (usuarioLogin.rol === "admin") {
    return (
 
        <div className="container general general-categorias">
          <EncabezadoCategoria setAccion={setAccionCategorias} />   
          <TitulosCategorias />
         
          <div className='contenedor-categorias '>
          <ListaCategorias
            setSolicitud={setSolicitud}
            accion={setAccionCategorias}
            categorias={listadoCategorias}
            editar={setCategoriaEditar}
          />
          </div>
      
         
          
      
          <SubformularioCategorias
            n={nextId}
            catCrear={categoriaCrear}
            catEditar={categoriaEditar}
            setSolicitud={setSolicitud}
            accion={accionCategorias}
            setAccion={setAccionCategorias}
            editar={setCategoriaEditar}
            crear={setCategoriaCrear}
            lista={listadoCategorias}
          />
        </div>
      
    );
  }
  return (
    <div>
      <Error404 />
    </div>
  );
};

export default CrudCategoria;
