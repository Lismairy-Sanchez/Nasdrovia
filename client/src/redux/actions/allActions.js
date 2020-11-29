import {
  getProductos,
  getProductoDetalle,
  addProducto,
  buscarProducto,
  modificarProducto,
  deleteProducto,
} from "./Producto_Action";
import {
  getUsuarioCarrito,
  postUsuarioCarrito,
  deleteCarrito,
} from "./Carrito_Action";
import { logout, login } from "./Usuario_Action";

const allActions = {
  // ===== PRODUCTOS ===== //
  getProductos,
  getProductoDetalle,
  addProducto,
  buscarProducto,
  modificarProducto,
  deleteProducto,
  // ===== CARRITO ===== //
  getUsuarioCarrito,
  postUsuarioCarrito,
  deleteCarrito,
  // ===== USUARIO ===== //
  logout,
  login,
};

export default allActions;
