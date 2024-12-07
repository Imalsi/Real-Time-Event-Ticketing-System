import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard, MdPerson, MdMovie } from "react-icons/md";
import { RiVipLine } from "react-icons/ri";

function Dashboard() {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-xl">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {role === "admin" && (
            <>
              <NavLink to="/dashboard/admin" className="bg-green-500 p-4 rounded-lg text-white flex items-center justify-center">
                <MdDashboard className="w-8 h-8 mr-2" />
                Admin Dashboard
              </NavLink>
              <NavLink to="/dashboard/vendor" className="bg-red-500 p-4 rounded-lg text-white flex items-center justify-center">
                <MdMovie className="w-8 h-8 mr-2" />
                Vendor Dashboard
              </NavLink>
              <NavLink to="/buy" className="bg-blue-500 p-4 rounded-lg text-white flex items-center justify-center">
                <MdPerson className="w-8 h-8 mr-2" />
                Buy Ticket Dashboard
              </NavLink>
              <NavLink to="/" className="bg-red-500 p-4 rounded-lg text-white flex items-center justify-center">
                <MdMovie className="w-8 h-8 mr-2" />
                Ticket Configuration
              </NavLink>
              <NavLink to="/VIP" className="bg-yellow-500 p-4 rounded-lg text-white flex items-center justify-center">
                <RiVipLine className="w-8 h-8 mr-2" />
                VIP
              </NavLink>
            </>
          )}
          {(role === "customer" || role === "vip") && (
            <>
              <NavLink to="/buy" className="bg-blue-500 p-4 rounded-lg text-white flex items-center justify-center">
                <MdPerson className="w-8 h-8 mr-2" />
                Customer Dashboard
              </NavLink>
              <NavLink to="/VIP" className="bg-yellow-500 p-4 rounded-lg text-white flex items-center justify-center">
                <RiVipLine className="w-8 h-8 mr-2" />
                VIP
              </NavLink>
            </>
          )}
          {role === "vendor" && (
            <>
              <NavLink to="/dashboard/vendor" className="bg-red-500 p-4 rounded-lg text-white flex items-center justify-center">
                <MdMovie className="w-8 h-8 mr-2" />
                Vendor Dashboard
              </NavLink>
              <NavLink to="/buy" className="bg-blue-500 p-4 rounded-lg text-white flex items-center justify-center">
                <MdPerson className="w-8 h-8 mr-2" />
                Customer Dashboard
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
