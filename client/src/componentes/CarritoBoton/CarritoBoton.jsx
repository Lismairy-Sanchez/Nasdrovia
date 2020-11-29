import React, { useState, useEffect } from "react";
import "./carroBoton.css";
import anime from "animejs/lib/anime.es.js";
import { useSelector } from "react-redux";
import swal from "sweetalert";

export default function CarroBoton({
  nombreR,
  stock,
  productoId,
  precio,
  imagen,
  nombre,
}) {
  const [producto, setProducto] = useState([]);
  // estado redux
  const usuarioLogin = useSelector((state) => state.usuario);

  const idCarrito = useSelector((state) => state.carrito.CarritoCompleto.id);
  const [error, setError] = useState("");
  // estado hook
  const [cantidad, setCantidad] = useState(0);
  //effects
  const [aumentar, setAumentar] = useState(false);

  useEffect(() => {
    let productos = localStorage["carrito"];
    if (productos) {
      let actual = JSON.parse(productos).find((ele) => ele.nombre === nombre);
      actual && setCantidad(actual.cantidad);
    }
    setAumentar(false);
  }, [aumentar]);

  useEffect(() => {
    if (cantidad === 0) {
      const tl = anime.timeline();
      anime.remove(`#carroBotonMin${nombreR}`);
      tl.add({
        targets: `#carroBotonMin${nombreR}`,
        opacity: 0,
        delay: -200,
        duration: 100,
      });
      anime.remove(`#cantidadCarro${nombreR}`);
      tl.add({
        targets: `#cantidadCarro${nombreR}`,
        opacity: 0,
        delay: -200,
        duration: 100,
      });
      anime.remove(`#carro${nombreR}`);
      tl.add({
        targets: `#carro${nombreR}`,
        marginLeft: -12,
        delay: -200,
        duration: 0,
      });
      anime.remove(`#carro-full${nombreR}`);
      tl.add({
        targets: `#carro-full${nombreR}`,
        width: 80,
        duration: 0,
      });
    }
    if (cantidad > 0) {
      const tl2 = anime.timeline();
      tl2.add({
        targets: `#carro-full${nombreR}`,
        width: 150,
        duration: 200,
      });
      tl2.add({
        targets: `#carro${nombreR}`,
        marginLeft: 55,
        delay: 200,
      });
      tl2.add({
        targets: `#carroBotonMin${nombreR}`,
        opacity: 1,
        duration: 100,
        delay: -25,
      });
      tl2.add({
        targets: `#cantidadCarro${nombreR}`,
        opacity: 1,
        duration: 100,
        delay: -25,
      });
    }
    if (cantidad < 0) {
      setCantidad(0);
    }
    const { id, carroId } = usuarioLogin;
    let list = [];
  }, [cantidad, stock]);

  function handleClick() {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
      let carrito = localStorage["carrito"];
      if (carrito) {
        if (carrito.length > 0) {
          let carriton = JSON.parse(localStorage["carrito"]);

          let actual = carriton.find((p) => p.nombre == nombre);

          if (actual) {
            let nuevo = carriton.filter((pro) => pro.nombre !== nombre);
            actual.cantidad = cantidad + 1;

            nuevo.push(actual);
            localStorage.setItem("carrito", JSON.stringify(nuevo));
          } else {
            let objeto = {
              nombre,
              cantidad: cantidad + 1,
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
          cantidad: cantidad + 1,
          nombre,
          productoId,
          stock,
          imagen,
        };
        carritos.push(objeto);
        localStorage.setItem("carrito", JSON.stringify(carritos));
      }

      setAumentar(true);
    }

    if (cantidad === stock) {
      swal("Lo siento!", "Has superado el limite del stock", "error");
    }

    const tl = anime.timeline();
    tl.add({
      targets: `#carro${nombreR}`,
      scale: [{ value: 1 }, { value: 1.4 }, { value: 0.6, delay: 250 }],
      rotateY: 1080,
      translateY: -50,
      opacity: [{ value: 1 }, { value: 0, delay: 250 }],
      easing: "easeInOutSine",
      duration: 250,
    });
    tl.add({
      targets: `#carro${nombreR}`,
      rotateY: 0,
      translateY: 0,
      scale: 1,
      opacity: { value: 1, delay: 200 },
      easing: "easeInOutSine",
      duration: 100,
    });
  }

  function handleClickMin() {
    setCantidad(cantidad - 1);
    let carrito = JSON.parse(localStorage["carrito"]);
    let actual = carrito.find((pro) => pro.nombre === nombre);
    let carritoFiltrado = carrito.filter((pro) => pro.nombre !== nombre);
    actual.cantidad = cantidad - 1;
    carritoFiltrado.push(actual);
    localStorage.setItem("carrito", JSON.stringify(carritoFiltrado));
    setAumentar(true);
  }
  return (
    <div className="carroBoton-Container">
      <div
        onClick={handleClickMin}
        className="carroBotonMin"
        id={`carroBotonMin${nombreR}`}
      >
        <i className="fas fa-minus-circle"></i>
      </div>
      <div id={`cantidadCarro${nombreR}`} className="cantidad-carro">
        {cantidad}
      </div>
      <div onClick={handleClick} className="carroBoton" id={`carro${nombreR}`}>
        <i
          className="fas fa-cart-plus"
          style={{ fontSize: 28, marginTop: 6 }}
          id={`icono${nombreR}`}
        ></i>
      </div>
    </div>
  );
}
