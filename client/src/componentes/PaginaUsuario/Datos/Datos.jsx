import React from 'react';
import { useState } from 'react';
import './Datos.css';

const Datos = () => {

    const [cambiar,setCambiar]=useState(false);

    return (

        <section className='seccion-datosUser'>
            <h4 className='titulo-seccion mt-4'>TUS DATOS</h4>
            <p>Modifica tus datos personales a continuación para que tu cuenta esté actualizada.</p>

            <form>
                <div className="form-grupo d-flex justifty-content-between mb-3 mt-4 ">
                    <div className="grupo">
                        <input type="text" placeholder="* NOMBRE" required />
                        <i className="fas fa-check validado vd"></i>
                        <div className="linea-nombre linea"></div>
                    </div>
                    <div className="grupo">
                        <input type="text" placeholder="* APELLIDOS" required />
                        <i className="fas fa-check validado vd"></i>
                        <div className="linea-apellido linea"></div>
                    </div>
                </div>

                <h4 className='titulo-fecha'>Fecha de nacimiento</h4>

                <div className="form-grupo-datos d-flex  justify-content-between">

                    <div className="grupo-fecha">
                        <input type="number" placeholder="* DÍA" required />
                        <i className="fas fa-check validado vf"></i>
                        <div className="linea linea-dia"></div>
                    </div>
                    <div className="grupo-fecha">
                        <input type="number" placeholder="* MES" required />
                        <i className="fas fa-check validado vf"></i>
                        <div className="linea linea-mes "></div>
                    </div>

                    <div className="grupo-fecha">
                        <input type="number" placeholder="* AÑO" required />
                        <i className="fas fa-check validado vf"></i>
                        <div className="linea linea-año "></div>
                    </div>

                </div>

                <h6 className='titulo-sexo'>SEXO</h6>

                <div className="general-sexo">
                    <div className='subgrupo-sexo'>
                        <input type="checkbox" id="hombre" />
                        <label htmlFor="hombre">Hombre</label>
                        <span className='simulacion'></span>
                        <span className='simulacion2'></span>
                    </div>

                    <div className='subgrupo-sexo'>
                        <input type="checkbox" id="mujer" />
                        <label htmlFor="mujer">Mujer</label>
                        <span className='simulacion'></span>
                        <span className='simulacion2'></span>
                    </div>

                    <div className='subgrupo-sexo'>

                        <input type="checkbox" id="otros" />
                        <label htmlFor="otros">Otros</label>
                        <span className='simulacion'></span>
                        <span className='simulacion2'></span>

                    </div>
                </div>

                <h6 className='titulo-acceso'>DATOS DE ACCESO</h6>

                <div className="grupo-acceso">
                    <input type="text" placeholder="* CORREO ELECTRONICO" required />
                    <i className="fas fa-check validado vc"></i>
                    <div className="linea linea-correo "></div>
                </div>

               {!cambiar && <p className='subtitulo-contraseña' onClick={()=>setCambiar(true)}>CAMBIA TU CONTRASEÑA</p>}
               {cambiar && <p className='subtitulo-contraseña' onClick={()=>setCambiar(false)}>VOLVER</p>}
             

                {cambiar && 
                <div className='seccion-contraseña'>
                    <div className="cambiar-contraseña ">

                        <div className="grupo-acceso">
                            <input type="text" placeholder="* CONTRASEÑA ANTIGUA" required />
                            <i className="fas fa-check validado vc"></i>
                            <div className="linea linea-correo "></div>
                        </div>
                        <div className="grupo-acceso my-3 mb-4">
                            <input type="text" placeholder="* CONTRASEÑA NUEVA" required />
                            <i className="fas fa-check validado vc"></i>
                            <div className="linea linea-correo "></div>
                        </div>

                    </div>

                </div>}



                <button className='btn-cambios d-flex align-items-center justify-content-between'>GUARDAR CAMBIOS <i className="fas fa-long-arrow-alt-right"></i></button>
             


                <h6 className='titulo-acceso mt-5 '>GESTIONAR CUENTA</h6>
                <span className='btn-gestionar mb-5 d-flex align-items-center justify-content-between'>ELIMINAR LA CUENTA<i className="fas fa-long-arrow-alt-right ml-2"></i></span>




            </form>


        </section>
    );
}

export default Datos;