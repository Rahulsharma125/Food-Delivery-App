import "./App.css";
import Navbar from "./components/Navbar";
import FoodCard from "./components/FoodCard";

function App() {
  return (
    <div>
      <Navbar />

      <main>
        <h1>Welcome to Foodie</h1>

        <p>Order your favourite food online.</p>

        <FoodCard
          id="6a85a0844d7384d65e4ec218"
          name="Farmhouse Pizza"
          price={299}
        />

        <FoodCard
          id="6a85a0844d7384d65e4ec219"
          name="Cheese Burger"
          price={199}
        />

        <FoodCard
          id="6a85a0844d7384d65e4ec220"
          name="Veg Biryani"
          price={249}
        />
      </main>
    </div>
  );
}

export default App;