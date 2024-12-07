import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-sm font-bold">
          <img src={logo} alt="nexus logo" width={100} />
        </div>
        {/* Hamburger Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        {/* Menu Items */}
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-95 z-40 flex flex-col items-center justify-center md:static md:bg-transparent md:flex md:flex-row md:items-center md:justify-between ${isOpen ? "block" : "hidden"}`}>
          <div className="absolute top-4 right-4 md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <ul className="space-y-4 text-1xl md:space-y-0 md:flex md:items-center md:space-x-4 text-center">
            <li>
              <NavLink to="/" exact className={`custom-underline ${currentPath === "/" ? "text-3xl active-underline" : ""}`}>
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
