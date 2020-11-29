import React, { useState,useEffect } from 'react';
import './PaginaUsuario.css';
import Cuenta from './Cuenta/Cuenta';
import Panel from './PanelUsuario/Panel';
import Datos from './Datos/Datos';
import Ordenes from './Ordenes/Ordenes';
import Error404 from '../Error404/error404';
import { useSelector } from "react-redux";
import axios from 'axios';


const PaginaUsuario = () => {
    const usuarioLogin = useSelector(state => state.usuario);
    const [pagina, setPagina] = useState('cuenta')
    const [ordenes,setOrdenes]=useState([]);
    

    const obtenerOrdenes = ()=>{
        let ordenesUsuario=[];
         axios.get(`http://localhost:3001/ordenes/`)
         .then((res)=>{
             res.data.map(orden=>{
                 if(orden.usuarioId===usuarioLogin.id){
                       ordenesUsuario.push(orden);
                 }
             })
             setOrdenes(ordenesUsuario)
         })
         .catch((err)=>console.log(err))

    }

    useEffect(()=>{
        obtenerOrdenes();
    },[])

    if (usuarioLogin.rol === "Client") {
        return (
            <section className="general-usuarios " id='a'>
                <div className='anuncios d-flex justify-content-around '>
                    <small><i className="fas fa-wine-bottle b1 mr-2"></i> CYBER VIERNES | HASTA 60% DE DESCUENTO + 25% ADICIONAL POR COMPRAS SUPERIORES A  $70.000</small>
                    <small>COVID-19 | VER MÁS NUESTROS TIEMPOS U SERVICIOS <i className="fas fa-wine-bottle b2 ml-2"></i></small>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-8 seccion-formulario mt-2">
   
                               {pagina === 'cuenta' && <Cuenta />}
                            {pagina === 'datos' && <Datos />}
                            {pagina ==='ordenes' && <Ordenes ordenes={ordenes}/> } 
               
                        

                            
                          

                        </div>
                        <div className="col-4 mt-3 panel">
                            <Panel setPagina={setPagina} />
                        </div>
                    </div>
                </div>

            </section>
        );
    } else { return <Error404 /> }
}

export default PaginaUsuario;