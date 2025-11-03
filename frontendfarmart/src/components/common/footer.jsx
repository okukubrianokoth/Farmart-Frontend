// src/components/common/Footer.jsx
import React from 'react';
import '../common/footer.css';

const Footer = () => {
  return (
    <footer className="farmart-footer">
      <div className="footer-inner container">
        <div className="footer-col">
          <h4>Farmart</h4>
          <p>Connecting farmers and buyers directly — honest prices, healthy animals.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/animals">Browse Animals</a></li>
            <li><a href="/orders">Orders</a></li>
            <li><a href="/farmer-dashboard">Dashboard</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>support@farmart.com</p>
          <p>+254 700 123 456</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <small>© {new Date().getFullYear()} Farmart. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
