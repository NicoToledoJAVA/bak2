//  /routes/carts.router.js

import { Router } from "express";
import mongoose from "mongoose";
import cartModel from "../models/cart.model.js";
import { getNextId } from "../utils/getNextId.js";

const router = Router();

// ✅ Crear carrito vacío
router.post("/", async (_, res) => {
  try {
    const nextNum = await getNextId(cartModel);

    const newCart = await cartModel.create({
      _id: new mongoose.Types.ObjectId(),
      products: [],
      total: 0,
      num: nextNum
    });

    res.status(201).json({ message: "Carrito creado", cart: newCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Obtener todos los carritos
router.get("/", async (_, res) => {
  const carts = await cartModel.find();
  res.json(carts);
});

// ✅ Obtener carrito por _id
router.get("/id/:id", async (req, res) => {
  const cart = await cartModel.findById(req.params.id);
  if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
  res.json(cart);
});

// ✅ Obtener carrito por num
router.get("/num/:num", async (req, res) => {
  const cart = await cartModel.findOne({ num: parseInt(req.params.num) });
  if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
  res.json(cart);
});

// ✅ Agregar producto al carrito (por _id)
router.post("/id/:id/product", async (req, res) => {
  const cart = await cartModel.findById(req.params.id);
  if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

  const { id, title, price, quantity } = req.body;
  const existingProduct = cart.products.find(p => p.id === id);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ id, title, price, quantity });
  }

  cart.total = cart.products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  await cart.save();

  res.json({ message: "Producto agregado", cart });
});

// ✅ Actualizar todo el carrito (por _id)
router.put("/id/:id", async (req, res) => {
  try {
    const updatedCart = await cartModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCart) return res.status(404).json({ message: "Carrito no encontrado" });
    res.json({ message: "Carrito actualizado", cart: updatedCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Vaciar carrito por _id
router.delete("/id/:id", async (req, res) => {
  const cart = await cartModel.findById(req.params.id);
  if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

  cart.products = [];
  cart.total = 0;
  await cart.save();

  res.json({ message: "Carrito vaciado", cart });
});

// ✅ Vaciar carrito por num
router.delete("/num/:num", async (req, res) => {
  const cart = await cartModel.findOne({ num: parseInt(req.params.num) });
  if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

  cart.products = [];
  cart.total = 0;
  await cart.save();

  res.json({ message: "Carrito vaciado", cart });
});

export default router;