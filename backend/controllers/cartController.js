const Cart = require("../models/Cart");


// ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const { food_id, quantity, price } = req.body;

    let cart = await Cart.findOne({ user_id: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user_id: req.user.id,
        items: [{ food_id, quantity, price }]
      });
    } else {
      const existingItem = cart.items.find(
        item => item.food_id.toString() === food_id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ food_id, quantity, price });
      }

      await cart.save();
    }

    res.json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding to cart" });
  }
};



// GET USER CART
exports.getCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({ user_id: req.user.id })
      .populate("items.food_id");

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

    // If quantity becomes 0 → remove item
    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        item => item.food_id.toString() !== food_id
      );
    }

    await cart.save();

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: "Error updating quantity" });
  }
};