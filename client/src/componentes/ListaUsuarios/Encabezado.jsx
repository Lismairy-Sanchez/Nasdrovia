import React from 'react';




const Encabezado = () => {

    return (
        <div className="row align-items-center ">
            <div
                className="encabezado col-12  d-flex justify-content-between m-0  align-items-center py-2 mb-1 mx-auto">
                <h4 className="titulo-lista text-white m-0 pb-1">Listado de Usuarios</h4>
            </div>

            <div className="encabezado col-12 d-flex align-items-center py-2 mb-1 mx-auto">
                <div className="grupo-header d-flex align-items-center mr-2 mr-md-4">
                    <p className="titulo-pro m-0 text-white mr-2">Código:</p>
                    <input type="text" placeholder="Código" />
                </div>
                <div className="grupo-header d-flex align-items-center  mr-2 mr-md-4">
                    <p className="titulo-pro m-0 text-white mr-2">Nombre:</p>
                    <input type="text" placeholder="Nombre" />
                </div>
                <button className="btn-buscar text-white py-0 py-md-1 px-2  px-md-2"><i className="fas fa-search mr-1 mr-md-2"></i>Buscar</button>
            </div>
        </div>
    );
}

export default Encabezado;