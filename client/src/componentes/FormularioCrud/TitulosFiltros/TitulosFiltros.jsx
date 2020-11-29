import React from 'react';


const TitulosFiltros = () => {
    return ( 
        <section className="titulos row py-1 py-md-2 text-white font-weight-bold mb-1">
        <div className="col-4 col-md-1 text-center text-md-left">Código</div>
        <div className="col-4 col-md-1 text-center text-md-left">Nombre</div>
        <div className="d-none d-md-block col-md-4">Descripción</div>
        <div className="d-none d-md-block col-md-1">Imagenes</div>
        <div className="d-none d-md-block col-md-1">Stock</div>
        <div className="d-none d-md-block col-md-2 ">Categorias</div>
        <div className="d-none d-md-block col-md-1 ">Precio</div>
        <div className="col-4 col-md-1 text-center text-md-left">Acciones</div>
    </section>
     );
}
 
export default TitulosFiltros;