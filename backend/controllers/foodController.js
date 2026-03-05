
// Create Food (Admin)
const FoodItem = require('../models/FoodItem')

exports.createFood = async (req, res) => {
  try {
    const {name, price, category, description, availability } = req.body;

    const image= req.file ? `uploads/${req.file.filename}` :null
    // Check if body is actually received
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const food = await FoodItem.create({
      name,
      price: Number(price), // Convert string "10" to number 10
      category,
      description,
      availability,
      image,
    });

    res.status(201).json(food);
  } catch (error) {
    // THIS LINE IS KEY: It will print the REAL error in your VS Code terminal
    console.error("DETAILED ERROR:", error.message); 
    
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
};


// create bulk of food 
exports.createBulkFood = async (req, res) => {
  try {
    const foods = await FoodItem.insertMany(req.body);
    res.status(201).json({
      message: "Food items created successfully",
      data: foods
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get All Food
exports.getFoods = async (req,res)=>{
    const foods= await FoodItem.find()
    res.json(foods)
}

// Update Food (Admin)
exports.updateFood = async (req, res) => {
  const food = await FoodItem.findById(req.params.id);

  if (!food) return res.status(404).json({ message: "Food not found" });

  Object.assign(food, req.body);
  await food.save();

  res.json(food);
};


// Delete Food (Admin)
exports.deleteFood = async (req, res) => {
  const food = await FoodItem.findById(req.params.id);

  if (!food) return res.status(404).json({ message: "Food not found" });

  await food.deleteOne();
  res.json({ message: "Food deleted" });
};
