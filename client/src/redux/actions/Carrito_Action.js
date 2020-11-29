import {
  GET_USUARIO_CARRITO,
  POST_USUARIO_CARRITO,
  GET_VISITANTE_CARRITO,
  POST_VISITANTE_CARRITO,
  EDITAR_VISITANTE_CARRITO,
  DELETE_CARRITO,
  PUT_CATEGORIA,
} from "./ActionTypes";
import axios from "axios";

//NO TOCAR - MODIFICANDO EN BASE A RUTAS

//Esta esta totalmente incompleta,
export const getUsuarioCarrito = (usuarioId) => (dispatch) => {
  axios
    .get(`http://localhost:3001/usuario/${usuarioId}/cart`) //falta url
    .then((res) => {
      dispatch({
        type: GET_USUARIO_CARRITO,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch(postUsuarioCarrito(usuarioId));
    });
};

//post a usuario
//revisar que este bien igual que las demas.
export const postUsuarioCarrito = (usuarioId) => (dispatch) => {
  axios.post(`http://localhost:3001/usuario/${usuarioId}/cart`).then((res) => {
    dispatch({
      type: POST_USUARIO_CARRITO,
      payload: res.data,
    });

    dispatch(postUsuarioCarrito(usuarioId));
  });
};

//delete carrito
export const deleteCarrito = () => (dispatch) => {
  dispatch({
    type: DELETE_CARRITO,
    payload: null,
  });
};

//get a visitante
export const getVisCarrito = (idUser) => (dispatch) => {
  axios
    .get(`http://localhost:3001/usuarios/${idUser}/cart`)
    .then((res) => {
      const getVisCarro = res.data;

      dispatch({
        type: GET_VISITANTE_CARRITO,
        payload: getVisCarro,
      });

      dispatch(getVisCarrito());
    })
    .catch((err) => {
      const error = err.res.data;
      dispatch(error);
    });
};

// //post a carrito
// export const postVisCarrito = (idUser, body) => (dispatch) => {
//   axios
//     .post(`http://localhost:3001/usuarios/${idUser}/cart`, body)
//     .then((res) => {
//       const postVisCarro = res.data;

//       dispatch({
//         type: POST_VISITANTE_CARRITO,
//         payload: postVisCarro,
//       });

//       dispatch(postVisCarrito());
//     })

//     .catch((err) => {
//       const error = err.res.data;
//       dispatch(error);
//     });
// };

// //put a visitante
// export const putVisCarrito = (idUser, body) => (dispatch) => {
//   axios
//     .put(`http://localhost:3001/usuarios/${idUser}/cart`, body)
//     .then((res) => {
//       const modificarVisC = res.data;

//       dispatch({
//         type: EDITAR_VISITANTE_CARRITO,
//         payload: modificarVisC,
//       });

//       dispatch(putVisCarrito());
//     })

//     .catch((err) => {
//       const error = err.respuesta.data;
//       dispatch(error);
//     });
// };

// =============== EXPORT DEFAULT FUNCTIONS CARRITO ================ //
export default { getUsuarioCarrito, postUsuarioCarrito, deleteCarrito };