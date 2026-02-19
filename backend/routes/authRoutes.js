const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/profile',protect,(req,res)=>{
    res.json(req.user)
})

router.get("/check-user", protect, (req, res) => {
  if (req.user.role === "user") {
    return res.json({ message: "User access granted" });
  }
  res.status(403).json({ message: "Not a user" });
});

router.get("/check-admin",protect,(req,res)=>{
    if(req.user.role == 'admin'){
        return res.json({message : "Admin acces granted"})
    }
    res.status(403).json({message:"Not a admin"})
})
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});


module.exports = router;
