import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin_layout">
      <aside className="admin_sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
        </ul>
        <Link to="/" className="home_button">🏠 Home</Link>
      </aside>
      <main className="admin_content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
