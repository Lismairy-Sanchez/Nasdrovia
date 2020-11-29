import React from 'react';
import Encabezado from './Encabezado';
import Listado from './Listado';
import './Ordenes.css';
import axios from 'axios';
import { useState,useEffect } from 'react';



const Ordenes = ({ordenes}) => {
    const [productos,setProductos]=useState([]);

    const obtenerProductos = async()=>{
      let solicitud=  await axios.get("http://localhost:3001/producto")
      let data = await solicitud.data;
      setProductos(data)
    }
  useEffect(()=>{
   obtenerProductos()
  },[])

    return (  
        <div className="container general">
            <Encabezado/>
             <Listado  ordenes={ordenes} productos={productos}/>
            
             <div className="relleno">
             </div>
             
        </div>
    );
}
 
export default Ordenes;