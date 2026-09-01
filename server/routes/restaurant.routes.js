import { Router } from "express";
import {
  createRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.controller.js";

const router = Router();

router.get("/check", (req, res) => {
    res.send("Restaurant router is working!");
    
})
router.post("/restaurant", createRestaurant)
router.get("/restaurant", getRestaurants)
router.patch("/restaurant/:id", updateRestaurant)
router.delete("/restaurant/:id", deleteRestaurant);

export default router;