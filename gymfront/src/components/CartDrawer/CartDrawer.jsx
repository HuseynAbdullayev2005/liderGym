import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BasketContext from "../../contexts/BasketContext";
import "./CartDrawer.css";

function CartDrawer({ isOpen, onClose }) {
  const { basket, removeFromBasket, increaseQuantity, decreaseQuantity } = useContext(BasketContext);
  const navigate = useNavigate();

  const totalPrice = basket.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };

  return (
    <div className={`cart_drawer ${isOpen ? "open" : ""}`}>
      <div className="cart_drawer_header">
        <h2>Your Cart</h2>
        <button className="close_button" onClick={onClose}>&times;</button>
      </div>
      <div className="cart_drawer_body">
        {basket.length === 0 ? (
          <p className="empty_text">Your cart is empty</p>
        ) : (
          basket.map((item, index) => (
            <div key={`${item.product._id}-${index}`} className="cart_item">
              <img
                src={item.product.image}
                alt={item.product.header}
                className="cart_item_image"
              />
              <div className="cart_item_details">
                <p className="cart_item_title">{item.product.header}</p>
                <p className="cart_item_price">
                  ${item.product.price} x {item.quantity}
                </p>
                <div className="cart_item_actions">
                  <button
                    className="action_button"
                    onClick={() => decreaseQuantity(item.product._id)}
                  >
                    –
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="action_button"
                    onClick={() => increaseQuantity(item.product._id)}
                  >
                    +
                  </button>
                  <button
                    className="remove_button"
                    onClick={() => removeFromBasket(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {basket.length > 0 && (
        <div className="cart_drawer_footer">
          <p className="total_text">
            Total: <span>${totalPrice.toFixed(2)}</span>
          </p>
          <button className="checkout_button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartDrawer;
