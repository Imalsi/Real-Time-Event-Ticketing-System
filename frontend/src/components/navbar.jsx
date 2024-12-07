import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [dashboard, setDashboard] = useState("/dashboard");
  const currentPath = location.pathname;
  const name = localStorage.getItem("name");
  const tokenTime = localStorage.getItem("tokenTime");
  const role = localStorage.getItem("role");

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const fetchToken = () => {
    const userId = localStorage.getItem("userId");
    const tokenTime = localStorage.getItem("tokenTime");

    if (!userId) {
      window.location.href = "/login";
      return;
    }

    if (tokenTime && new Date().getTime() - tokenTime > 3600000) {
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("tokenTime");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      window.location.href = "/login";
      return;
    }
  };

  const getInitials = (username) => {
    if (!username) return "";
    const names = username.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.slice(0, 2).toUpperCase();
  };

  useEffect(() => {
    if (currentPath !== "/login" && currentPath !== "/register") {
      fetchToken();
    }
  }, [currentPath]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-purple-800 p-1 sticky top-0 z-50 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-black text-sm font-bold">
          <img src={logo} alt="nexus logo" width={50} />
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
            {/* <li>
              <NavLink to="/" exact className={`custom-underline ${currentPath === "/" ? "active-underline" : ""}`}>
              Configuration
              </NavLink>
            </li>
            <li>
              <NavLink to="/buy" exact className={`custom-underline ${currentPath === "/buy" ? "active-underline" : ""}`}>
              Buy Ticket
              </NavLink>
            </li> */}
            <li>
              <NavLink to={dashboard} className={`custom-underline ${currentPath.includes("dashboard") ? "active-underline" : ""}`}>
                DASHBOARD
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={``}>
                {/* Desktop view - SVG only */}
                <div className="hidden lg:flex justify-center items-center">
                  <svg className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="50" fill="#4F46E5" />
                    <text x="50%" y="55%" textAnchor="middle" fill="#FFFFFF" fontSize="40px" fontFamily="Arial, Helvetica, sans-serif" dy=".3em">
                      {getInitials(name)}
                    </text>
                  </svg>
                </div>
                {/* Mobile view - Text only */}
                <span className={`custom-underline ${currentPath === "/profile" ? "text-3xl active-underline" : ""} lg:hidden`}>PROFILE</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
