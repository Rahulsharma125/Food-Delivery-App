import { useState } from "react";

function FoodCard(props) {
  const [quantity, setQuantity] = useState(1);

  async function addToCart() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/add/${props.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add item to cart");
        return;
      }

      alert("Food added to cart successfully!");

      console.log("Add to cart response:", data);
    } catch (error) {
      console.error("Error adding food to cart:", error);
      alert("Something went wrong!");
    }
  }

  return (
    <div>
      <h2>{props.name}</h2>

      <p>Price: ₹{props.price}</p>

      <p>Quantity: {quantity}</p>

      <button
        onClick={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
          }
        }}
      >
        -
      </button>

      <button onClick={() => setQuantity(quantity + 1)}>
        +
      </button>

      <br />

      <button onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default FoodCard;