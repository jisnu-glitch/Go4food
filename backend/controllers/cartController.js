const Cart = require("../models/Cart");
const FoodItem= require("../models/FoodItem")

// ADD TO CART

exports.addToCart = async (req, res) => {
  try {

    const { food_id, quantity } = req.body

    const food = await FoodItem.findById(food_id)

    if (!food) {
      return res.status(404).json({ message: "Food not found" })
    }

    // Try updating existing item
    const cart = await Cart.findOneAndUpdate(
      {
        user_id: req.user.id,
        "items.food_id": food_id
      },
      {
        $inc: { "items.$.quantity": quantity }
      },
      { new: true }
    )

    if (cart) {
      return res.json(cart)
    }

    // If item not in cart → push new item
    const newCart = await Cart.findOneAndUpdate(
      { user_id: req.user.id },
      {
        $push: {
          items: {
            food_id,
            quantity,
            price: food.price
          }
        }
      },
      { new: true, upsert: true }
    )

    res.json(newCart)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error adding to cart" })
  }
}



// GET USER CART
exports.getCart = async (req, res) => {
  try {

    let cart = await Cart.findOne({ user_id: req.user.id })
      .populate("items.food_id");
    
    // If cart does not exist
    if (!cart) {
      return res.json({
        items: []
      });
    }

    cart.items = cart.items.filter(item=>item.food_id != null)
    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};



// REMOVE ITEM
exports.removeItem = async (req, res) => {
  try {

    const { foodId } = req.params;

    const cart = await Cart.findOne({ user_id: req.user.id });

    cart.items = cart.items.filter(
      item => item.food_id.toString() !== foodId
    );

    await cart.save();

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: "Error removing item" });
  }
};



// CLEAR CART
exports.clearCart = async (req, res) => {

  await Cart.findOneAndDelete({ user_id: req.user.id });

  res.json({ message: "Cart cleared" });

};


// update quantity
exports.updateQuantity = async (req, res) => {
  try {
    const { food_id, quantity } = req.body;

    const cart = await Cart.findOne({ user_id: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      item => item.food_id.toString() === food_id
    );

    if (!item) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    item.quantity = quantity;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        item => item.food_id.toString() !== food_id
      );
    }

    await cart.save();

    return res.status(200).json({
      message: "Cart updated",
      cart
    });

  } catch (error) {
    return res.status(500).json({ message: "Error updating quantity" });
  }
};