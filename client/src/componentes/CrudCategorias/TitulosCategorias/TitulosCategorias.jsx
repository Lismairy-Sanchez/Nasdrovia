import React from 'react';



const TitulosCategorias = () => {
    return (  
        <section className='titulos row text-white py-2 font-weight-bold mb-1'>
            <div className="col-2 text-center">Código</div>
            <div className="col-3 text-center">Nombre</div>
            <div className="col-5 text-center">Descripción</div>
            <div className="col-2 text-center">Acciones</div>
        </section>
    );
}
 
export default TitulosCategorias;