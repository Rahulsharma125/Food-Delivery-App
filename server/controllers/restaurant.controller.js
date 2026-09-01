import { Restaurant } from "../models/restaurant.model.js";

async function createRestaurant(req, res) {
  const { name, location } = req.body;
  if (!name || !location) {
    return res.status(400).send("All fields are required!");
  }
  const restaurant = await Restaurant.create({
    name,
    location
  });
  return res.status(201).json({
    message: "Restaurant created successfully!",
    restaurant,
  });
}

async function getRestaurants(req, res){
  const restaurants = await Restaurant.find();
  return res.status(200).json({
    message: "Restaurants fetched successfully!",
    restaurants,
  });
}

async function updateRestaurant(req, res){
  const { name, location } = req.body;
  const { id } = req.params;
  if(!name || !location || !id){
    return res.status(400).send("All fields are required!");
  }

// -----------findByIdAndUpdate(ID, UPDATE_DATA, OPTIONS)---------

  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    id,
    {
      name,
      location,
    },
    {
      new: true,
    },
  );
  if(!updatedRestaurant){
    return res.status(400).send("Restaurant not found!");
  }
  return res.status(200).json({
    message: "Restaurant updated successfully!",
    restaurant: updatedRestaurant
  })
}

async function deleteRestaurant(req, res){
  const { id } = req.params;
  if( !id ){
    res.status(400).send("Restaurant ID is required!")
  }
  const deletedRestaurant = await Restaurant.findByIdAndDelete( id );
  if(!deletedRestaurant){
    return res.status(404).send("Restaurant not found!");
  }
  return res.status(200).json({
    message: "Restaurant deleted successfully!",
    restaurant: deletedRestaurant,
  });
}

export { createRestaurant, getRestaurants, updateRestaurant, deleteRestaurant };