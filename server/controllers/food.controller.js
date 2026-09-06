import { Food } from "../models/food.model.js";

async function createFood(req, res) {
  const { name, price, description, image, rating, restaurant } = req.body;

  if (!name || !price || !description || !image || !rating || !restaurant) {
    return res.status(400).send("All fields are required!");
  }

  const createdFood = await Food.create({
    name,
    price,
    description,
    image,
    rating,
    restaurant,
  });

  return res.status(201).json({
    message: "Food created successfully!",
    createdFood,
  });
}

async function getFoods(req, res) {
  const foundFood = await Food.find().populate("restaurant");

  if (foundFood.length === 0) {
    return res.status(404).send("Food is not available!");
  }

  return res.status(200).json({
    message: "Foods fetched successfully!",
    food: foundFood,
  });
}

async function updateFood(req, res) {
  const { name, price, description, image, rating, restaurant } = req.body;

  const { id } = req.params;

  if (
    !name ||
    !price ||
    !description ||
    !image ||
    !rating ||
    !restaurant ||
    !id
  ) {
    return res.status(400).send("All fields are required!");
  }

  const updatedFood = await Food.findByIdAndUpdate(
    id,
    {
      name,
      price,
      description,
      image,
      rating,
      restaurant,
    },
    {
      new: true,
    },
  );

  if (!updatedFood) {
    return res.status(404).send("Food is not updated yet!");
  }

  return res.status(200).json({
    message: "Food updated successfully!",
    food: updatedFood,
  });
}

async function deleteFood(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("food ID is required!");
  }

  const deletedFood = await Food.findByIdAndDelete(id);

  if (!deletedFood) {
    return res.status(404).send("Food is not deleted yet!");
  }

  return res.status(200).json({
    message: "Food is deleted successfully!",
    food: deletedFood,
  });
}

export { createFood, getFoods, updateFood, deleteFood };
