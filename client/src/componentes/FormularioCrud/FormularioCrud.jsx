import React, { useState, useEffect } from "react";
import "./FormularioCrud.css";
import { useSelector } from "react-redux";
import Axios from "axios";
import EncabezadoCrud from "./EncabezadoCrud/EncabezadoCrud";
import ListaProductos from "./ListaProductos/ListaProductos";
import TitulosFiltros from "./TitulosFiltros/TitulosFiltros";
import Crud from "./Crud/Crud";
import Error404 from "../Error404/error404";

const FormularioCrud = () => {
  //-------------------- State Redux------------
  //prettier-ignore
  const usuarioLogin = useSelector(state => state.usuario);

  //----------LocalStorage, se descomenta cada vez que se resetee la db-----
  // localStorage.setItem("mayor", "0");

  //------------------Hooks------------------
  const [listadoProductos, setListadoProductos] = useState({
    res: null,
    isLoaded: false,
  }); //Listado de productos (propiedad res)
  const [productoCrear, setProductoCrear] = useState({}); //Producto que se va a crear
  const [productoEditar, setProductoEditar] = useState({}); //producto que se va a editar
  const [accion, setAccion] = useState(""); //acción que realiza el crud
  const [categorias, setCategorias] = useState({ res: null, onLoad: false }); //categorias del producto que se está creando o editando que vienen de la base de datos
  const [cats, setCats] = useState([]); //Categorías que se asignan a un elemento al editar o crear
  const [guardarcate, setGuardarCate] = useState([]); //ACTUAL CATEGOIRIAS
  const [solicitud, setSolicitud] = useState(false); //Dependencia que  recarga el componente con los productos cada vez que cambia
  const [n, setN] = useState(0); //Id del proximo producto creado
  const [valoresCategorias, setValoresCategorias] = useState([]);
  const [eliminadas, setEliminadas] = useState([]); //categorias que toca eliminar

  //Trae todo el listado de productos
  const consultarProductos = () => {
    Axios.get("http://localhost:3001/producto")
      .then((data) => {
        //listado de productos ordenado de forma ascedente por id
        const ordenado = data.data.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });
        setListadoProductos({ res: ordenado, isLoaded: true }); //Guardar el listado de productos en el state
        //determina el producto de mayor id
        let nuevo = 0;
        for (let i = 0; i < ordenado.length; i++) {
          nuevo = ordenado[i].id > nuevo && ordenado[i].id;
        }
        //Almacena el producto con mayor id en localstorage porque apesar de eliminar un producto el id sigue aumentando en la base de datos
        const mayorLS = localStorage["mayor"];
        nuevo > mayorLS && localStorage.setItem("mayor", nuevo);
        setN(parseInt(mayorLS));
      })
      .catch((error) => console.log(error));
    Axios.get("http://localhost:3001/categorias")
      .then((data) => {
        setCategorias({ res: data.data, onLoad: true });
        let categorias = data.data;
        let arreglo = [];
        let objeto;
        categorias.map((cat) => {
          objeto = { id: cat.id, nombre: cat.nombre, valor: false };
          arreglo.push(objeto);
        });
        setValoresCategorias(arreglo);
      })
      .catch((error) => console.log(error));
  };

  //Recarga el componente que contiene los productos cada vez que se ejecuta un método axios
  useEffect(() => {
    consultarProductos();
    setSolicitud(false);
  }, [solicitud]);
  if (usuarioLogin.rol === "admin") {
    if (listadoProductos.isLoaded) {
      return (
 
          <div className="container productos-general" >
            <EncabezadoCrud setAccion={setAccion} />
            <TitulosFiltros />
            <div className="contenedor-productos">
            <ListaProductos
              setGuardarCate={setGuardarCate}
              values={valoresCategorias}
              setSolicitud={setSolicitud}
              lista={listadoProductos.res}
              setAccion={setAccion}
              setProductoEditar={setProductoEditar}
              setCats={setCats}
            />
            </div>
            <Crud
              eliminadas={eliminadas}
              setEliminadas={setEliminadas}
              setValues={setValoresCategorias}
              values={valoresCategorias}
              guardarcate={guardarcate}
              setGuardarCate={setGuardarCate}
              todos={listadoProductos}
              cats={cats}
              setCats={setCats}
              n={n}
              accion={accion}
              setAccion={setAccion}
              setProductoEditar={setProductoEditar}
              productoEditar={productoEditar}
              setProductoCrear={setProductoCrear}
              productoCrear={productoCrear}
              setSolicitud={setSolicitud}
              categorias={categorias}
            />
          </div>
     
      );
    } else {
      return <div>Cargando</div>;
    }
  }
  return (
    <div>
      <Error404 />
    </div>
  );
};
export default FormularioCrud;
