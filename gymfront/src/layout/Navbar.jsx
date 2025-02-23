import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaUserCircle, FaShoppingBag, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import AuthContext from "../contexts/AuthContext";
import "./Navbar.css";
import CartDrawer from "../components/CartDrawer/CartDrawer";
import WishlistDrawer from "../components/WishlistDrawer/WishlistDrawer";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const forceScrolled =
  location.pathname === "/login" ||
  location.pathname === "/register" ||
  location.pathname.startsWith("/product/") ||
  location.pathname === "/checkout" ||
  location.pathname.startsWith("/admin");


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className={`navbar ${(isScrolled || forceScrolled) ? "scrolled" : ""} ${mobileMenuOpen ? "mobile_menu_open" : ""}`}>
        <div className="nav_left">
         <h1>LIDER GYM</h1>
        </div>
        <div className="nav_center">
          <Link to="/">Home</Link>
          <Link to="/shopping">Shopping</Link>
          <Link to="/workouts">Workouts</Link>
        </div>
        <div className="nav_right">
          {user ? (
            <>
              <span className="avatar">{user.username?.charAt(0).toUpperCase()}</span>
              <button onClick={logout} title="Logout">
                <FaUserCircle />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" title="Login">
                <FaSignInAlt />
              </Link>
              <Link to="/register" title="Register">
                <FaUserPlus />
              </Link>
            </>
          )}
          <button onClick={() => setIsWishlistOpen(true)} title="Wishlist">
            <FaHeart />
          </button>
          <button onClick={() => setIsCartOpen(true)} title="My Cart">
            <FaShoppingBag />
          </button>
          <button className="hamburger_btn" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
      {isCartOpen && (
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      )}
      {isWishlistOpen && (
        <WishlistDrawer 
          isOpen={isWishlistOpen} 
          onClose={() => setIsWishlistOpen(false)} 
        />
      )}
      {mobileMenuOpen && (
        <div className="mobile_menu">
          <Link to="/" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/shopping" onClick={toggleMobileMenu}>Shopping</Link>
          <Link to="/workouts" onClick={toggleMobileMenu}>Workouts</Link>
          {user ? (
            <>
              <Link to="/" onClick={logout}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMobileMenu}>Login</Link>
              <Link to="/register" onClick={toggleMobileMenu}>Register</Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
