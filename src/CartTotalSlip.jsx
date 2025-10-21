import React from "react";
import "./CartTotalSlip.css";
import { useSelector } from "react-redux";

const CartTotalSlip = () => {
  const cart = useSelector((state) => state.cart.items);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.cost * item.quantity,
    0
  );

  return (
    <div className="cart-slip-app">
      <div className="cart-slip-box">
        <div className="cart-slip-header">
          <h3>Paradise Nursery</h3>
          <p>Where Green Meets Serenity 🌿</p>
          <hr />
          <h4>Shopping Receipt</h4>
        </div>

        <div className="cart-slip-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-slip-item" key={item.name}>
                <div className="item-name">{item.name}</div>
                <div className="item-qty">x{item.quantity}</div>
                <div className="item-cost">${item.cost}</div>
                <div className="item-total">
                  ${(item.cost * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        <hr />

        <div className="cart-slip-total">
          <strong>Total Amount:</strong>{" "}
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        <div className="thankyou-text">
          <p>🌸 Thank you for shopping with Paradise Nursery!</p>
          <p>We hope your plants bring joy and freshness to your home.</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotalSlip;
