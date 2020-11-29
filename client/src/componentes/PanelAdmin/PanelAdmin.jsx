import React from 'react'
import './PanelAdmin.css'
import { Link } from 'react-router-dom';


const PanelAdmin = () => {


    return (
        <div className='contenedor-admin' id='panel'>
            <span className='cerrar' onClick={() => document.getElementById('panel').classList.toggle('mostrar')}>X</span>
            <img src="https://i.pinimg.com/564x/ac/de/80/acde80ebc88d4dda88b10f7697cef890.jpg" alt="logo" />
            <hr className='linea-logo ' />

            <div className="contorno mt-4">
                <div className="img-admin">
                    <img src="https://p16-va-tiktok.ibyteimg.com/img/musically-maliva-obj/2a8ae6e4867f47393951b4d4eae7948f~c5_1080x1080.jpeg" alt="" />
                </div>
            </div>
            <small>Hola Admin</small>

            <h4 className='text-white mb-4 mt-3'>Administración</h4>
            <nav id='nav'>
                <Link className='link-admin' to='/ordenes'>Ordenes</Link>
                <Link className='link-admin' to='/formulario-crud'>Productos</Link>
                <Link className='link-admin' to='/formulario-categoria'>Categorias</Link>
                <Link className='link-admin' to='/usuarios'>Usuarios</Link>
                <Link className='link-admin' to='/ajustes'>Ajustes de cuenta</Link>
            </nav>


        </div>
    );
}

export default PanelAdmin;