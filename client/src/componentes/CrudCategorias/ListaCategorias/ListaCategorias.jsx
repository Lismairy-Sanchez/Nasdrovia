import React from "react";
import axios from "axios";

const ListaCategorias = ({ accion, categorias, editar, setSolicitud }) => {
  //Alamacena la categoria que toca editar en el state
  const editarCategoria = (categoria) => {
    const { nombre, descripcion, id } = categoria;
    editar({ nombre, descripcion, id });
    accion("editar");
  };
  //Eliminar la categoria de la base de datos
  const eliminarCategoria = (id) => {
    accion("eliminar");
    axios
      .delete(`http://localhost:3001/categorias/${id}`)
      .then(() => console.log("Eliminado"))
      .catch((err) => console.log(err));
    setSolicitud(true);
  };
  //Función que convierte la primera letra de una palabra en mayuscula
  const mayus = (palabra) => palabra[0].toUpperCase() + palabra.slice(1);
  console.log(categorias);

  return categorias.length ? (
   
    categorias.map((categoria) => (
      <section
        className="fila-cat row py-1 py-md-2 mb-1"
        key={categoria.id}
      >
        <div className="col-2 text-center">{categoria.id}</div>
        <div className="col-3 text-center">{mayus(categoria.nombre)}</div>
        <div className="col-5 text-center">{mayus(categoria.descripcion)}</div>
        <div className="col-2 text-center">
          <i
            className="fas fa-pencil-alt p-1 mr-1 text-white"
            onClick={() => editarCategoria(categoria)}
          ></i>
          <i
            className="fas fa-trash p-1 text-white"
            onClick={() => eliminarCategoria(categoria.id)}
          ></i>
        </div>
      </section>
    ))
  ) 
  : (
    <div className="productos-vacios row justify-content-center py-2  align-items-center">
      <i className="fas fa-exclamation-circle mx-2"></i> No hay categorías{" "}
      <i className="fas fa-database mx-2"></i>
    </div>
  );
};

export default ListaCategorias;
