import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState({ products: [] });

  useEffect(() => {
    if (user) {
      fetch("http://localhost:3000/api/wishlist", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => setWishlist(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

 
  const removeFromWishlist = async (productId) => {
    try {
      const res = await fetch("http://localhost:3000/api/wishlist/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ productId })
      });
      if (res.ok) {
        const updatedWishlist = await res.json();
        setWishlist(updatedWishlist); // State'i güncelle
      } else {
        console.error("Wishlist'ten çıkarma hatası oluştu.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContext;
