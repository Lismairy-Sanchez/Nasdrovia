import React, { useState } from "react";
import Producto from "../ProductCard/card";
import "./Categoria.css";
import Loader from "../Loader/Loader";
import produce from "immer";


export default function Categoria({
  productos,
  cat,
  setCat,
  setProductos,
  data,
  setSearch
}) {
  const [filtrar, setFiltrar] = useState(false);

  function handleChange(event) {
    let checked = event.target.checked;
    setCat({res:cat.res.map((e) => {
      if (e.nombre.toLowerCase() === event.target.value.toLowerCase()) {
        e.select = checked;
      }
      return e;
    }),isLoaded:true})
  }

  function handleClick(){
    let arr = [];
    cat.res.forEach(e => {
      if (e.select){
        data.res.forEach(prod => {
        prod.categories.forEach(categorie => {
          if(categorie.nombre === e.nombre){
            arr.push(prod)
          }
        });
        });
      }
    });
    if(arr.length!==0){
      setProductos((p)=>{
        return produce(p,(productosCopy)=>{
          productosCopy.res= arr;
        })
      })
    
  }else{
    setProductos(data);
  }
}
const setSearchClick= ()=>{
  if(setSearch){
    setSearch({query:""})
  }
}
  return (
      <div className="Categorias">
      {filtrar ? 
        <div className="categoriasFilter">
          { cat.isLoaded ?
            cat.res.map((categoria, i) => {
            return (
              <div className="" key={i + "f"}>
                <label className="check">
                  <input
                    className="checkboxes"
                    type="checkbox"
                    key={categoria.nombre + i}
                    value={categoria.nombre}
                    id={i}
                    checked={categoria.select}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {categoria.nombre}
                </label>
              </div>
            );
          }):<Loader/> }
          <div className="x" onClick={handleClick}>Aplicar</div>
          <div className="x" onClick={() => setFiltrar(!filtrar)}>
          <i className="fas fa-window-close"></i>
          </div>
        </div> : <div className="categoriasFilter">
        <div className="botonFiltro" onClick={() => setFiltrar(!filtrar)}>
          Filtros
        </div>
      </div>
      }
        <div className="listaProductos">
          {productos.isLoaded ? productos.res.map((producto, i) => {
            if(producto.stock===0){
            return <Producto setSearchClick={setSearchClick} producto={producto} key={i + "k"} stockDisplay={false} />;}else{
               return <Producto setSearchClick={setSearchClick} producto={producto} key={i + "k"} stockDisplay={true}/>;
            }
          }):<Loader/>}
        </div>
      </div>
    );
  }