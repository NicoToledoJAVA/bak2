import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  age: Number,
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts"
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN", "PREMIUM", "GUEST"],
    default: "USER"
  },
  num:Number
}, { versionKey: false }  )

const userModel = mongoose.model("users", userSchema);
export default userModel;

