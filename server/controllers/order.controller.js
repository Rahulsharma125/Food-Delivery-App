import { Cart } from "../models/cart.model.js";
import { Food } from "../models/food.model.js";
import { Order } from "../models/order.model.js";

async function createOrder(req, res) {
  const userId = req.user.userId;

  // 1. Find user's cart
  const userCart = await Cart.findOne({ user: userId });

  if (!userCart) {
    return res.status(404).send("Cart doesn't exist!");
  }

  // 2. Check whether cart has items
  if (userCart.items.length === 0) {
    return res.status(400).send("Cart is empty!");
  }

  // 3. Calculate total amount
  let totalAmount = 0;
  const orderItems = [];

  for (let item of userCart.items) {
    // Find food using food ID
    const food = await Food.findById(item.food);

    if (!food) {
      return res.status(404).send("Food not found!");
    }

    // Calculate price for this item
    totalAmount += food.price * item.quantity;

    // Add item to order
    orderItems.push({
      food: item.food,
      quantity: item.quantity,
      price: food.price,
    });
  }

  // 4. Create order
  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalAmount: totalAmount,
    status: "Pending",
  });

  // 5. Clear cart
  userCart.items = [];
  await userCart.save();

  // 6. Send response
  return res.status(201).json({
    message: "Order created successfully!",
    order,
  });
}

async function getOrders(req, res){
  const userId = req.user.userId;
  if(!userId){
    return res.status(404).send("User Id is required!")
  }
  const allOrder = await Order.find({ user: userId })
  .populate("items.food");
  if (allOrder.length === 0){
    return res.status(404).send("No order placed yet!")
  }
  return res.status(200).json({
    message: "Orders fetched successfully!",
    allOrder,
  });
}

async function getSingleOrder(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;

  console.log("ORDER ID:", id);
  console.log("USER ID:", userId);

  const orderById = await Order.findById(id);

  console.log("ORDER FOUND BY ID:", orderById);

  if (!orderById) {
    return res.status(404).send("Order ID doesn't exist!");
  }

  const findOrder = await Order.findOne({
    _id: id,
    user: userId,
  }).populate("items.food");

  console.log("ORDER FOUND WITH USER:", findOrder);

  if (!findOrder) {
    return res.status(404).send("Order belongs to another user!");
  }

  return res.status(200).json({
    message: "Order fetched successfully!",
    order: findOrder,
  });
}

async function orderStatus(req, res){
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user.userId;
  if(!id || !userId || !status){
    return res.status(400).send("All fields are required!")
  }
  const order = await Order.findOne({
    _id: id,
    user: userId,
  });
  if(!order){
    return res.status(404).send("order doesn't exists!")
  }
  order.status = status;
  await order.save();
  return res.status(200).json({
    message: "Order status updated successfully!",
    status: order.status
  })
}

async function cancelOrder(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;
  if (!id || !userId) {
    return res.status(400).send("Id's are required!");
  }
  const existorder = await Order.findOne({
    _id: id,
    user: userId,
  });
  if (!existorder) {
    return res.status(404).send("Order doesn't exits!");
  }
  if (existorder.status !== "Pending" && existorder.status !== "Confirmed") {
    return res.status(400).send("Cannot cancel the order!");
  }
  existorder.status = "Cancelled";
  await existorder.save();
  return res.status(200).json({
    message: "Your order is cancelled successfully!",
    status: existorder.status,
  });
}

export {
  createOrder,
  getOrders,
  getSingleOrder,
  orderStatus,
  cancelOrder,
};
