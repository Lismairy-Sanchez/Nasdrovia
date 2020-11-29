import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SearchBar from "./componentes/SearchBar/navBar.jsx";
import Shop from "./componentes/Categoria/Shop";
import FormularioCrud from "./componentes/FormularioCrud/FormularioCrud.jsx";
import Home from "./componentes/Home/Home.jsx";
import CrudCategoria from "./componentes/CrudCategorias/CrudCategoria";
import PanelAdmin from "./componentes/PanelAdmin/PanelAdmin";
import ListaOrdenes2 from "./componentes/ListaOrdenes2/LineaOrdenes2";
import Checkout from "./componentes/Checkout/Checkout";
import Orden2 from "./componentes/Orden2/Orden2";
import Usuarios from "./componentes/ListaUsuarios/Usuarios";
import Perfil from "./componentes/PaginaUsuario/PaginaUsuario";
import EmailPassword from "./componentes/FormulariosIngreso/FormPassword/FormPassword.jsx";
import PasswordReset from "./componentes/FormulariosIngreso/resetpassword/passReset.jsx";
import Footer from "./componentes/footer/footer.jsx";
import Moodal from "./componentes/modal+18/modal.jsx";

import Carrito2 from "./componentes/Carrito2/Carrito";
import ProductInfo from "./componentes/ProductInfo/ProductInfo";
import Carrusel from "./componentes/carrousel/carrousel";

//React Router
//Faltan actions
//Pasar todo mediante un UseEffect

export default function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={SearchBar} />
        <Route path="/" component={Moodal} />
        <Route exact path="/" component={Carrusel} />
        <Route exact path="/" component={Shop} />
        <Route exact path="/" component={Home} />
        <Route exact path="/" component={PanelAdmin} />
        <Switch>
          <Route exact path="/perfil" component={Perfil} />
          <Route exact path="/ordenes" component={ListaOrdenes2} />
          <Route exact path="/orden" component={Orden2} />
          <Route exact path="/usuarios" component={Usuarios} />

        

          <Route exact path="/formulario-categoria" component={CrudCategoria} />
          {/* <Route exact path="/producto/:id" component={Producto} />  */}
          <Route exact path="/formulario-crud" component={FormularioCrud} />
          <Route exact path="/carrito" component={Carrito2} />
          <Route exact path="/producto/:id" component={ProductInfo} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/cambioPassword" component={EmailPassword} />
          <Route exact path="/passwordReset/:token" component={PasswordReset} />
        </Switch>
        <Route path="/" component={Footer} /> 
      </Router>
    </div>
  );
}
