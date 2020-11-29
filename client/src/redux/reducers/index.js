import { combineReducers } from "redux";

//Aca importo reducers
import ProductoReducer from "./productoReducer";
import UsuarioReducer from "./UsuarioReducer";
import CarritoReducer from "./CarritoReducer";

export default combineReducers({
  // aca los reducers;

  carrito: CarritoReducer,
  productos: ProductoReducer,
  usuario: UsuarioReducer,
});
