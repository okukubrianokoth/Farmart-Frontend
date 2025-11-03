// src/components/common/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  const handleLogout = () => {
    // Clear token + redux state
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-inner container">
        <Link to="/" className="nav-logo">Farmart</Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/animals" className="nav-link">Browse Animals</Link>

          {isAuthenticated ? (
            <>
              {user?.user_type === 'farmer' && (
                <Link to="/farmer-dashboard" className="nav-link">Dashboard</Link>
              )}
              <Link to="/cart" className="nav-link">Cart</Link>
              <Link to="/orders" className="nav-link">Orders</Link>

              <span className="nav-welcome">Hello, {user?.first_name || user?.email}</span>

              <button className="nav-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link nav-cta">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
