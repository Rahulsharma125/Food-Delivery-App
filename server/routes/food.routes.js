import { Router } from "express";
import { createFood, deleteFood, getFoods, updateFood } from "../controllers/food.controller.js";

const router = Router();

router.get("/test", (req, res) => {
    res.send("Food route is working");
    
})

router.post("/createFood", createFood);
router.get("/foundFoods", getFoods);
router.patch("/updateFood/:id", updateFood);
router.delete("/deleteFood/:id", deleteFood);

export default router;