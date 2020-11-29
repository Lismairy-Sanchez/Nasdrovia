import React, { useEffect, useState } from 'react';
import Encabezado from './Encabezado';
import Titulos from './Titulos';
import Listado from './Listado';
import './Usuarios.css';
import Axios from 'axios';
import { Modal, Button } from "react-bootstrap";

const ListaUsuarios = () => {
    //todos los usuarios
    const [users, setUsers] = useState({ res: null, isLoaded: false })
    //modal promover
    const [show, setShow] = useState(false);
    //modal elim user
    const [showe, setShowe] = useState(false);
    //modal exito
    const [showa, setShowea] = useState(false);
    //usuario a promover
    const [user, setUser] = useState()
    //rol del usuario clickeado
    const [estado, setEstado] = useState();
    //nombre del usuario clickeado
    const [nombre, setNombre] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClosee = () => setShowe(false);
    const handleShowe = () => { setShowe(true); setShow(false); }
    const handleClosea = () => setShowea(false);
    const handleShowa = () => setShowea(true);

    const promover = () => {
        Axios.post(`http://localhost:3001/auth/promote/${user}`)
            .then(res => console.log(res))
            .catch(err => console.log(err.message))
        handleClose()
        handleShowa()
    }

    const revocar = () => {
        Axios.post(`http://localhost:3001/auth/revoque/${user}`)
            .then(res => console.log(res))
            .catch(err => console.log(err.message))
        handleClose()
        handleShowa()
    }

    const datos = (id) => {
        Axios.get(`http://localhost:3001/usuario/${id}`)
            .then(res => {
                setEstado(res.data.rol)
                setNombre(res.data.nombre)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const mostrar = () => {
        Axios.get("http://localhost:3001/usuario/")
            .then(respuesta => {
                setUsers({ res: respuesta.data, isLoaded: true })
            })
            .catch(err => {
                console.log(err.message)
                setUsers({ res: null, isLoaded: false })
            })
    }

    const elimUser = () => {
        Axios.delete(`http://localhost:3001/usuario/${user}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err.message)
            })
        handleClosee()
        handleShowa()
    }

    const selec = (id) => {
        setUser(id)
        datos(id)
        handleShow()
    }

    useEffect(() => {
        mostrar()
    }, [showa])


    return (
        <div>
            <div className='total listado-usuarios '>
                <div className='container general '>
                    <Encabezado usuarios={users} />
                    <Titulos />
                    <Listado usuarios={users} selec={selec} />
                </div>
            </div>
            {/* modal que permite promover o revocar */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {estado !== "admin" ? <Modal.Title>promover usuario a Admin</Modal.Title> : <Modal.Title>Revocar permisos de administrador</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    {estado !== "admin" ? <p>esta a punto de promover el usuario {nombre}</p> : <p>se revocaran los permisos del usuario {nombre}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary mx-auto" onClick={handleShowe}>
                        eliminar usuario
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        salir
                    </Button>
                    {estado !== "admin" ? <Button variant="danger" onClick={promover}>Promover</Button> : <Button variant="danger" onClick={revocar}>Revocar</Button>}
                </Modal.Footer>
            </Modal>
            {/* aviso antes de eliminar usuario */}
            <Modal show={showe} onHide={handleClosee}>
                <Modal.Header closeButton>
                    <Modal.Title>Esta seguro que desea eliminar el usuario {nombre}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Esta accion no se puede desacer, continuar?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosee}>
                        cancelar
                    </Button>
                    <Button variant="danger" onClick={elimUser}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
            {/* modal de succes */}
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
    );
}

export default ListaUsuarios;