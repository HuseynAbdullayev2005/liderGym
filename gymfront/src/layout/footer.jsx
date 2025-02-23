import React from 'react';
import './footer.css';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaHeart } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      <div className="footer_top">

        <div className="about_section">
          <h3>About The GYM</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
            vestibulum vestibulum.
          </p>
          <div className="btn_box">
            <button>
              <FaTwitter />
            </button>
            <button>
              <FaFacebookF />
            </button>
            <button>
              <FaLinkedinIn />
            </button>
            <button>
              <FaInstagram />
            </button>
          </div>
        </div>


        <div className="contact_info">
          <h3>Contact Info</h3>
          <p>Address:</p>
          <p>9W8R+WCX, Zığ şosesi, Bakı</p>
          <p>Telephone:</p>
          <p>+994 051 945 48 42</p>
          <p>Email:</p>
          <p>info@LiderGym.com</p>
        </div>


        <div className="quick_links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Terms of Use</a>
            </li>
            <li>
              <a href="/">Disclaimers</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer_bottom">
        <p>
          Copyright © 2024 All rights reserved | Made with <FaHeart style={{ color: '#ffc107' }} /> 
          
        </p>
      </div>
    </footer>
  );
}

export default Footer;