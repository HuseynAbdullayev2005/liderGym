import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/users/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setUserCount(data.length))
      .catch((err) => console.error(err));

    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProductCount(data.length))
      .catch((err) => console.error(err));

    fetch("http://localhost:3000/api/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setOrderCount(data.length))
      .catch((err) => console.error(err));
  }, []);

  return (
   <div className="admin_dashboard">
        <h1>Dashboard</h1>
        <div className="dashboard_cards">
          <div className="card">
            <h2>Total Sales</h2>
            <p>$12,345</p>
          </div>
          <div className="card">
            <h2>Total Orders</h2>
            <p>{orderCount}</p>
          </div>
          <div className="card">
            <h2>Total Users</h2>
            <p>{userCount}</p>
          </div>
          <div className="card">
            <h2>Total Products</h2>
            <p>{productCount}</p>
          </div>
        </div>
      </div>
  );
}

export default AdminDashboard;
