import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: style the navbar

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Home</Link>
    <Link to="/add">Add Item</Link>
    <Link to="/search">Search Item</Link>
    <Link to="/list">Item List</Link>
  </nav>
);

export default Navbar;
