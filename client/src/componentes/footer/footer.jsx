import React from "react";
import "./footer.css"

const Footer = () => {
    return (
        <footer className="footer-css-full">
            <nav className="navbar navbar-default navbar-custom">
                <div className="container-fluid container-footer-css">
                    <div className="nav navbar-nav navbar-left">
                        <ul className="footerleft">

                            <p className="texto" href="">Links Utiles</p>

                            <li >
                                <a className="texto" href="https://www.soyhenry.com/">Henry</a>
                            </li>
                        </ul>
                    </div>

                    <div className="iconos">
                        <div className="as">
                            <a href="https://www.instagram.com/nasdroviabeerstore/"><i className="fab fa-instagram fa-3x"></i></a>
                        </div>
                        <div className="as">
                            <a href="https://www.facebook.com/nasdrovia.beerstore.9"><i className="fab fa-facebook-f fa-3x"></i></a>
                        </div>
                        <div className="as">
                            <a href="https://github.com/henry-labs/ecommerce-ft05-g10"><i className="fab fa-github fa-3x"></i></a>
                        </div>
                    </div>
                    <div className="nav navbar-nav navbar-right">
                        <p className="texto">Nasdrovia es un proyecto desarrollado con <br></br>fines educativos por alumnos de Henry</p>
                    </div>

                </div>

            </nav>
        </footer >
    );
}

export default Footer;