import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import FoodCard from "./components/FoodCard";
import Cart from "./components/Cart";

function App() {
  const [foods, setFoods] = useState([]);

  async function getFoods() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/food/foundFoods"
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Failed to fetch foods");
        return;
      }

      console.log("Foods:", data.food);

      setFoods(data.food);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  }

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div>
      <Navbar />

      <main>
        <h1>Welcome to Foodie</h1>

        <p>Order your favourite food online.</p>

        <div className="food-container">
          {foods.map((food) => (
            <FoodCard
              key={food._id}
              id={food._id}
              name={food.name}
              price={food.price}
            />
          ))}
        </div>

        <Cart />
      </main>
    </div>
  );
}

export default App;