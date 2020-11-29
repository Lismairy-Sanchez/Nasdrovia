import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import Cookies from "js-cookie"
export default function Moodal() {
    const [show, setShow] = useState(false);
    var viewed = Cookies.get('viewed');
    if (viewed == undefined) {
        setShow(true)
        Cookies.set('viewed', true)
    } else if (viewed == true) {
        setShow(false);
    }
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header>
                <Modal.Title>Informacion Importante</Modal.Title>
            </Modal.Header>
            <Modal.Body>Para continuar navegando debes confirmar que eres mayor de 18 años, o la edad legal para beber en tu pais</Modal.Body>
            <Modal.Footer>
                <Button href="https://www.google.com/search?ei=LEmYX9DnN6yu5OUPhqStyAU&q=riesgos+del+consumo+de+alcohol+en+los+menores&oq=riesgos+del+consumo+de+alcohol+en+los+menores&gs_lcp=CgZwc3ktYWIQAzoHCAAQRxCwA0oFCAQSATJKBQgHEgExSgUICBIBMUoFCAkSATVKBggKEgIzMFD2JFjsa2C9kAFoBHAAeACAAZABiAG9GJIBBDAuMjSYAQCgAQGqAQdnd3Mtd2l6yAEIwAEB&sclient=psy-ab&ved=0ahUKEwjQrcaUl9XsAhUsF7kGHQZSC1kQ4dUDCAw&uact=5" variant="secondary" >
                    salir
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    soy mayor de 18 años
                </Button>
            </Modal.Footer>
        </Modal>
    );

}