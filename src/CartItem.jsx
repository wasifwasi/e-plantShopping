import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";
import CartTotalSlip from "./CartTotalSlip";

const CartItem = ({ onContinueShopping }) => {
  const [showSlip, setShowSlip] = useState(false);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // 🧾 Calculate total amount for all products
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost?.replace("$", "")) || 0;
      return total + cost * (item.quantity || 1);
    }, 0);
  };

  // 🛒 Handlers
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckout = () => {
    setShowSlip(true);
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({ name: item.name, quantity: (item.quantity || 1) + 1 })
    );
  };

  const handleDecrement = (item) => {
    if ((item.quantity || 1) > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 🧮 Calculate total cost for one item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost?.replace("$", "")) || 0;
    return cost * (item.quantity || 1);
  };

  // 🛍️ Empty cart view
  if (!cart || cart.length === 0) {
    return (
      <div className="cart-container">
        <h2 style={{ color: "black", textAlign: "center" }}>
          Your cart is empty!
        </h2>
        <div className="continue_shopping_btn">
          <button
            className="get-started-button"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // 🧾 Main cart view
  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount().toFixed(2)}
      </h2>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity || 1}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item).toFixed(2)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckout}>
          Checkout
        </button>
      </div>

      {showSlip && <CartTotalSlip />}
    </div>
  );
};

export default CartItem;
