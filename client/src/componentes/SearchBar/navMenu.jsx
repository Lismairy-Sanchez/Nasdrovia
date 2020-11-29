import React from 'react'
import {
    Container,
    Navbar,
  } from "react-bootstrap";

export default function NavMenu(){
    return (
        <Container fluid>
        <Navbar className="navbar-custom" variant="dark">
        <Navbar.Brand href="/">
            <img
            src="https://i.pinimg.com/564x/ac/de/80/acde80ebc88d4dda88b10f7697cef890.jpg"
            alt="Logo"
            width="90px"
            height="90px"
            />
        </Navbar.Brand>
        </Navbar>
        </Container>
    )
}