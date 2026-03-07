const Order = require('../models/Order')
const Cart = require("../models/Cart")
// Place Order

exports.placeOrder = async (req, res) => {
  try {
    const {payment_method,address} = req.body
    const cart = await Cart.findOne({ user_id: req.user.id })

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

    // only selected items
    const selectedItems = cart.items.filter(item => item.selected)

    if (selectedItems.length === 0) {
      return res.status(400).json({ message: "No items selected" })
    }

    // convert cart items → order items
    const orderItems = selectedItems.map(item => ({
      food: item.food_id,
      quantity: item.quantity,
      price: item.price
    }))

    // calculate total
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    // create order
    const order = await Order.create({
      user: req.user.id,
      orderItems,
      total_amount: totalAmount,
      payment_method,
      address
    })

    // remove ordered items from cart
    cart.items = cart.items.filter(item => !item.selected)

    await cart.save()

    res.status(201).json({
      message: "Order placed successfully",
      order
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error placing order" })
  }
}



// Get Logged-in User Orders
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("orderItems.food");

  res.json(orders);
};



// Admin: Get All Orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("orderItems.food");

  res.json(orders);
};

// Admin: Update Order Status
exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = req.body.status;
  await order.save();

  res.json(order);
};