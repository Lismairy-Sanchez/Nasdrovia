import React,{useEffect} from "react";
import "./ProductInfo.css";
import PanelCarrito from "./PanelCarrito/PanelCarrito";
import AllReviews from "../reviews/allReviews";
import allActions from "../../redux/actions/allActions";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import swal from 'sweetalert';

const ProductInfo = (props) => {

  const productosCarrito = localStorage['carrito'] ? JSON.parse(localStorage['carrito']):[];
  const productoStore = useSelector((state) => state.productos.TodosLosProductos);
  const dispatch = useDispatch();
  const productId= productoStore.id;
  let proActu = productosCarrito.find(prod=>prod.nombre===productoStore.nombre);
  let cantidad = proActu ? parseInt(proActu.cantidad):0;

  const [cant,setCant]=useState(cantidad);
 
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(allActions.getProductoDetalle(id));
  }, []);




 const aumentarCantidad = () => {
    let carrito = localStorage["carrito"];
   const {precio,nombre,stock,productId}=productoStore;
   const imagen = productoStore.images[0]['i1'];

   if(cantidad<stock){
    if (carrito) {
      if (carrito.length > 0) {
        let carriton = JSON.parse(localStorage["carrito"]);
        let actual = carriton.find((p) => p.nombre === nombre);
        if (actual) {
          let nuevo = carriton.filter((pro) => pro.nombre !== nombre);
          actual.cantidad = cantidad + 1;
          nuevo.push(actual);
          localStorage.setItem("carrito", JSON.stringify(nuevo));
        } else {
          let objeto = {
            nombre,
            cantidad: cantidad + 1,
            precio,
            productoId:productId,
            stock,
            imagen,
          };
          carriton.push(objeto);
          localStorage.setItem("carrito", JSON.stringify(carriton));
        }
      }
    } else {
      let carritos = [];
      let objeto = {
        precio,
        cantidad: cantidad + 1,
        nombre,
        productoId:productId,
        stock,
        imagen,
      };
      carritos.push(objeto);
      localStorage.setItem("carrito", JSON.stringify(carritos));
    }
    setCant(cantidad+1)

   }

   if(cantidad===stock){
    swal("Lo siento!", "Has superado el limite del stock", "error");
  }

  };

  const disminuirCantidad = ()=>{
    const {nombre}=productoStore;
    if(cant>1){
      let carrito = JSON.parse(localStorage['carrito']);
      let actual = carrito.find(pro=>pro.nombre===nombre);
      let carritoFiltrado = carrito.filter(pro=>pro.nombre!==nombre);
      actual.cantidad=cant-1;
     carritoFiltrado.push(actual)
     localStorage.setItem('carrito',JSON.stringify(carritoFiltrado));
     setCant(cant - 1);
    }
    
}
const cambiarImagen=(num)=>{
document.getElementById('img-actual').src=productoStore.images[0][num];
}
 
  
  return (
    
    <div className="general-product-info ">
      <p className="texto-nombre-seccion">
        Inicio / <span>{productoStore.nombre}</span>{" "}
      </p>
      <section className="container general-product-info">
        <div className="row">
          <aside className="col-2 text-center mt-3">
     
           <img src={productoStore.images[0]['i1']} onClick={()=>cambiarImagen('i1')}/>
          {productoStore.images[0]['i2'] && <img src={productoStore.images[0]['i2']} onClick={()=>cambiarImagen('i2')}/>}
          {productoStore.images[0]['i3'] && <img src={productoStore.images[0]['i3']} onClick={()=>cambiarImagen('i3')}/>}   
        
          </aside>
          <main className="col-6  text-center">
               <img src={productoStore.images[0]['i1']} id='img-actual'/>   
          </main>
          <section className="col-4 ">
            <p className="nombre">{productoStore.nombre}</p>
            <h3>${productoStore.precio}</h3>
            <p className="descripcion">{productoStore.descripcion}</p>

            <div className="cantidad-productInfo">
              <i className="fas fa-minus" onClick={disminuirCantidad}></i>
          <small>{cant}</small>
              <i className="fas fa-plus" onClick={aumentarCantidad}></i>
            </div>


            <button onClick={()=>document.getElementById('panel-carrito').classList.toggle('mostrar-carritopanel')}>Ver carrito</button>
          </section>
        </div>
      </section>
      <PanelCarrito />


    <div className="allReviews-css">
      <AllReviews id={productId} />  
    </div>   
      
      
    </div>
  );
};

export default ProductInfo;
