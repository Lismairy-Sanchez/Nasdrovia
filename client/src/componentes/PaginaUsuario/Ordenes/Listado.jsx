import React from 'react';
import { Link } from 'react-router-dom'




const Listado = ({ ordenes, productos }) => {

    let completas = [];

    ordenes.map(orden => { if (orden.lineaDeOrdens.length > 0) { completas.push(orden) } });

    return completas.length > 0 ? (
        completas.map((orden, index) => {
            const { id, createdAt, lineaDeOrdens } = orden;
            let subtotal = 0;
            let unidades = 0;
            lineaDeOrdens.forEach(ele => { subtotal += (ele.precio * ele.cantidad); unidades += ele.cantidad });
            return (
                <section className="row  orden-item" key={index}>
                    <div className="titulo-orden-compra d-flex justify-content-between w-100">
                        <h3>Fecha de compra:  {createdAt.slice(0, 10)}</h3>
                       <Link to='/'><button className='btn-volver'>Volver a comprar</button></Link> 
                    </div>

                    <div className="productos-orden d-flex w-100  justify-content-between">

                        {lineaDeOrdens.map((ele, ind) => {
                            let imagen = productos.find(el => el.id === ele.productoId);
                            return imagen && (<div className="producto-orden d-flex" key={ind}>
                                <div className="imagen-item">
                                    <img src={ imagen.images[0].i1} alt="compra" />
                                </div>
                                <div className='datos-item-orden'>
                                    <p className='m-0'>{imagen.nombre[0].toUpperCase() + imagen.nombre.slice(1)}</p>
                                    <p className='m-0'>${ele.precio} x {ele.cantidad} {ele.cantidad > 1 ? 'unidades' : 'unidad'}</p>
                                </div>
                            </div>)
                        }
                        )}
                        <div className="producto-orden">
                            <p className='m-0'>Código: {id}</p>
                            <p className='m-0'>Unidades: {unidades}</p>
                            <p className='m-0'>Total: <b>${subtotal}</b></p>
                        </div>


                    </div>

                </section>

            )
        }
        )
    ) : <section className='row  orden-item justify-content-center'>
            <p className='m-0 nocom'>NO TIENES COMPRAS. <Link to='/'><span id='empieza'>EMPIEZA A COMPRAR</span></Link> </p>
        </section>;

}

export default Listado;