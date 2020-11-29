import React from 'react';
import './Resumen.css';



const Resumen = () => {
  
    const productos = JSON.parse(localStorage['carrito']);
    let subtotal = JSON.parse(localStorage['subtotal'])

    return ( 
        <section className="contenedor-resumen">
            <h6>RESUMEN DEL PEDIDO</h6>
            <div className="contenido-resumen">
                <p className='mb-1'>3 PRODUCTOS</p>
                <div className='precio-resumen d-flex justify-content-between'>
                <p>Subtotal</p>
                    <p>$ {subtotal}</p>
                </div>

                <div className='precio-resumen d-flex justify-content-between'>
                <p>Código promocional</p>
                <p>N/A</p>
                </div>

                <div className='precio-resumen d-flex justify-content-between'>
                <p>Gastos de Envio</p>
                <p>Gratis</p>
                </div>

                <div className='precio-resumen d-flex justify-content-between'>
                <p>IVA</p>
                <p>$ 12.000</p>
                </div>

                <div className='precio-resumen precio-total-resumen d-flex justify-content-between'>
                <p>Total</p>
                 <p>$ {subtotal+12000}</p>
                </div>

                <div className='financiaciacion d-flex'>
                    <small>Financiación con Tarjeta de Credito</small>
                 <small className='cuotas'>Hasta 12 cuotas de $ {(subtotal/12).toFixed(2)}</small>
                </div>

                  {productos && productos.map(ele=>(
                       <div className="producto-resumen d-flex justify-content-between" key={ele.productoId}>
                       <img src={ele.imagen} />
                       <div className='datos-item'>
                           <h5>{ele.nombre[0].toUpperCase()+ele.nombre.slice(1)}</h5>
                           <p>Cantidad: {ele.cantidad}</p>
                           <p>Precio: ${ele.precio}</p>
                            <p><b>Total: $ {ele.cantidad*ele.precio}</b></p>
                       </div>
                    </div>
                  ))}
          
                
            </div>
        
            <div className="contenido-resumen mt-2">

                <div className='promocional d-flex justify-content-between'>
                    <p>CÓDIGO PROMOCIONAL <i className="far fa-question-circle"></i></p>
                    <i className="fas fa-angle-down mr-3" onClick={()=>{document.getElementById('cod').classList.toggle('pedir-codigo')}}></i>
                </div>
                <div className='contenedor-codigo-introducir '>
                <div className='introducir-codigo' id='cod'>
                   <input type="text" placeholder='INTRODUCE TU CODIGO PROMOCIONAL' required/>
                   <div className="linea-codigo"></div>
                   <p className='clausula mt-2'>El uso de mayúsculas, minúsculas y guianes debe ser exacto</p>
                   <button className='btn-checkout btn-descuento  mt-2' disabled>APLICAR </button>
                </div>
                </div>
                

            </div>
            
        </section>
     );
}
 
export default Resumen;