// /routes/session.router.js


import { Router } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import config from "../config/index.js";



const router = Router();

// Register
router.post("/register", async (req, res) => {
  const { first_name, last_name, age, email, password, role } = req.body;
  const exists = await userModel.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await userModel.create({
    first_name,
    last_name,
    age,
    email,
    password: hashedPassword,
    role
  });

  res.status(201).json({ message: "User registered", user });
});




// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, config.SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Ruta protegida
import passport from "passport";
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { first_name, last_name, email, role, age } = req.user;
  res.json({ first_name, last_name, email, role, age });
});

export default router;