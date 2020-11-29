import {
  GET_PRODUCTOS,
  GET_PRODUCTO_DETALLE,
  ADD_PRODUCTO,
  SEARCH_PRODUCTO,
  MODIFY_PRODUCTO,
  REMOVE_PRODUCTO,
} from "../actions/ActionTypes";

const initialState = {
  TodosLosProductos: [{ productos: [{}] }],
  isLoaded: false,
  Res: {},
};
export default function productoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTOS:
      return {
        ...state,
        TodosLosProductos: action.payload,
        images: action.payload.images.map((imagen) => {
          return imagen
        })
      };

    case GET_PRODUCTO_DETALLE:
      return {
        ...state,
        TodosLosProductos: action.payload,
      };

    case ADD_PRODUCTO:
      return {
        ...state,
        Res: action.payload,
      };
    case SEARCH_PRODUCTO:
      return;
    case MODIFY_PRODUCTO:
      return {
        ...state,
        Res: action.payload,
      };
    case REMOVE_PRODUCTO:
      return;
    default:
      return state;
  }
}
