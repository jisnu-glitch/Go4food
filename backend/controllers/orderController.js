const Order = require('../models/Order')

// Place Order
exports.placeOrder = async (req, res) => {
  const { orderItems, total_amount } = req.body;

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    total_amount
  });

  res.status(201).json(order);
};

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