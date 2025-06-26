//product.model.js

import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    description:String,
    code_bar:String,
    product_number:Number,
    price:Number,
    status:Boolean,
    stock:Number,
    category:String,
    thumbnails:[String],
    num:Number
  }, { versionKey: false }); 

export const productModel = mongoose.model("products", productSchema);