import React,{useState} from "react";
import "./PanelCarrito.css";
import {Link} from 'react-router-dom';


const PanelCarrito = () => {

  const productosCarrito=localStorage['carrito'] ? JSON.parse(localStorage['carrito']):[];
  const [subtotal,setSubtotal]=useState(0);

  let sumatoria=0;
  productosCarrito.length>0&& productosCarrito.map(pro=>sumatoria+=(pro.precio*pro.cantidad));
  

  return (
    <div className="contenedor-panel" id='panel-carrito'>
      <div>
        <div className="ocultar">
          <p className="titulo-pc">
            <i className="fas fa-angle-right mr-5 ml-3"onClick={()=>document.getElementById('panel-carrito').classList.toggle('mostrar-carritopanel')}></i>
            <span className="carr">Carrito</span>
          </p>
        </div>

        {productosCarrito.length>0 && productosCarrito.map((pro,index)=><div className="item-panel" key={index}>
          <img className='img-panelc' src={pro.imagen} alt="cerveza" />
          <div className="subitem-panel">
          <p >{pro.nombreR}</p>
          <p className="precio-subitem">$ {pro.precio}</p>
          <p >Cantidad: <b>{pro.cantidad}</b></p>
          </div>
        </div>)}

    
      </div>

      <div >
        <div className="subtotal-panel"> 
         <h4>Subtotal</h4>
            <p>$ {sumatoria}</p>
         </div>
        <div className="ver-carrito">
          <Link to='/carrito'><button>Ir al carrito</button></Link>
        </div>
      </div>
    </div>
  );
};

export default PanelCarrito;
