import { LOGIN, LOGOUT } from "./ActionTypes";

//------------ Logueo de Usuario
export const login = (usuario) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: usuario,
  });
};

//-------------Deslogueo de Usuario
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export default {logout, login};