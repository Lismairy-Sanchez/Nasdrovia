import React from "react";
import { userButton, cartButton } from "../../Multimedia/Svgs";
import {
    NavDropdown,
} from "react-bootstrap";
import "./icons.css"

export default function Icons() {
    return (
        <div className="icons">
            <div className="carrito">{cartButton}</div>
            <NavDropdown title={userButton} id="basic-nav-dropdown">
                <NavDropdown.Item href="/formulario-categoria">Formulario Categoria</NavDropdown.Item>
                <NavDropdown.Item href="/formulario-crud">Formulario Producto</NavDropdown.Item>
            </NavDropdown>
            <div className="usuario"></div>
        </div>
    )
}