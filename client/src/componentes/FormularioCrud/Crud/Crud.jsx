import React, { useState, useEffect } from "react";
import "./Crud.css";
import Spinner from "./Spinner";
import axios from "axios";

const Crud = ({
  accion,
  setAccion,
  setProductoEditar,
  productoEditar,
  setProductoCrear,
  productoCrear,
  setSolicitud,
  categorias,
  n,
  cats,
  setCats,
  todos,
  setGuardarCate,
  guardarcate,
  values,
  setValues,
  setEliminadas,
  eliminadas,
}) => {
  const [error, setError] = useState(false); //Se activa si hay un error en la validación del formulario
  const [exito, setExito] = useState(false); //Se activa si hay exito en la validación del formulario
  const [spinner, setSpinner] = useState(false); //Spinner que se muestra después de ejecutar con exito el método axios
  const [catsEliminar, setCatsEliminar] = useState([]); //Ids con las categorias que toca eliminar de un producto
  const [numImagenes, setNumImagenes] = useState(0);
  const [existe, setExiste] = useState(false);
  let imagen2, imagen3;

  //Almacena el número de imagnes que va a tener el producto
  const almacenarImagenes = (num) => {
    num && setNumImagenes(parseInt(num));
  };

  //categorias del producto
  const catsProducto = (e, id, nombre) => {
    if (e.target.checked) {
      let actual = values.find((ele) => ele.nombre === nombre);
      let resto = values.filter((ele) => ele.nombre !== nombre);
      actual.valor = true;
      resto.push(actual);
      const ordenado = resto.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
      setValues(ordenado);
      if (guardarcate.length > 0) {
        let buscar = guardarcate.find((actual) => actual == id);

        if (!buscar) {
          setGuardarCate([...guardarcate, id]);
        }
      } else {
        setGuardarCate([...guardarcate, id]);
      }
    } else {
      let actual = values.find((ele) => ele.nombre === nombre);
      let resto = values.filter((ele) => ele.nombre !== nombre);
      actual.valor = false;
      resto.push(actual);
      const ordenado = resto.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
      setValues(ordenado);

      if (guardarcate.length > 0) {
        let buscar = guardarcate.find((actual) => actual == id);

        if (buscar) {
          let nuevo = guardarcate.filter((actual) => actual !== id);
          setGuardarCate(nuevo);
        }
      }
    }

    let eliminadas = [];
    values.forEach((ele) => {
      if (ele.valor === false) {
        eliminadas.push(ele.id);
      }
    });
    setEliminadas(eliminadas);
  };

  //Datos del producto que se va a editar
  const { id, nombre, descripcion, precio, stock, imagen1 } = productoEditar;

  if (productoEditar.imagen2) {
    imagen2 = productoEditar.imagen2;
  }
  if (productoEditar.imagen3) {
    imagen3 = productoEditar.imagen3;
  }

  //Guarda el producto editado o creado en el state según sea el caso
  const almacenarProductoEditado = (e) => {
    accion === "editar" &&
      setProductoEditar({ ...productoEditar, [e.target.name]: e.target.value });
    accion === "crear" &&
      setProductoCrear({
        ...productoCrear,
        id: n + 1,
        [e.target.name]: e.target.value,
      });
  };

  let j = 3;
  //Cierra el formulario y borrar el producto editado O creado del state
  const cerrarFormulario = () => {
    setProductoEditar({});
    setProductoCrear({});
    setAccion("");
    setError(false);
    setSpinner(false);
    setCats([]);
    values.forEach((ele) => (ele.valor = false));
  };

  //Enviar el formulario para crear o editar un producto
  const handleSubmit = (e) => {
    e.preventDefault();
    //Obtener los datos del producto del state dependiendo de la accion a ejecutar
    const { id, nombre, descripcion, precio, stock, imagen1 } =
      accion === "editar" ? productoEditar : productoCrear;
    let objeto;

    //Validar si los campos están vacios
    if (
      !nombre ||
      !descripcion ||
      !precio ||
      !stock ||
      !imagen1 ||
      guardarcate.length === 0
    ) {
      return setError(true);
    }
    //comprobar que no exista el producto en la base de datos

    let existeProducto = todos.res.find(
      (producto) => producto.nombre.toUpperCase() === nombre.toUpperCase()
    );
    if (accion === "crear" && existeProducto) {
      return setExiste(true);
    } else {
      setExiste(false);
    }
    setExiste(false);

    if (accion === "crear") {
      if (!productoCrear.imagen2 || !productoCrear.imagen3) {
        objeto = { nombre, descripcion, precio, stock, imagen1 };
      }
      if (productoCrear.imagen2) {
        const { imagen2 } = productoCrear;
        objeto = { nombre, descripcion, precio, stock, imagen1, imagen2 };
      }
      if (productoCrear.imagen2 && productoCrear.imagen3) {
        const { imagen2, imagen3 } = productoCrear;
        objeto = {
          nombre,
          descripcion,
          precio,
          stock,
          imagen1,
          imagen2,
          imagen3,
        };
      }
    }
    if (accion === "editar") {
      console.log(numImagenes);
      if (numImagenes == 1) {
        objeto = {
          nombre,
          descripcion,
          precio,
          stock,
          imagen1,
          imagen2: "",
          imagen3: "",
        };
        console.log(objeto);
      }
      if (numImagenes == 2) {
        const { imagen2 } = productoEditar;
        objeto = {
          nombre,
          descripcion,
          precio,
          stock,
          imagen1,
          imagen2,
          imagen3: "",
        };
      }
      if (numImagenes == 3) {
        const { imagen2, imagen3 } = productoEditar;
        objeto = {
          nombre,
          descripcion,
          precio,
          stock,
          imagen1,
          imagen2,
          imagen3,
        };
      }
    }

    setError(false);

    //Ejecutar  axios
    switch (accion) {
      case "crear":
        axios
          .post("http://localhost:3001/producto", objeto)

          .then(() =>
            guardarcate.forEach((categ) => {
              axios.post(
                `http://localhost:3001/producto/${id}/categoria/${categ}`
              );
              setGuardarCate([]);
            })
          )

          .then(() => console.log(id))
          .catch((err) => console.log(err));
        break;

      case "editar":
        console.log(objeto);
        axios
          .put(`http://localhost:3001/producto/${id}`, objeto)

          .then(() => {
            eliminadas.length > 0 &&
              eliminadas.forEach((n) =>
                axios.delete(
                  `http://localhost:3001/producto/${id}/categoria/${n}`
                )
              );
            guardarcate.length > 0 &&
              guardarcate.forEach((categ) =>
                axios.post(
                  `http://localhost:3001/producto/${id}/categoria/${categ}`
                )
              );
            setEliminadas([]);
            setGuardarCate([]);
          })

          .catch(() => console.log("error"));
        break;
      default:
        return;
    }

    //Mostrar spinner de carga
    setSpinner(true);

    //Mostrar mensaje de exito, eliminar spinner, cerrar y ressetear el formulario y el state.
    setTimeout(() => {
      setSpinner(false);
      setExito(true);
      setTimeout(() => {
        setExito(false);
        setAccion("");
      }, 1000);
      setTimeout(() => setSolicitud(true), 1100);
    }, 1400);
  };
  //Función que convierte la primera letra de una palabra en mayuscula
  const mayuscula = (palabra) => palabra[0].toUpperCase() + palabra.slice(1);

  return accion === "editar" || accion === "crear" ? (
    <form
      className="formulario-producto-crud  flex-column mx-auto"
      id="form-crud"
      onSubmit={handleSubmit}
    >
      <h4 className="d-flex align-items-center justify-content-between mb-3">
        {accion === "editar" ? "Editar" : "Crear"} Producto{" "}
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
          Ya existe el producto en la base de datos{" "}
        </p>
      )}
      <label className="mb-1 ">Código</label>
      <input
        name="id"
        type="number"
        value={accion === "editar" ? id : n + 1}
        disabled
      />
      <label className="mb-1">Nombre</label>
      <input
        name="nombre"
        type="text"
        id="nombre"
        onChange={almacenarProductoEditado}
        value={nombre}
      />
      <label className="mb-1">Descripción</label>
      <textarea
        name="descripcion"
        id="descripcion"
        onChange={almacenarProductoEditado}
        value={descripcion}
      ></textarea>
      <select
        className="mb-2"
        onChange={(e) => almacenarImagenes(e.target.value)}
      >
        <option value="1">Selecciona el numero de imagenes</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      {numImagenes === 1 && (
        <div>
          <label className="mb-1 w-100">Imagen 1</label>
          <input
            className="w-100"
            name="imagen1"
            value={imagen1}
            required
            onChange={almacenarProductoEditado}
            maxLength='255'
          />
        </div>
      )}

      {numImagenes === 2 && (
        <div>
          <label className="mb-1 w-100">Imagen 1</label>
          <input
            className="w-100 i2i"
            name="imagen1"
            value={imagen1}
            onChange={almacenarProductoEditado}
          />
          <label className="mb-1 w-100">Imagen 2</label>
          <input
            className="w-100 i2i"
            name="imagen2"
            value={imagen2 && imagen2}
            onChange={almacenarProductoEditado}
            maxLength='255'
          />
        </div>
      )}

      {numImagenes === 3 && (
        <div>
          <label className="mb-1 w-100">Imagen 1</label>
          <input
            className="w-100"
            name="imagen1"
            value={imagen1}
            onChange={almacenarProductoEditado}
            maxLength='255'
          />
          <label className="mb-1 w-100">Imagen 2</label>
          <input
            className="w-100"
            name="imagen2"
            value={imagen2 && imagen2}
            onChange={almacenarProductoEditado}
            maxLength='255'
          />
          <label className="mb-1 w-100">Imagen 3</label>
          <input
            className="w-100"
            name="imagen3"
            value={imagen3 && imagen3}
            onChange={almacenarProductoEditado}
            maxLength='255'
          />
        </div>
      )}

      <label className="mb-1">Stock</label>
      <input
        name="stock"
        type="number"
        id="stock"
        onChange={almacenarProductoEditado}
        value={stock}
      />

      <label>Categorias</label>
      <div className="d-flex flex-wrap  justify-content-center">
        {values.map((ele, ind) => (
          <div className="item-categoria" key={ind}>
            <input
              type="checkbox"
              checked={ele.valor}
              onChange={(e) => catsProducto(e, ele.id, ele.nombre)}
            />
            <label htmlFor="c1">{ele.nombre[0].toUpperCase()+ele.nombre.slice(1)}</label>
          </div>
        ))}
      </div>

      <label className="mb-1">Precio</label>
      <input
        name="precio"
        type="number"
        onChange={almacenarProductoEditado}
        value={precio}
      />
      {exito && (
        <p
          className="exito-categoria  text-center mt-1 mb-0"
          id="exito-categoria"
        >
          {accion === "editar" ? (
            <span>
              El producto se ha modificado<i className="fas fa-check"></i>
            </span>
          ) : (
            <span>
              El producto se ha guardado<i className="fas fa-check"></i>
            </span>
          )}
        </p>
      )}
      {spinner && <Spinner />}
      <button className="btn-gproducto text-white mt-2">Guardar</button>
    </form>
  ) : null;
};

export default Crud;
