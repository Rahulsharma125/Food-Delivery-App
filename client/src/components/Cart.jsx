import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState(null);

  // Get cart
  async function getCart() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/cart/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to fetch cart");
        return;
      }

      setCart(data.cart);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  }

  // Increase quantity
  async function addToCart(foodId) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/add/${foodId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to increase quantity");
        return;
      }

      setCart(data.cart);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  }

  // Decrease quantity
  async function decreaseQuantity(foodId) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/decrease/${foodId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to decrease quantity");
        return;
      }

      setCart(data.cart);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  }

  // Remove item
  async function removeFromCart(foodId) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/remove/${foodId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to remove item");
        return;
      }

      setCart(data.cart);

      alert("Item removed from cart!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  if (!cart) {
    return <h2>Your cart is empty</h2>;
  }

  // Calculate total price
  const totalPrice = cart.items.reduce(
    (total, item) => {
      return total + item.food.price * item.quantity;
    },
    0
  );

  return (
    <div>
      <h1>🛒 Your Cart</h1>

      {cart.items.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item.food._id}>
              <h2>{item.food.name}</h2>

              <p>Price: ₹{item.food.price}</p>

              <p>Quantity: {item.quantity}</p>

              <button
                onClick={() => decreaseQuantity(item.food._id)}
              >
                -
              </button>

              <button
                onClick={() => addToCart(item.food._id)}
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item.food._id)}
              >
                🗑️ Remove
              </button>

              <hr />
            </div>
          ))}

          <h2>Total: ₹{totalPrice}</h2>
        </>
      )}
    </div>
  );
}

export default Cart;