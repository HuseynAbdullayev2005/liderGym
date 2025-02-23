import React, { useContext } from "react";
import WishlistContext from "../../contexts/WishlistContext";
import "./WishlistDrawer.css";

function WishlistDrawer({ isOpen, onClose }) {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className={`wishlist_drawer ${isOpen ? "open" : ""}`}>
      <div className="wishlist_drawer_header">
        <h2>Your Wishlist</h2>
        <button className="close_button" onClick={onClose}>&times;</button>
      </div>
      <div className="wishlist_drawer_body">
        {wishlist.products && wishlist.products.length === 0 ? (
          <p className="empty_text">Wishlist is empty</p>
        ) : (
          wishlist.products.map((product, index) => (
            <div key={`${product._id}-${index}`} className="wishlist_item">
              <img
                src={product.image}
                alt={product.header}
                className="wishlist_item_image"
              />
              <div className="wishlist_item_details">
                <p className="wishlist_item_title">{product.header}</p>
                <p className="wishlist_item_price">${product.price}</p>
                <button
                  className="wishlist_remove"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WishlistDrawer;
