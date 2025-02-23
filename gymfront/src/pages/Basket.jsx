import React, { useContext } from "react";
import BasketContext from "../contexts/BasketContext";

const Basket = () => {
  const { basket, removeFromBasket, increaseQuantity, decreaseQuantity } = useContext(BasketContext);


  const totalPrice = basket.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (basket.length === 0) {
    return (
      <div>
        <h1>Sepetim</h1>
        <p>Basket is empty</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Sepetim</h1>
      {basket.map((item, index) => (
        <div key={`${item.product._id}-${index}`}>
          <p>
            {item.product.header} - {item.product.price}₺
          </p>
          <p>Miktar: {item.quantity}</p>
          <button onClick={() => increaseQuantity(item.product._id)}>Arttır</button>
          <button onClick={() => decreaseQuantity(item.product._id)}>Azalt</button>
          <button onClick={() => removeFromBasket(item.product._id)}>Sepetten Çıkar</button>
        </div>
      ))}
      <div>
        <h2>Total Price: {totalPrice}₺</h2>
      </div>
    </div>
  );
};

export default Basket;
