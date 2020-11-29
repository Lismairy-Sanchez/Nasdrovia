import React from "react"
import { Carousel } from "react-bootstrap"
import "./carrousel.css"
export default function Carrusel() {
    return (
        <div className="ads">
            <Carousel>
                <Carousel.Item className="item" interval={1000}>
                    <img
                        className="slide"
                        src="https://i.ibb.co/P4fDpCC/nasdrovia-2.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item className="item" interval={500}>
                    <img
                        className="slide"
                        src="https://i.ibb.co/9hM48bY/nasdrovfia-3.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>)

}