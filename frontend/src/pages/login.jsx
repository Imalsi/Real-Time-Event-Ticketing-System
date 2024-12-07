import React, { useState } from "react";
import loginBackground from "../assets/images/homeBanner.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => {
        throw new Error("Invalid response format");
      });

      if (response.status === 401) {
        setMessage("Invalid email or password");
      } else if (response.ok) {
        // Redirect to the profile page
        const email = data.email;
        const name = data.name;
        const role = data.role;
        const userId = data.userId;

        // Store the token in local storage with time
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("tokenTime", new Date().getTime());
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
        window.location.href = "/dashboard";
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log("Login error:", error);
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${loginBackground})`,
          filter: "blur(10px)",
        }}
      ></div>
      <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md bg-opacity-85">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {message && <p className="text-red-500 text-center">{message}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
          </div>
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">
            Login
          </button>
        </form>
        <p className="text-sm text-center">
          {" "}
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
