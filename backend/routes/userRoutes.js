const express = require('express')
const router= express.Router()

const {getUsers} = require('../controllers/userController')
const {protect} = require("../middleware/authMiddleware")


// Admin check
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

router.get('/',protect,isAdmin,getUsers)
module.exports = router

