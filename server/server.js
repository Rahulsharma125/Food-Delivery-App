import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import restaurantRouter from "./routes/restaurant.routes.js"
import foodRouter from "./routes/food.routes.js"
import cartRouter from "./routes/cart.routes.js"
import orderRouter from "./routes/order.routes.js";
dotenv.config();

connectDB();

const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/restaurant", restaurantRouter)
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Food Delivery API is running...");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
