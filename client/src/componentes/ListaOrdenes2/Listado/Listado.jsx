import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap"

const Listado = (props) => {
    const [id, setId] = useState(0);
    const [estado, setEstado] = useState();
    const [show, setShow] = useState(false);
    const [showa, setShowa] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClosea = () => { setShowa(false); props.setActualizar(true) };
    const handleShowea = () => setShowa(true);


    const previo = (id) => {
        setId(id)
        handleShow()
    }

    const handleChange = (e) => {
        setEstado(e.target.value)
    }

    const modOrden = () => {
        Axios.put(`http://localhost:3001/ordenes/${id}/cart/status`, { estado: estado })
            .then(res => {
            })
            .catch(err => {
                console.log(err.message)
            })
        handleClose()
        handleShowea()
    }

    return (
        <div>
            {props.lista.res !== null ? props.lista.res.map(orden => {
                let claseBtn = orden.estado === 'carrito' ? 'btn-estado-orden completado' : 'btn-estado-orden rechazado';
                const { id, estado, total, createdAt, updatedAt, usuarioId } = orden;
                return (<section className='categorias-h row py-1 py-md-2 mb-1 text-center' key={id} >
                    <div className="col-2 text-center">{id}</div>
                    <div className="col-2 text-center">
                        <button className={claseBtn} onClick={() => previo(id)}>{estado[0].toUpperCase() + estado.slice(1)}</button>
                    </div>
                    <div className="col-2 text-center">$ {total.toString()[0] + '.' + total.toString().slice(1)}</div>
                    <div className="col-2 text-center">{createdAt.slice(0,10)}</div>
                    <div className="col-2 text-center">{updatedAt.slice(0,10)}</div>
                    <div className="col-2  text-center">{usuarioId}</div>
                </section>)
            }
            ) : <div><p>no se encontraron ordenes que coincidan con el criterio</p></div>}
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar el estado de la orden</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Seleccione el nuevo estado de la orden</p>
                        <select name="custom-select" id="select" onChange={handleChange}>
                            <option selected value="estado...">Estado...</option>
                            <option value="carrito" key={1}>carrito</option>
                            <option value="creada" key={2}>creada</option>
                            <option value="procesando" key={3}>procesando</option>
                            <option value="cancelada" key={4}>cancelada</option>
                            <option value="completa" key={5}>completa</option>
                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Salir
                    </Button>
                        <Button variant="danger" onClick={modOrden}>Aceptar</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showa} onHide={handleClosea}>
                    <Modal.Header closeButton>
                        <Modal.Title>Completado!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Realizado con exito</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClosea}>
                            cerrar
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default Listado;