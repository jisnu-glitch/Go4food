const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// Admin check
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

router.post("/", protect, placeOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id", protect, isAdmin, updateOrderStatus);

module.exports = router;
