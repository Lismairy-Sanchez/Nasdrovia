import React from 'react';
import './Checkout.css';
import Formulario from './FormularioCheckout/FormularioCheckout';
import Resumen from './Resumen/Resumen';


const Checkout = () => {
    return (  
        <section className=" general-checkout ">
            <div className="container">
            <div className="row">
                <div className="col-8 seccion-formulario">
                    <h2 className='mb-3 titulo-checkout mt-3'>DIRECCIÓN DE ENTREGA</h2>
                        <Formulario/>
                
                </div>
                <div className="col-4 mt-3">
                <Resumen/> 
                </div>
            </div>
            </div>
        
        </section>
    );
}

export default Checkout;