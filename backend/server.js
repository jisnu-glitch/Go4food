const express= require('express')
const dotenv= require('dotenv')
const cors= require('cors')
const connectDB= require('./config/db')

dotenv.config();

connectDB()

const app= express()
app.use(express.json())
app.use(cors())
app.use('/api/auth',require('./routes/authRoutes'))
app.use("/api/foods", require("./routes/foodRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/uploads", express.static('uploads'))
app.use('/api/cart',require('./routes/cartRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV != "production"){
  app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
  })
}
module.exports = app
