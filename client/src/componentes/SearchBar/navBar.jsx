import React, {useState, useEffect} from "react"
import Search from "./search"
import Ui from "./ui";
import NavMenu from "./navMenu"
import Resultados from "../Categoria/Categoria";
import "./SearchBar.css";
import Axios from "axios";
import {
    Container,
  } from "react-bootstrap";
  
export default function Menu() {
      //Hooks


  const [search, setSearch] = useState({ query: "" });
  const [productos, setProductos] = useState({res:null, isLoaded:false})
  const [data, setData] = useState({res:null, isLoaded:false})
  const [cat, setCat] = useState({res:null, isLoaded:false});

  // ----- Funcionalidad ----

  const handleChange = (event) => {
    event.preventDefault();
    setSearch({ ...search, query: event.target.value });
  };
  const handleClick =() =>{
    Axios.get(`http://localhost:3001/search?busqueda=${search.query}`).then(data=>{
    setData({res:data.data, isLoaded:true});
    })
    Axios.get('http://localhost:3001/categorias').then(data=>{
    setCat({
    res:data.data.map(e=>{
        e.select=false;
        return e
        }),
        isLoaded:true,
    })
    })
    }
    useEffect(()=>{
    if(data.isLoaded){
    setProductos(data);
    }
    },[data])

    return (
        <div className="return-Page-Container">
            <Container fluid className="nav-Bar-css">
            <NavMenu/>
            <Search 
            handleClick={handleClick}
            handleChange={handleChange}
            />
            <Ui/>
            </Container>
            {productos.isLoaded && search.query.length!==0?
            <Resultados 
            productos={productos}
            setSearch={setSearch}
            cat={cat}
            setCat={setCat}
            setProductos={setProductos}
            data={data}
            />
            : <> </>
            }
        </div>
    )
}

