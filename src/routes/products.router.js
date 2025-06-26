//  /routes/products.router.js

import { Router } from "express";
import mongoose from "mongoose";
import { productModel } from "../models/product.model.js";
import { getNextId } from "../utils/getNextId.js";

const router = Router();

// ✅ Crear nuevo producto
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      code_bar,
      product_number,
      price,
      status,
      stock,
      category,
      thumbnails
    } = req.body;

    const nextNum = await getNextId(productModel);

    const newProduct = await productModel.create({
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      code_bar,
      product_number,
      price,
      status,
      stock,
      category,
      thumbnails,
      num: nextNum
    });

    res.status(201).json({ message: "Producto creado", product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Obtener todos los productos
router.get("/", async (_, res) => {
  const products = await productModel.find();
  res.json(products);
});

// ✅ Obtener producto por _id
router.get("/id/:id", async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(product);
});

// ✅ Obtener producto por num
router.get("/num/:num", async (req, res) => {
  const product = await productModel.findOne({ num: parseInt(req.params.num) });
  if (!product) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(product);
});

// ✅ Actualizar producto por _id
router.put("/id/:id", async (req, res) => {
  try {
    const updated = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto actualizado", product: updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Eliminar producto por _id
router.delete("/id/:id", async (req, res) => {
  const result = await productModel.deleteOne({ _id: req.params.id });
  res.json(result);
});

// ✅ Eliminar producto por num
router.delete("/num/:num", async (req, res) => {
  const result = await productModel.deleteOne({ num: parseInt(req.params.num) });
  res.json(result);
});

export default router;
