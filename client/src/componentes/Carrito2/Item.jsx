import React, { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';


const Item = ({ nombre, precio, cantidad, imagen, stock, productoId, setCambio, setTotal,setItems }) => {

  const [cantidadActual, setCantidadActual] = useState(cantidad);
  
  let cantidadItems=0;
  let carrito = localStorage["carrito"] ? JSON.parse(localStorage['carrito']):[];
  if(carrito){carrito.forEach((car)=>{cantidadItems+=parseInt(car.cantidad)})}
  console.log(cantidadItems)

  const aumentarCantidad = async () => {
    let carrito = localStorage["carrito"];
    let respuesta = await axios.get(`http://localhost:3001/producto/${productoId}`)
    let stockPro = await respuesta.data.stock;

    if (cantidadActual < stockPro) {

      if (cantidad < stock) {
        if (carrito) {
          if (carrito.length > 0) {
            let carriton = JSON.parse(localStorage["carrito"]);
            let actual = carriton.find((p) => p.nombre == nombre);
            if (actual) {
              let nuevo = carriton.filter((pro) => pro.nombre !== nombre);
              actual.cantidad = cantidadActual + 1;
              nuevo.push(actual);
              localStorage.setItem("carrito", JSON.stringify(nuevo));
            } else {
              let objeto = {
                nombre,
                cantidad: cantidadActual + 1,
                precio,
                productoId,
                stock,
                imagen,
              };
              carriton.push(objeto);
              localStorage.setItem("carrito", JSON.stringify(carriton));
            }
          }
        } else {
          let carritos = [];
          let objeto = {
            precio,
            cantidad: cantidadActual + 1,
            nombre,
            productoId,
            stock,
            imagen,
          };
          carritos.push(objeto);
          localStorage.setItem("carrito", JSON.stringify(carritos));
        }
        setCantidadActual(cantidadActual + 1);
        setTotal(true);
        cantidadItems=cantidadItems+1;
        setItems(cantidadItems)
      
      }
     
    }
    if(cantidadActual===stock){
      swal("Lo siento!", "Has superado el limite del stock", "error");
    }

  };

  const disminuirCantidad = () => {
    if (cantidadActual > 1) {
      let carrito = JSON.parse(localStorage['carrito']);
      let actual = carrito.find(pro => pro.nombre === nombre);
      let carritoFiltrado = carrito.filter(pro => pro.nombre !== nombre);
      actual.cantidad = cantidadActual - 1;
      carritoFiltrado.push(actual)
      localStorage.setItem('carrito', JSON.stringify(carritoFiltrado));
      setCantidadActual(cantidadActual - 1);
    }
    setTotal(true);
    cantidadItems=cantidadItems-1;
    setItems(cantidadItems)
  }

  const eliminarProducto = () => {
    let carrito = JSON.parse(localStorage['carrito']);
    let nuevo = carrito.filter(pro => pro.nombre !== nombre);
    localStorage.setItem('carrito', JSON.stringify(nuevo));
    setCambio(true);
    setTotal(true);
  }



  return (
    <div className="cont-general d-flex align-items-center ">
      <div className="cont-image text-center py-1">
        <img src={imagen} />
        <div className="sombra-imagen"></div>
      </div>

      <div className="cont-body ml-4">
        <h4>{nombre}</h4>
        <p>${precio}</p>
        <div className="cont-cantidad d-flex text-center">
          <small className="s">
            <i className="fas fa-minus" onClick={disminuirCantidad}></i>
          </small>
          <small>{cantidadActual}</small>
          <small>
            <i className="fas fa-plus" onClick={aumentarCantidad}></i>
          </small>
        </div>
      </div>
      <div className="cont-subtotal d-flex justify-content-between align-items-start">
        <small>$ {precio * cantidadActual}</small>
        <small className="eliminar" onClick={eliminarProducto}>X</small>
      </div>
     
    </div>
  );
};

export default Item;
