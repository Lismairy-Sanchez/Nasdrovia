import React from 'react'
import {Spinner } from 'react-bootstrap';
import "./Loader.css";

export default function Loader (){
    return (
    <div className="Loader">
        <Spinner animation="border" role="status" variant="primary" >
        <span className="sr-only">Cargando...</span>
        </Spinner>
    </div>
    )
}