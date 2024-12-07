import React, { useEffect } from "react";
import { useState } from "react";
import { FaCrown, FaTicketAlt, FaPercent, FaCalendarAlt, FaUserFriends, FaGift } from "react-icons/fa";
import { MdPassword } from "react-icons/md";

const VIP = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userId) {
          setUser(data);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      }); 
  },[])

  const vipHandler = async () => {
    const role = localStorage.getItem("role");
    if (role === "customer") {
      try {
        const response = await fetch(`/api/users/${user.userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
            role: "vip",
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("role", "vip");
          alert("You are now a VIP member.");
          setError("");
        } else {
          setError(data.message || "Failed to update user.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
        console.error("Error updating user:", error);
      }
    } else if (role === "vip") {
      setError("You are already a VIP member.");
      alert("You are already a VIP member.");
    } else {
      setError("You cannot be a VIP member.");
      alert("You cannot be a VIP member.");
    }
  };

  const benefits = [
    {
      icon: <FaTicketAlt className="w-8 h-8" />,
      title: "Priority Booking",
      description: "Book tickets 24 hours before general public",
    },
    {
      icon: <FaPercent className="w-8 h-8" />,
      title: "Special Discounts",
      description: "Get up to 20% off on all ticket purchases",
    },
    {
      icon: <FaCalendarAlt className="w-8 h-8" />,
      title: "Exclusive Events",
      description: "Access to VIP-only events and premieres",
    },
    {
      icon: <FaUserFriends className="w-8 h-8" />,
      title: "Guest Privileges",
      description: "Bring up to 3 guests at VIP rates",
    },
    {
      icon: <FaGift className="w-8 h-8" />,
      title: "Birthday Benefits",
      description: "Special gifts and free tickets on your birthday",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Banner */}
      <div className="relative h-96 bg-gradient-to-r from-purple-800 to-indigo-800">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <FaCrown className="w-16 h-16 mb-4 text-yellow-400" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">VIP Membership</h1>
          <p className="text-xl md:text-2xl">Experience Cinema Like Never Before</p>
        </div>
      </div>

      {/* Benefits Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">VIP Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-indigo-600 mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Benefits */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Detailed VIP Benefits</h2>
          <div className="space-y-8">
            <div className="border-l-4 border-indigo-600 pl-4">
              <h3 className="text-xl font-semibold mb-2">Priority Booking Access</h3>
              <p className="text-gray-600">Get exclusive access to book tickets 24 hours before they're available to the general public. Never miss out on premium seats for blockbuster releases.</p>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4">
              <h3 className="text-xl font-semibold mb-2">Discounts & Rewards</h3>
              <p className="text-gray-600">Enjoy up to 20% off on all ticket purchases, special concession prices, and earn 2x points on every purchase. Points can be redeemed for free tickets and concessions.</p>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4">
              <h3 className="text-xl font-semibold mb-2">Exclusive Events & Premieres</h3>
              <p className="text-gray-600">Get invited to exclusive movie premieres, special screenings, and VIP-only events. Meet celebrities and enjoy red carpet experiences.</p>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4">
              <h3 className="text-xl font-semibold mb-2">Guest Privileges</h3>
              <p className="text-gray-600">Share the VIP experience with your friends and family. Bring up to 3 guests who can enjoy VIP rates and benefits during their visit.</p>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Join Our VIP Program Today</h2>
          <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors" onClick={() => vipHandler()}>
            Become a VIP Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default VIP;
