const mongoose = require('mongoose')

const foodItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description: {
      type: String
    },
    availability: {
      type: String,
      enum: ["In stock", "Out of stock"],
      default: "In stock"
    }

    
},
{
      timestamps: true   // This creates createdAt and updatedAt automatically
}
)

module.exports = mongoose.model('FoodItem',foodItemSchema)

