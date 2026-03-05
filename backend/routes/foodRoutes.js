const express = require("express");
const router = express.Router();
const {
  createFood,
  getFoods,
  updateFood,
  deleteFood,
  createBulkFood
} = require("../controllers/foodController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload")

// Admin only middleware
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

router.post("/", protect, isAdmin, upload.single("image"), createFood);
router.get("/", getFoods);
router.put("/:id", protect, isAdmin, updateFood);
router.delete("/:id", protect, isAdmin, deleteFood);
router.post("/bulk",protect,isAdmin,createBulkFood);
module.exports = router;
