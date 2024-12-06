import React from 'react';
import logo from '../assets/images/logo.png';

const Footer = () => {

    const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-purple-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <img src={logo} alt="logo" width={50} />
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm">&copy; {currentYear} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;