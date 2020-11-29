import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./styles/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
//Aplicando Redux Persist
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./redux/store/index";
const { persistor, store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
