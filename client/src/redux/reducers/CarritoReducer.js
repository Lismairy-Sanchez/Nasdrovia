
import {
  GET_USUARIO_CARRITO,
  POST_USUARIO_CARRITO,
  GET_VISITANTE_CARRITO,
  POST_VISITANTE_CARRITO,
  EDITAR_VISITANTE_CARRITO,
  DELETE_CARRITO,
  PUT_CATEGORIA,
} from "../actions/ActionTypes";

const initialState = {
  id: 0,
  CarritoCompleto: [{}],
  lineaDeOrdens: [{}],
  productos: [{}],
  Res: {},
};

export default function carritoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USUARIO_CARRITO:
      return {
        ...state,
        CarritoCompleto: action.payload,
        lineaDeOrdens: action.payload.lineaDeOrdens,
        id: action.payload.id,
      };

    case POST_USUARIO_CARRITO:
      return {
        ...state,
        Res: action.payload,
      };
    case GET_VISITANTE_CARRITO:
    //falta construir

    case DELETE_CARRITO:
      return;
    default:
      return state;
  }
}