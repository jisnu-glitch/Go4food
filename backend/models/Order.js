const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    food :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FoodItem",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
}
)

const orderSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        orderItems: [orderItemSchema],

        total_amount: {
        type: Number,
        required: true
        },

        status: {
        type: String,
        enum: ["Pending", "Preparing", "Delivered"],
        default: "Pending"
        },

        payment_status: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending"
        },
        payment_method: {
            type: String,
            enum: ["COD", "Online"],
            default: "COD"
        },

        order_date: {
        type: Date,
        default: Date.now
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Order',orderSchema)