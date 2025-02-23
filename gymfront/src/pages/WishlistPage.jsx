import React, { useContext, useEffect, useState } from "react";
import BasketContext from "../contexts/BasketContext";
import "./WishlistPage.css";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/wishlist", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setWishlist(data.products));
  }, []);

  return (
    <div className="wishlist-page">
      <h2>My Wishlist</h2>
      <div className="wishlist-items">
        {wishlist.map((product) => (
          <div key={product._id} className="wishlist-item">
            <img src={product.image} alt={product.header} />
            <h3>{product.header}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;