import React from 'react';
import './Panel.css';
import { useState } from 'react';


const Panel = ({setPagina}) => {

    const [activo,setActivo]=useState('cuenta')

    const actualizarPagina = (pagina)=>{
        setPagina(pagina);
        setActivo(pagina);
    }

    return (  
        <section className='general-panel'>
            <div className="seccion-titulos mt-3">
             <p className={activo === 'cuenta' ? 'item-panel-usuario item-activo':'item-panel-usuario'} onClick={()=>actualizarPagina('cuenta')}>Mi cuenta</p>
             <p className={activo === 'datos' ? 'item-panel-usuario item-activo':'item-panel-usuario'} onClick={()=>actualizarPagina('datos')}>Datos personales</p>
             <p className={activo === 'ordenes' ? 'item-panel-usuario item-activo':'item-panel-usuario'} onClick={()=>actualizarPagina('ordenes')}>Ordenes</p>
        </div>
       
        </section>
    );
}
 
export default Panel;