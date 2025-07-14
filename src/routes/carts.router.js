//  /src/routes/carts.router.js

import { Router } from "express";
import passport from "passport";
import CartController from "../controllers/carts.controller.js";

const router = Router();

const cartController = new CartController();

// ✅ Crear carrito vacío
router.post("/", cartController.createEmptyCart);

// ✅ Crear carrito con productos
router.post("/with-products", cartController.createCartWithProducts);

// ✅ Obtener todos los carritos
router.get("/", cartController.getCarts);

// ✅ Obtener carrito por _id
router.get("/id/:id", cartController.getCartById);

// ✅ Obtener carrito del usuario current
router.get("/my-cart", passport.authenticate("jwt", { session: false }), cartController.getCurrentCart);

// ✅ Agregar producto al carrito (por _id)
router.put("/addToCart/:cid/:pid", cartController.addProductToCartByParams);

// ✅ Actualizar cantidad de un producto en el carrito
router.put("/id/:id/product", cartController.updateProductQuantity);

// ✅ Actualizar todo el carrito (por _id)
router.put("/id/:id", cartController.updateCart);

// /src/routes/carts.router.js
router.delete("/id/:id/product/num/:num", cartController.deleteProductFromCart);

// ✅ Eliminar carrito por _id
router.delete("/id/:id", cartController.deleteCart);


export default router;