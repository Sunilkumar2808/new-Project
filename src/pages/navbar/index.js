import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa'; 

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleNavbar = () => {
        setIsActive(!isActive);
    };
    const closeNavbar = () => {
        setIsActive(false);
    };

    return (
        <nav className={`navbar ${isActive ? 'active' : ''}`}>
            <div className='nav-head'>
                <div className="toggle-button" onClick={toggleNavbar}>
                    <FaBars size={24} />
                </div>
                <div>
                    <h1 style={{color:"white"}}>Logo</h1> 
                </div>
            </div>
            <ul>
                <div className="close-button" onClick={closeNavbar}>
                    <FaTimes size={24} /> 
                </div>
                <li><Link to="/" onClick={closeNavbar}>Products</Link></li>
                <li><Link to="/stepper" onClick={closeNavbar}>Stepper</Link></li>
                <li><Link to="/scroll" onClick={closeNavbar}>Scroll</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
