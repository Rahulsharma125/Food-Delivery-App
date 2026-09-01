import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { registerUser, loginUser, getProfile } from "../controllers/user.controller.js";
const router = Router();

router.get("/test", (req, res) => {
    res.send("User route is working");   
})

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/profile", authMiddleware, getProfile);

export default router;