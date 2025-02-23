import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { BasketProvider } from "./contexts/BasketContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import MainLayout from "./layout/MainLayout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AdminLayout from "./layout/AdminLayout";
import Home from "./pages/Home";
import ShoppingPage from "./pages/ShoppingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";
import WishlistPage from "./pages/WishlistPage";
import Workouts from "./pages/workouts";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";

const stripePromise = loadStripe("pk_test_...");

function App() {
  return (

      <Router>
        <AuthProvider>
          <BasketProvider>
            <WishlistProvider>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/shopping" element={<ShoppingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/product/:id" element={<ProductDetail />} />

                  <Route
                    path="/checkout"
                    element={
                      <Elements stripe={stripePromise}>
                        <CheckoutPage />
                      </Elements>
                    }
                  />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/workouts" element={<Workouts />} />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>
              </Routes>
            </WishlistProvider>
          </BasketProvider>
        </AuthProvider>
      </Router>
 
  );
}

export default App;
