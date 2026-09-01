import { Router } from "express";
import { cancelOrder, createOrder, getOrders, getSingleOrder, orderStatus } from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/order/api/check", (req, res) => {
    res.send("Order router is working!");
})

router.post("/createOrder", authMiddleware, createOrder)
router.get("/getOrders", authMiddleware, getOrders)
router.get("/getorder/:id", authMiddleware, getSingleOrder)
router.put("/status/:id", authMiddleware, orderStatus)
router.put("/cancel/:id", authMiddleware, cancelOrder)

export default router;