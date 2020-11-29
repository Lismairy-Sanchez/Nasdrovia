import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { cartButton, userButton, searchButton } from "../../Multimedia/Svgs";
import {
  Container,
  Nav,
  Navbar,
  Button,
  Form,
  FormControl,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import "./SearchBar.css";
import Results from "../Categoria/Categoria";
import Axios from "axios";
import FormulariosIngreso from "../FormulariosIngreso/FormulariosIngreso";

export default function SearchBar() {
  //Hooks

  const [search, setSearch] = useState({ query: "" });
  const [productos, setProductos] = useState({ res: null, isLoaded: false });
  const [data, setData] = useState({ res: null, isLoaded: false });
  const [cat, setCat] = useState({ res: null, isLoaded: false });
  const [formulario, setFormulario] = useState("inactivo");
  const [tipo, setTipo] = useState("");

  // ----- Funcionalidad ----

  const handleChange = (event) => {
    event.preventDefault();
    setSearch({ ...search, query: event.target.value });
  };
  const handleClick = () => {
    Axios.get(`http://localhost:3001/search?busqueda=${search.query}`).then(
      (data) => {
        setData({ res: data.data, isLoaded: true });
      }
    );
    Axios.get("http://localhost:3001/categorias").then((data) => {
      setCat({
        res: data.data.map((e) => {
          e.select = false;
          return e;
        }),
        isLoaded: true,
      });
    });
  };
  useEffect(() => {
    if (data.isLoaded) {
      setProductos(data);
    }
  }, [data]);

  return (
    <Container fluid>
      <Navbar className="navbar-custom" variant="dark">
        <Navbar.Brand href="/productos">
          <img
            src="https://i.pinimg.com/564x/ac/de/80/acde80ebc88d4dda88b10f7697cef890.jpg"
            alt="Logo"
            width="90px"
            height="90px"
          />
        </Navbar.Brand>
        <Form inline>
          <FormControl
            type="search"
            placeholder="Buscar..."
            onChange={handleChange}
            className="mr-sm-2"
          />
          <FormControl.Feedback />
          <Button onClick={handleClick} variant="outline-info">
            {searchButton}
          </Button>
        </Form>
        <div className="carrito">
          <i className="fas fa-shopping-bag icono-carro" />
        </div>
        <NavDropdown
          title={<i className="fas fa-user-circle"></i>}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item href="/formulario-categoria">
            Formulario Categoria
          </NavDropdown.Item>
          <NavDropdown.Item href="/formulario-crud">
            Formulario Producto
          </NavDropdown.Item>
        </NavDropdown>

        <div className="usuario-login d-flex align-items-center mt-1">
          <i
            className="fas fa-user-circle"
            onClick={() => {
              setFormulario("activo");
              setTipo("registrar");
            }}
          ></i>
          <p className="m-0 p-0 ml-2 text-white">Log In</p>
        </div>
      </Navbar>
      <FormulariosIngreso
        setTipo={setTipo}
        tipo={tipo}
        formulario={formulario}
        setFormulario={setFormulario}
      />
      {productos.isLoaded ? (
        <Results
          productos={productos}
          cat={cat}
          setCat={setCat}
          setProductos={setProductos}
          data={data}
        />
      ) : (
        <> </>
      )}
    </Container>
  );
}
