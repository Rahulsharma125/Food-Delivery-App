import { useState } from "react";

function FoodCard(props) {
  console.log("Food image:", props.image);
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

        if (!response.ok) {
          const data = await response.json();
          alert(data.message || "Failed to add item to cart");
          return;
        }
      }

      alert(`${quantity} item(s) added to cart successfully!`);

      setQuantity(1);

      window.location.reload();

    } catch (error) {
      console.error("Error adding food to cart:", error);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="food-card">

      <div className="food-image">
  <img src={props.image} alt={props.name} />
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