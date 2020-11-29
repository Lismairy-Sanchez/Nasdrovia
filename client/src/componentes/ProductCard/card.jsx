import React, { useState, useEffect } from "react";
import "./card.css";
import anime from "animejs/lib/anime.es.js";
import { Link } from "react-router-dom";
import CarroBoton from "../CarritoBoton/CarritoBoton";
import Stars from "../reviews/stars/stars";
import Axios from "axios";

export default function Card({ producto, stockDisplay, setSearchClick }) {
  const [stars, setStars] = useState({ res: null, isLoaded: false });
  const { nombre, precio, images, stock, id } = producto;
  console.log(images[0].i1)
  
  const nombreR = nombre.replace(" ", "_");
  useEffect(() => {
    Axios.get(`http://localhost:3001/producto/${id}/reviewprom`).then((res) => {
      setStars({ res: res.data, isLoaded: true });
    });

    anime({
      targets: ".card-css .img-product-card",
      opacity: 1,
      duration: 500,
      delay: anime.stagger(500, { start: 250 }),
    });
  }, []);
  function mouseEnterHandle() {
    const tl = anime.timeline({
      duration: 800,
    });
    tl.add({
      targets: `#${nombreR}`,
      translateY: [-150, -55],
      translateX: -220,
      opacity: 1,
    });
    tl.add({
      targets: `#img${nombreR}`,
      translateY: [55, -45],
    });
    tl.add({
      targets: `#icono${nombreR}`,
      delay: 800,
    });
  }
  function mouseLeaveHandle() {
    anime.remove(`#${nombreR}`);
    anime.remove(`#img${nombreR}`);
    const tl = anime.timeline({
      duration: 300,
    });
    tl.add({
      targets: `#${nombreR}`,
      translateX: 0,
      translateY: 0,
      opacity: 0,
    });
    tl.add({
      targets: `#img${nombreR}`,
      translateY: 0,
    });
  }

  return (
    <div
      className="card-css-container"
      onMouseEnter={mouseEnterHandle}
      onMouseLeave={mouseLeaveHandle}
    >
      <div className="card-css">
        {stockDisplay ? (
          <div className="carro" id={`carro-full${nombreR}`}>
            <CarroBoton
              nombre={nombre}
              nombreR={nombreR}
              stock={stock}
              productoId={id}
              precio={precio}
             imagen={images[0].i1}
             nombre={nombre}
            />
          </div>
        ) : (
          <> </>
        )}
        <Link to={`/producto/${id}`} className="link" onClick={setSearchClick}>
          <div>
            <img
              className="img-product-card"
              id={`img${nombreR}`}
               src={images[0].i1}
              alt={nombre}
            />
          </div>
          <div id={nombreR} className={`decorativa ${nombreR}`}></div>
          <div className="card-body-css">
            <div className="boton">
              <div className="info">
                <h2 className={`${nombreR} cerveza_nombre`}>{nombre}</h2>
              </div>
              <div style={{ position: "absolute", marginTop: "100px" }}>
                {stars.isLoaded && ~~stars.res !== 0 ? (
                  <Stars calificacion={stars.res + 1} size={12} />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <h4 className="precio_nombre">precio:</h4>
            <h3 className="precio">${precio}</h3>
            <h5 className="stock">Stock:{stock}</h5>
          </div>
        </Link>
      </div>
    </div>
  );
}
