import { LOGIN, LOGOUT } from "../actions/ActionTypes";

//Harcodeado, problema que solo lee guest
const initialState = {
  rol: "Guest",
  id: 0,
  email: null,
  nombre: null,
  carritoId: null,
};

export default function UsuarioReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      const rol = action.payload.rol;
      const id = action.payload.id;
      const email = action.payload.email;
      const nombre = action.payload.nombre;
      const carroId = action.payload.carritoId;
      return {
        ...state,
        rol,
        id,
        email,
        nombre,
        carroId,
      };
    case LOGOUT:
      return {
        ...state,
        rol: "Guest",
        id: 0,
        email: null,
        nombre: null,
        carroId: null,
      };
    default:
      return state;
  }
}
