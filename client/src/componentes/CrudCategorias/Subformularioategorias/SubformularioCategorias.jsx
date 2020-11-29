import React, { useState } from "react";
import "./SubformularioCategoria.css";
import axios from "axios";
import Spinner from "../../FormularioCrud/Crud/Spinner";

const SubformularioCategoria = ({
  accion,
  setAccion,
  editar,
  crear,
  catCrear,
  catEditar,
  setSolicitud,
  n,
  lista,
}) => {
  //Error al validar el formulario
  const [error, setError] = useState(false);
  const [exito, setExito] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [existe, setExiste] = useState(false);

  //Extrae los datos de la categoria que toca editar del state para ponerlos en el formulario al editar
  const { id, nombre, descripcion } = catEditar;

  //Cierra el formulario y reinicia los states de crear,editar,eliminar y acción (catCrear es la categoria que se pretende crear y crear la accion que la guarda en el state)
  const cerrarFormulario = () => {
    editar({});
    crear({});
    setAccion("");
    setError(false);
  };

  //Almacena la categoria en el state en el state correspondiente según la acción seleccionada
  const almacenarCategoriaState = (e) => {
    accion === "editar" &&
      editar({ ...catEditar, [e.target.name]: e.target.value });
    accion === "crear" &&
      crear({ ...catCrear, [e.target.name]: e.target.value });
  };

  //Enviar elformulario
  const handleSubmit = (e) => {
    e.preventDefault();

    //Obtener los datos de la categoria del state dependiendo de la accion a ejecutar
    const { id, nombre, descripcion } =
      accion === "editar" ? catEditar : catCrear;

    //Validar si los campos están vacios y cortar la ejecución en caso de ser así
    if (!nombre || !descripcion) {
      return setError(true);
    }
    setError(false);
    console.log(lista);

    let existeCategoria = lista.find(
      (categoria) => categoria.nombre.toUpperCase() === nombre.toUpperCase()
    );
    if (accion === "crear" && existeCategoria) {
      return setExiste(true);
    } else {
      setExiste(false);
    }
    setExiste(false);

    //Ejecutar axios

    switch (accion) {
      case "crear":
        axios
          .post("http://localhost:3001/categorias", { nombre, descripcion })
          .then(() => console.log("Categoria creada"))
          .catch(() => console.log("error"));
        break;
      case "editar":
        axios
          .put(`http://localhost:3001/categorias/${id}`, {
            nombre,
            descripcion,
          })
          .then(() => console.log("cambiada"))
          .catch((err) => console.log(err));
        break;
      default:
        return;
    }

    //Mostrar spinner de carga
    setSpinner(true);

    //Cerrar formulario y recargar el componente lista de categorías
    setTimeout(() => {
      setSpinner(false);
      setExito(true);
      setTimeout(() => {
        setExito(false);
        cerrarFormulario();
      }, 1000);
      setTimeout(() => setSolicitud(true), 1100);
    }, 1400);
  };

  return accion === "editar" || accion === "crear" ? (
    <form
      className="formulario-categorias-crud  flex-column mx-auto"
      id="form-crud"
      onSubmit={handleSubmit}
    >
      <h4 className="d-flex align-items-center justify-content-between mb-3">
        {accion === "editar" ? "Editar" : "Crear"} Categoría{" "}
        <small
          id="cerrar"
          className="font-weight-bold"
          onClick={cerrarFormulario}
        >
          X
        </small>{" "}
      </h4>
      {error && (
        <p
          className="error-producto text-white text-center"
          id="error-producto"
        >
          {" "}
          Todos los campos son obligatorios{" "}
        </p>
      )}
      {existe && accion === "crear" && (
        <p
          className="error-producto text-white text-center"
          id="error-producto"
        >
          {" "}
          Ya existe la categoria en la base de datos{" "}
        </p>
      )}
      <label className="mb-1">Código</label>
      <input
        name="id"
        type="number"
        id="id-categoria"
        onChange={almacenarCategoriaState}
        value={accion === "editar" ? id : n + 1}
        disabled
      />
      <label className="mb-1">Nombre</label>
      <input
        name="nombre"
        type="text"
        id="nombre-categoria"
        onChange={almacenarCategoriaState}
        value={nombre}
      />
      <label className="mb-1">Descripción</label>
      <textarea
        name="descripcion"
        id="descripcion-categoria"
        onChange={almacenarCategoriaState}
        value={descripcion}
      ></textarea>
      {exito && (
        <p
          className="exito-categoria  text-center mt-1 mb-0"
          id="exito-categoria"
        >
          {accion === "editar" ? (
            <span>
              La categoria se ha modificado <i className="fas fa-check"></i>
            </span>
          ) : (
            <span>
              La categoria se ha guardado <i className="fas fa-check"></i>
            </span>
          )}{" "}
        </p>
      )}
      {spinner && <Spinner />}
      <button className="btn-gproducto text-white mt-2">Guardar</button>
    </form>
  ) : null;
};

export default SubformularioCategoria;
