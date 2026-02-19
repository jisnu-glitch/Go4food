const FoodItem = require('../models/FoodItem')

// Create Food (Admin)
exports.createFood = async (req,res)=>{
    const { name, price, category, description, availability } = req.body;
    const food = await FoodItem.create({
        name,
        price,
        category,
        description,
        availability
    })
    res.status(201).json(food)
}

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
