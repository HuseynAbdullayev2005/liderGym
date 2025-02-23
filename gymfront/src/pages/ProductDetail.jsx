
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import BasketContext from "../contexts/BasketContext";
import "./ProductDetail.css";


function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToBasket } = useContext(BasketContext);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
  <div className="product_detail_container">
        <div className="product_image_section">
          <img src={product.image} alt={product.header} />
        </div>
        <div className="product_info_section">
          <h1>{product.header}</h1>
          <p className="product_price">${product.price}</p>
          <h3>Description</h3>
          <p>{product.content}</p>
          <button onClick={() => addToBasket(product._id)}>Add to Cart</button>
        </div>
      </div>
  );
}

export default ProductDetail;
