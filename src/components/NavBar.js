import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {

  const logout = () => {
    localStorage.removeItem('accessToken');
  }

  return (
    <div className='navBar'>
      <h3 className="logoText">Bike Finder</h3>
      <ul>
        <li><Link className="nav-link" to="/login">Sign in</Link></li>
        <li><Link className="nav-link" to="/register">Register</Link></li>
        <li><Link className="nav-link" to="/">Ads</Link></li>
        <li><Link className="nav-link" to="/add">Register ad</Link></li>
        <li><Link className="nav-link" to="/yourads">Your ads</Link></li>
        <li><Link className="nav-link" to="/messages">Messages</Link></li>
        <li onClick={logout}><Link className="nav-link" to="/">Logout</Link></li>
      </ul>
    </div>
  )


}




export default NavBar;