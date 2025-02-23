import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BasketContext from "../contexts/BasketContext";
import WishlistContext from "../contexts/WishlistContext";
import "./ShoppingPage.css";
import Herosection from "../components/hero/herosection";
import Footer from "../layout/footer";
import WhyChoose from "../components/WhyChoose/WhyChoose";

function ShoppingPage() {
  const [products, setProducts] = useState([]);
  const { addToBasket } = useContext(BasketContext);
  const { setWishlist } = useContext(WishlistContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory !== "all" && product.category.toLowerCase() !== selectedCategory) {
        return false;
      }
      if (searchTerm && !product.header.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "priceLowToHigh") {
        return a.price - b.price;
      }
      if (sortOrder === "priceHighToLow") {
        return b.price - a.price;
      }
      return 0;
    });

  const addToWishlist = async (productId) => {
    try {
      const res = await fetch("http://localhost:3000/api/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ productId })
      });
      if (res.ok) {
        const updatedWishlist = await res.json();
        setWishlist(updatedWishlist);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
     
      <Herosection />
      <WhyChoose/>
      <div className="shopping_page">
        <h2>Products</h2>
        <div className="filter_controls">
          <div className="category_filters">
            <button onClick={() => setSelectedCategory("all")} className={selectedCategory === "all" ? "active" : ""}>All</button>
            <button onClick={() => setSelectedCategory("protein")} className={selectedCategory === "protein" ? "active" : ""}>Protein</button>
            <button onClick={() => setSelectedCategory("clothes")} className={selectedCategory === "clothes" ? "active" : ""}>Clothes</button>
            <button onClick={() => setSelectedCategory("gear")} className={selectedCategory === "gear" ? "active" : ""}>Gear</button>
          </div>
          <div className="search_sort">
            <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="">Sort By</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="product_list">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product_card">
              <div className="product_image_container">
                <img src={product.image} alt={product.header} />
                <div className="wishlist_overlay">
                  <button onClick={() => addToWishlist(product._id)} title="Add to Wishlist">
                    <i className="fa fa-heart" style={{ color: "red" }}></i>
                  </button>
                </div>
              </div>
              <h4>{product.header}</h4>
              <p>Price: ${product.price}</p>
              <div className="button_group">
                <button onClick={() => addToBasket(product._id)}>Add to Basket</button>
                <Link to={`/product/${product._id}`}>
                  <button>View Detail</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ShoppingPage;
