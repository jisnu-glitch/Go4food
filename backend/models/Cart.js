const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodItem",
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  selected:{
    type:Boolean,
    default:true
  }
  
},
{ timestamps: true });

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [cartItemSchema]
},
{ timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);