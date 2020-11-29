import {
  GET_PRODUCTOS,
  GET_PRODUCTO_DETALLE,
  ADD_PRODUCTO,
  SEARCH_PRODUCTO,
  MODIFY_PRODUCTO,
  REMOVE_PRODUCTO,
} from "./ActionTypes";

import axios from "axios";
// URL Back

//Productos
export function getProductos() {
  return function (dispatch) {
    return fetch("http://localhost:3001/producto")
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: GET_PRODUCTOS, payload: json });
      });
  };
}
export const getProductoDetalle = (id) => (dispatch) => {
  axios
    .get(`http://localhost:3001/producto/${id}`)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTO_DETALLE,
        payload: res.data,
        isLoaded: true,
      });
    })
    .catch((err) => console.log(err));
};

//productos por ID
// export function getProductoDetalle(id) {
//   return function (dispatch) {
//     return fetch(`http://localhost:3001/producto/${id}`).then((res) => {
//       console.log(res.data);
//       dispatch({ type: GET_PRODUCTOS, payload: res.json });
//     });
//   };
// }

//añadir producto
export const addProducto = (id, body) => (dispatch) => {
  axios
    .post(`http://localhost:3001/producto/${id}`, body)
    .then((res) => {
      const añadirProd = res.data;

      dispatch({
        type: ADD_PRODUCTO,
        payload: añadirProd,
      });

      dispatch(getProductos());
    })

    .catch((err) => {
      const error = err.respuesta.data;
      dispatch(error);
    });
};

//Buscar producto
export const buscarProducto = (producto) => (dispatch) => {
  axios
    .get(`http://localhost:3001/search?busqueda=${producto}`)
    .then((res) => {
      const search = res.data;

      dispatch({
        type: SEARCH_PRODUCTO,
        payload: search,
      });
    })
    .catch((err) => {
      dispatch(err);
    });
};

//MODIFICAR PRODUCTO
export const modificarProducto = (id, body) => (dispatch) => {
  axios
    .put(`http://localhost:3001/producto/${id}`, body)
    .then((res) => {
      const modificarProd = res.data;

      dispatch({
        type: MODIFY_PRODUCTO,
        payload: modificarProd,
      });

      dispatch(getProductos());
    })

    .catch((err) => {
      const error = err.respuesta.data;
      dispatch(error);
    });
};

//remover producto
export const deleteProducto = () => (dispatch) => {
  dispatch({
    type: REMOVE_PRODUCTO,
    payload: null,
  });
};

// =============== EXPORT DEFAULT FUNCTIONS PRODUCTO ================ //
export default {
  getProductos,
  getProductoDetalle,
  addProducto,
  buscarProducto,
  modificarProducto,
  deleteProducto,
};
