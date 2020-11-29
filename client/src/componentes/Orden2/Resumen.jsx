import React, { useState,useEffect } from 'react';
import Card from './Card';
import {Link} from 'react-router-dom';



const ResumenOrden = ({total,setTotal,items}) => {

  const [subtotal,setSubtotal]=useState(0)
  let productos = localStorage['carrito'] ? JSON.parse(localStorage['carrito']):[];


  useEffect(()=>{
    let sumatoria=0;
    productos&& productos.map(pro=>sumatoria+=(pro.precio*pro.cantidad));
    setSubtotal(sumatoria);
    localStorage.setItem('subtotal',JSON.stringify(sumatoria));
    setTotal(false);
  },[total])
    

    return ( 
        <div className="contenido-resumen">
        <p className="mb-1">{items} PRODUCTOS</p>
        <div className="precio-resumen d-flex justify-content-between">
          <p>Subtotal</p>
        <p>$ {subtotal}</p>
        </div>

        <div className="precio-resumen d-flex justify-content-between">
          <p>Código promocional</p>
          <p>N/A</p>
        </div>

        <div className="precio-resumen d-flex justify-content-between">
          <p>Gastos de Envio</p>
          <p>Gratis</p>
        </div>

        <div className="precio-resumen d-flex justify-content-between">
          <p>IVA</p>
          <p>$ 12.000</p>
        </div>

        <div className="precio-resumen precio-total-resumen d-flex justify-content-between">
          <p>Total</p>
           <p>$ {productos.length && subtotal+12000}</p>
        </div>

     {productos.length ?
        <div className="financiaciacion d-flex">
          <small>Financiación con Tarjeta de Credito</small>
         <small className="cuotas">Hasta 12 cuotas de ${((subtotal+12000)/12).toFixed(2)}</small>
      </div>
      :null
      }

       <Link to='/checkout'><button className='btn-comprar-carr'>Confirmar compra</button></Link>  

      </div>
     );
}
 
export default ResumenOrden;