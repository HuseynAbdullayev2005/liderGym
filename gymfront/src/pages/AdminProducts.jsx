import React, { useEffect, useState } from "react";
import "./AdminProducts.css";


function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [selectedContent, setSelectedContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleEditClick = (product) => {
    setEditingProductId(product._id);
    setEditedProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditedProduct({});
  };

  const handleInputChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(editedProduct)
      });
      if (res.ok) {
        const updatedProduct = await res.json();
        setProducts(products.map((p) => (p._id === id ? updatedProduct : p)));
        setEditingProductId(null);
        setEditedProduct({});
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (content) => {
    setSelectedContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedContent("");
  };

  return (
    <div className="admin_products">
        <h1>Manage Products</h1>
        <div className="table_container">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Header</th>
                <th>Category</th>
                <th>Price</th>
                <th>Content</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img src={p.image} alt={p.header} className="thumbnail" />
                  </td>
                  <td>
                    {editingProductId === p._id ? (
                      <input name="header" value={editedProduct.header} onChange={handleInputChange} />
                    ) : (
                      p.header
                    )}
                  </td>
                  <td>
                    {editingProductId === p._id ? (
                      <input name="category" value={editedProduct.category} onChange={handleInputChange} />
                    ) : (
                      p.category
                    )}
                  </td>
                  <td>
                    {editingProductId === p._id ? (
                      <input name="price" type="number" value={editedProduct.price} onChange={handleInputChange} />
                    ) : (
                      p.price
                    )}
                  </td>
                  <td className="content_column">
                    {editingProductId === p._id ? (
                      <input name="content" value={editedProduct.content} onChange={handleInputChange} />
                    ) : (
                      <span onClick={() => openModal(p.content)}>{p.content}</span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className="action_buttons">
                      {editingProductId === p._id ? (
                        <>
                          <button className="save_btn" onClick={() => handleSave(p._id)}>Save</button>
                          <button className="cancel_btn" onClick={handleCancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="edit_btn" onClick={() => handleEditClick(p)}>Edit</button>
                          <button className="delete_btn" onClick={() => deleteProduct(p._id)}>Delete</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {modalOpen && (
          <div className="modal_overlay" onClick={closeModal}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
              <h2>Product Content</h2>
              <p>{selectedContent}</p>
              <button className="close_btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
  );
}

export default AdminProducts;
