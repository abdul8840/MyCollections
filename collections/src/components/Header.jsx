import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">MyCollections</div>
      <div className="menu-icon" onClick={toggleMenu}>
      {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <Link to='/'><span className="nav-links">Home</span></Link>
        </li>
        <li className="nav-item">
          <Link to='/create-post'><span className="nav-links">Create Post</span></Link>
        </li>
        <li className="nav-item">
          <Link to='/review'><span className="nav-links">Add Review</span></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header