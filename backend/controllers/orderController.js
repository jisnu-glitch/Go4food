const Order = require('../models/Order')
const Cart = require("../models/Cart")
// Place Order

exports.placeOrder = async (req, res) => {
  try {

    const { payment_method, address } = req.body

    const cart = await Cart.findOne({ user_id: req.user.id })
      .populate("items.food_id")

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

    // selected items
    let selectedItems = cart.items.filter(item => item.selected)

    if (selectedItems.length === 0) {
      return res.status(400).json({ message: "No items selected" })
    }

    // detect unavailable foods
    const unavailableItems = selectedItems.filter(item => item.food_id === null)

    if (unavailableItems.length > 0) {

      // remove them from cart
      cart.items = cart.items.filter(item => item.food_id !== null)

      await cart.save()

      // continue with valid items only
      selectedItems = cart.items.filter(item => item.selected)
    }

    if (selectedItems.length === 0) {
      return res.status(400).json({
        message: "All selected items are unavailable"
      })
    }

    const orderItems = selectedItems.map(item => ({
      food: item.food_id._id,
      quantity: item.quantity,
      price: item.price
    }))

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    const order = await Order.create({
      user: req.user.id,
      orderItems,
      total_amount: totalAmount,
      payment_method,
      address
    })

    cart.items = cart.items.filter(item => !item.selected)

    await cart.save()

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