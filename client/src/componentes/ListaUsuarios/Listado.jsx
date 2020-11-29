import React from 'react';

const Listado = (props) => {

    document.addEventListener('click', function (event) {
        if (!event.target.matches('.col-3')) return;
        event.preventDefault();
        props.selec(event.target.parentElement.id);
    }, false);

    return (
        props.usuarios.res !== null ? props.usuarios.res.map(usuario => {
            const { id, nombre, email, rol } = usuario;
            return (
                <section className='categorias-h row py-1 py-md-2 mb-1' key={id} id={id}>
                    <div className="col-3 text-center">{id}</div>
                    <div className="col-3 text-center">{nombre}</div>
                    <div className="col-3 text-center">{email}</div>
                    <div className="col-3 text-center">{rol}</div>
                </section>
            )
        }) : <p>cargando usuarios...</p>

    );
}

export default Listado;