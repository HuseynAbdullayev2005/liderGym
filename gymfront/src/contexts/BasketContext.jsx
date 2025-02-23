import { createContext, useState, useEffect, useContext } from "react"; 
import AuthContext from "./AuthContext";

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    if (user) {
      fetch("http://localhost:3000/api/users/basket", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => setBasket(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const addToBasket = async (productId) => {
    if (!user) return;
    const existingItem = basket.find(item => item.product._id === productId);
    if (existingItem) {
      return increaseQuantity(productId);
    }
    const res = await fetch("http://localhost:3000/api/users/basket/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    
    if (res.ok) {
      const data = await res.json();
      setBasket(data);
    }
  };

  const removeFromBasket = async (productId) => {
    if (!user) return;
    const res = await fetch("http://localhost:3000/api/users/basket/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ productId }),
    });
    if (res.ok) {
      const data = await res.json();
      setBasket(data);
    }
  };

  const increaseQuantity = async (productId) => {
    if (!user) return;
    const res = await fetch("http://localhost:3000/api/users/basket/increase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ productId }),
    });
    if (res.ok) {
      const data = await res.json();
      setBasket(data);
    }
  };

  const decreaseQuantity = async (productId) => {
    if (!user) return;
    const res = await fetch("http://localhost:3000/api/users/basket/decrease", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ productId }),
    });
    if (res.ok) {
      const data = await res.json();
      setBasket(data);
    }
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, increaseQuantity, decreaseQuantity }}>
      {children}
    </BasketContext.Provider>
  );
}

export default BasketContext;
