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
      for (let i = 0; i < quantity; i++) {
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

        const text = await response.text();

        console.log("Cart response:", response.status, text);

        if (!response.ok) {
          alert(`Cart error: ${response.status} - ${text}`);
          return;
        }
      }

      alert(`${quantity} item(s) added to cart successfully!`);

      setQuantity(1);

      window.location.reload();

    } catch (error) {
      console.error("REAL ERROR:", error);
      alert(`Something went wrong: ${error.message}`);
    }
  }

  return (
    <div className="food-card">

      <div className="food-image">
        <img
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"
          alt={props.name}
        />
      </div>

      <h2>{props.name}</h2>

      <p className="food-rating">
        ⭐ {props.rating}
      </p>

      <p className="food-description">
        {props.description}
      </p>

      <p className="food-price">
        ₹{props.price}
      </p>

      <div className="quantity-controls">

        <button
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
        >
          -
        </button>

        <span>Quantity: {quantity}</span>

        <button
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>

      </div>

      <button
        className="add-cart-btn"
        onClick={addToCart}
      >
        🛒 Add to Cart
      </button>

    </div>
  );
}

export default FoodCard;