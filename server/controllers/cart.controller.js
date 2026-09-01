import { Cart } from "../models/cart.model.js";

async function addToCart(req, res) {
    const { id } = req.params;
    const userId = req.user.userId;

    if (!id) {
        return res.status(400).send("Food ID is required!");
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [
                {
                    food: id,
                    quantity: 1,
                },
            ],
        });

        return res.status(201).json({
            message: "Food added to cart successfully!",
            cart,
        });
    }

    const existingItem = cart.items.find(
        item => item.food.toString() === id
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({
            food: id,
            quantity: 1,
        });
    }

    await cart.save();

    return res.status(200).json({
        message: "Food added to cart successfully!",
        cart,
    });
}

async function getCart(req, res){
    const userId = req.user.userId;
    const cart = await Cart.findOne({ user: userId })
    .populate("items.food");
    if(!cart){
         return res.status(404).send("Cart not found!");
    }

    return res.status(200).json({
      message: "Cart fetched successfully!",
      cart,
    });

}

async function decreaseQuantity(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;

  if (!id) {
    return res.status(400).send("Food ID is required!");
  }

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).send("Cart doesn't exist!");
  }

  const item = cart.items.find((item) => item.food.toString() === id);

  if (!item) {
    return res.status(404).send("Food is not in the cart!");
  }

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart.items = cart.items.filter((item) => item.food.toString() !== id);
  }

  await cart.save();

  return res.status(200).json({
    message: "Quantity decreased successfully!",
    cart,
  });
}

async function removeFromCart(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;

  if (!id) {
    return res.status(400).send("Food ID is required!");
  }

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).send("Cart doesn't exist!");
  }

  console.log("ID FROM URL:", id);
  console.log("CART ITEMS:", cart.items);

  const item = cart.items.find((item) => String(item.food) === String(id));

  console.log("FOUND ITEM:", item);

  if (!item) {
    return res.status(404).send("Item is not in the cart!");
  }

  cart.items = cart.items.filter((item) => String(item.food) !== String(id));

  await cart.save();

  return res.status(200).json({
    message: "Item removed successfully!",
    cart,
  });
}

export { addToCart, getCart, decreaseQuantity, removeFromCart };