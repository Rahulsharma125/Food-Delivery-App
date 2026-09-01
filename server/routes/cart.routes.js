import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

import {
  addToCart,
  getCart,
  decreaseQuantity,
  removeFromCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/checks", (req, res) => {
  res.send("Cart router is working!");
});

router.post("/add/:id", authMiddleware, addToCart);

router.get("/get", authMiddleware, getCart);

router.put("/decrease/:id", authMiddleware, decreaseQuantity);

router.delete("/remove/:id", authMiddleware, removeFromCart);

export default router;
