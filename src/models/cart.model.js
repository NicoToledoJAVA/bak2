import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
  products: [
    {
        id:Number,
        title:String,
        price:Number,
        quantity:Number     
    }
  ],
  total: Number,
  num:Number
}, { versionKey: false }); 

const cartModel = mongoose.model("carts", cartSchema);
export default cartModel;

