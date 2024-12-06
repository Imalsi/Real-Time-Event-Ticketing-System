import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      } else {
        setError(data.message || "Failed to fetch users.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e, userId) => {
    const { name, value } = e.target;
    setUsers(users.map((user) => (user.userId === userId ? { ...user, [name]: value } : user)));
  };

  const handleSave = async (userId) => {
    const user = users.find((user) => user.userId === userId);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUsers(users.map((u) => (u.userId === userId ? data : u)));
        setError("");
      } else {
        setError(data.message || "Failed to update user.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });


      const data = await response.json();

      if (response.ok) {
        window.location.reload();
        setUsers(users.filter((user) => user.userId !== userId));
        setError("");
      } else {
        window.location.reload();
        setError(data.message || "Failed to delete user.");
      }
      fetchUsers();
    } catch (error) {
      window.location.reload();
      setError("An error occurred. Please try again.");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Admin Dashboard</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <ul>
          {users.map((user) => (
            <li key={user.userId} className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <div className="flex-1 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" value={user.name} onChange={(e) => handleInputChange(e, user.userId)} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
                </div>
                <div className="flex-1 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={user.email} onChange={(e) => handleInputChange(e, user.userId)} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" disabled />
                </div>
                <div className="flex-1 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select name="role" value={user.role} onChange={(e) => handleInputChange(e, user.userId)} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200">
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>
                <div className="flex-1 flex justify-end items-end">
                  <button onClick={() => handleSave(user.userId)} className="mt-5 w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">
                    Save
                  </button>
                </div>
                <div className="flex justify-end items-center my-3">
                  <button onClick={() => handleDelete(user.userId)} className="bg-red-500 text-white px-4 md:mt-5 py-2 w-full rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;