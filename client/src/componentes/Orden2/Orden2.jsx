import React from "react";
import "./Orden.css";
import Resumen from './Resumen';


const Orden2 = ({total,setTotal,items}) => {
  
  return (
    <section className="contenedor-resumen">
      <h6>RESUMEN DEL PEDIDO</h6>
      <Resumen  total={total} setTotal={setTotal} items={items}/>
     
    </section>

  );
};

export default Orden2;
