//  /routes/user.router.js

import mongoose from "mongoose";
import { Router } from "express";
import userModel from "../models/user.model.js";
import { hashPassword } from "../utils/hash.js";
import { getNextId } from "../utils/getNextId.js";

const router = Router();

//  ✅ Crear nuevo usuario
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, password, age, role, cart } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "El usuario ya existe con ese email" });
    }

    const hashedPassword = hashPassword(password);
    const nextNum = await getNextId(userModel);

    const user = await userModel.create({
      _id: new mongoose.Types.ObjectId(),
      first_name,
      last_name,
      email,
      password: hashedPassword,
      age,
      role,
      cart,
      num: nextNum
    });

    res.status(201).json({ message: "Usuario creado", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Obtener todos los usuarios
router.get("/", async (_, res) => {
  res.json(await userModel.find());
});

// ✅ Obtener un usuario por _id
router.get("/id/:id", async (req, res) => {
  res.json(await userModel.findById(req.params.id));
});

// ✅ Obtener un usuario por num
router.get("/num/:num", async (req, res) => {
  const user = await userModel.findOne({ num: parseInt(req.params.num) });
  res.json(user);
});

// ✅ Actualizar usuario por _id
router.put("/id/:id", async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario actualizado", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Actualizar usuario por num
router.put("/num/:num", async (req, res) => {
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { num: parseInt(req.params.num) },
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado con num " + req.params.num });
    }

    res.json({ message: "Usuario actualizado por num", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// ✅ Eliminar un usuario por _id
router.delete("/id/:id", async (req, res) => {
  res.json(await userModel.deleteOne({ _id: req.params.id }));
});

// ✅ Eliminar un usuario por num
router.delete("/num/:num", async (req, res) => {
  const result = await userModel.deleteOne({ num: parseInt(req.params.num) });
  res.json(result);
});
export default router;