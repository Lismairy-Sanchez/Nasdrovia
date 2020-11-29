import React from "react";
import axios from "axios";


export default function ListaProducto({
  lista,
  setAccion,
  setProductoEditar,
  setSolicitud,
  setCats,
  values,
  setGuardarCate,
}) {
  //Almacena el producto que toca editar en el state
  const editadoEnState = (producto) => {
    const { nombre, stock, precio, descripcion, id, categories,images } = producto;
    setAccion("editar");
   
    let imagen1 =images.length>0 && images[0]["i1"];
    let imagen2 =images.length>0 && images[0]["i2"];
    let imagen3 =images.length>0 && images[0]["i3"];
    
    let objeto;

    if (imagen1 && !imagen2 && !imagen3) {
      objeto = { nombre, stock, precio, descripcion, id, categories, imagen1,imagen2:'',imagen3:'' };
    }
    if (imagen1 && imagen2) {
      objeto = {
        nombre,
        stock,
        precio,
        descripcion,
        id,
        categories,
        imagen1,
        imagen2,
        imagen3:''
      };
    }
    if (imagen1 && imagen2 && imagen3) {
      objeto = {
        nombre,
        stock,
        precio,
        descripcion,
        id,
        categories,
        imagen1,
        imagen2,
        imagen3,
      };
    }

    setProductoEditar(objeto);
    let categoriasPositivas = [];

    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < categories.length; j++) {
        if (
          values[i].nombre.toUpperCase() == categories[j].nombre.toUpperCase()
        ) {
          values[i].valor = true;
          categoriasPositivas.push(values[i]);
        }
      }
    }
    let catsActivas = [];
    categoriasPositivas.map((ele) => {
      catsActivas.push(ele.id);
    });
    setGuardarCate(catsActivas);

    let categorias = [];
    let categoriasProducto =
      categories &&
      categories.forEach((cat) =>
        categorias.push({ id: cat.id, categoria: cat.nombre })
      );
    setCats(categorias);
  };

  //Elimina el producto de la db
  const eliminarProducto = (id) => {
    setAccion("eliminar");
    axios
      .delete(`http://localhost:3001/producto/${id}`)
      .then(() => setSolicitud(true))
      .catch((err) => console.log(err));
    setSolicitud(false);
  };

  //Función que convierte la primera letra de una palabra en mayuscula
  const mayusc = (palabra) => palabra[0].toUpperCase() + palabra.slice(1);

  return lista.length ? (
    lista.map((element) => {
      const { nombre, stock, precio, descripcion, id, images } = element;
      let numero = 0;
      if(images.length>0){
      if (images[0]['i1']) {
        numero = 1;
      }
      if (images[0]['i2']) {
        numero = 2;
      }
      if (images[0]['i3']) {
        numero = 3;
      }
    }
      return (
        <section
          className="productos fila-cat row py-1 py-md-2 mb-1 align-items-center"
          key={id}
        >
          <div className="col-4 col-md-1 text-center text-md-left pl-5">{id}</div>
          <div className="col-4 col-md-1 text-center text-md-left pl-4">
            {mayusc(nombre)}
          </div>
          <div className="d-none d-md-block col-md-4 pl-4">
            {mayusc(descripcion)}
          </div>
          <div className="d-none d-md-block col-md-1 pl-5">{numero}</div>
          <div className="d-none d-md-block col-md-1 pl-4">{stock}</div>
          <div className="d-none d-md-flex col-md-2 align-items-center flex-wrap  justify-content-between">
            {element.categories &&
              element.categories.map((cat,index) => (
                <small className=" text-center" key={index}>
                  {cat.nombre}
                </small>
              ))}
          </div>
          <div className="d-none d-md-block col-md-1">
            $ {precio.toString()[0] + "." + precio.toString().slice(1)}{" "}
          </div>
          <div className="col-4 col-md-1 text-center text-md-left">
            <i
              className="fas fa-pencil-alt p-1 mr-1 text-white"
              onClick={() => editadoEnState(element)}
            ></i>
            <i
              className="fas fa-trash p-1 text-white"
              onClick={() => eliminarProducto(id)}
            ></i>
          </div>
        </section>
      );
    })
  ) : (
    <div className="productos-vacios row justify-content-center py-2  align-items-center">
      <i className="fas fa-exclamation-circle mx-2"></i> No hay productos{" "}
      <i className="fas fa-database mx-2"></i>
    </div>
  );
}
