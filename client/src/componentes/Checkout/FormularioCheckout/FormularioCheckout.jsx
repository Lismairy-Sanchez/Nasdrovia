import React, { useState } from 'react';
import './Formulario.css';
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";


const FormularioCheckout = () => {

  const id = useSelector((state) => state.usuario.id);
  const [datos,setDatos]=useState({});
  const handleChange = e=>{
    setDatos({...datos,[e.target.name]:e.target.value});
  }
  const usuarioLogin = useSelector((state) => state.usuario);

  const sendUserData = (e) => {
    e.preventDefault()
    Axios.post(`http://localhost:3001/usuario/datos/${id}`, datos)
      .then((res)=>{ res.status == 200 ? alert("OK"):  Axios.put(`http://localhost:3001/usuario/actualizar-datos/${id}`, datos)})
      let carrito = JSON.parse(localStorage['carrito'])
      let productos = {"productos":{"list":carrito}}
      
      Axios.post(`http://localhost:3001/ordenes/${usuarioLogin.carroId}/cart`,productos)
      .then(()=>console.log('posteado'))
      .catch((err)=>console.log(err))
      ///:id/cart/status

      Axios.put(`http://localhost:3001/ordenes/${usuarioLogin.carroId}/cart/status`,{estado:'creada'})
  }

    return (
      <form>
        <div className="form-grupo d-flex justifty-content-between mb-3 mt-4">
          <div className="grupo">
            <input type="text" placeholder="* NOMBRE" name='nombre' required onChange={handleChange}/>
            <i className="fas fa-check validado"></i>
            <div className="linea-nombre linea"></div>
          </div>
          <div className="grupo">
            <input type="text" placeholder="* APELLIDOS" name='apellido' required onChange={handleChange}/>
            <i className="fas fa-check validado"></i>
            <div className="linea-apellido linea"></div>
          </div>
        </div>

        <div className="form-grupo-direccion">
          <input
            className="input-direccion mb-3"
            placeholder="* TÉLEFONO"
            type="number"
            required
            name='telefono'
            onChange={handleChange}
          />
          <div className="linea-direccion"></div>
          <i className="fas fa-check validado"></i>
        </div>

        <div className="form-grupo d-flex justifty-content-between mb-3">
          <div className="grupo">
            <input type="text" placeholder="* CIUDAD" name='ciudad' required onChange={handleChange}/>
            <i className="fas fa-check validado"></i>
            <div className="linea-nombre linea"></div>
          </div>
          <div className="grupo">
            <input type="text" placeholder="* PROVINCIA/DEPARTAMENTO" name='departamento' required onChange={handleChange} />
            <i className="fas fa-check validado"></i>
            <div className="linea-apellido linea"></div>
          </div>
        </div>

        <div className="form-grupo-direccion">
          <input
            className="input-direccion mb-3"
            placeholder="* DIRECCIÓN"
            type="text"
            name='direccion'
            required
            onChange={handleChange}
          />
          <div className="linea-direccion"></div>
          <i className="fas fa-check validado"></i>
        </div>

        <div className="form-grupo d-flex justifty-content-between mb-3">
          <div className="grupo">
            <input type="text" placeholder="* PAIS" required name='pais' onChange={handleChange}/>
            <i className="fas fa-check validado"></i>
            <div className="linea-nombre linea"></div>
          </div>
          <div className="grupo">
            <input type="number" placeholder="* CÓDIGO POSTAL" required name='postal' onChange={handleChange}/>
            <i className="fas fa-check validado"></i>
            <div className="linea-apellido linea"></div>
          </div>
        </div>

        <h2 className="titulo-datos mb-3 mt-4">TUS DATOS</h2>

        <div className="form-grupo d-flex justifty-content-between mb-3">
          <div className="grupo">
            <input type="email" placeholder="* CORREO ELECTRONICO" name='correo' required onChange={handleChange}/>
            <i className="fas fa-check validado"></i>
            <div className="linea-nombre linea"></div>
          </div>
          <div className="grupo">
            <input type="number" placeholder="* DOCUMENTO IDENTIDAD" name='documento' required onChange={handleChange}/>
            <i className="fas fa-check validado"></i>
            <div className="linea-apellido linea"></div>
          </div>
        </div>

        <div className="terminos ">
          <input className='mr-2' type="checkbox" />
          <small>
            Doy mi consentimiento a <span className='nombre-terminos'>Nadrovia </span> para que utilice mis
            datos personales con fines comerciales y para sondeos de opinión.  
            Podrán ponerse en contacto
            conmigo mediante correos electrónicos, mensajes de texto, correo
            ordinario, aplicaciones o cualquier otro medio de comunicación que
            yo desee utilizar.
          </small>
        </div>

        <div className="terminos mb-3">
          <input className='mr-2' type="checkbox" />
          <small>
            * Si, soy mayor de 18 años
          </small>
        </div>


        
        <h2 className="titulo-datos mb-3">OPCIONES DE ENTREGA</h2>
        
            <div className="opciones-entrega d-flex justify-content-between" >
                <input type="checkbox" id="normal" />
                <label htmlFor="normal">Estandar</label>
                <small className='mr-4'>Gratis</small>
            </div>

            <div className="opciones-entrega d-flex justify-content-between" >
                <input type="checkbox" id="fast" />
                <label htmlFor="fast">Fast</label>
                <small className='mr-4'>$ 10.000</small>
            </div>

            
            <div className="opciones-entrega d-flex justify-content-between" >
                <input type="checkbox" id="express" />
                <label htmlFor="express">Express</label>
                <small className='mr-4'>$ 15.000</small>
            </div>

            <button className='btn-checkout mt-2 mb-4' onClick={sendUserData}>Pagar <i className="fas fa-long-arrow-alt-right ml-2"></i></button>
        
           <div className="promociones d-flex justify-content-around">

           <div className='grupo-promociones d-flex align-items-center '>
             <i className="fas fa-truck"></i>
                <small className='ml-2' >ENVÍOS GRATIS APARTIR DE $149.99  <i className="fas fa-arrow-circle-right"></i></small>
                 
               </div>
               <div className='grupo-promociones d-flex align-items-center '>
               <i className="fas fa-sync-alt"></i>
                <small className='ml-2' >DEVOLUCIONES  GRATIS <i className="fas fa-arrow-circle-right"></i></small>
                 
               </div>
               <div className='grupo-promociones  d-flex align-items-center'>
               <i className="fas fa-exclamation-circle"></i>
                 <small className='ml-2'>PAGA SEGURO <i className="fas fa-arrow-circle-right"></i></small>
                 
               </div>

           </div>
        </form>
    );
}
 
export default FormularioCheckout;