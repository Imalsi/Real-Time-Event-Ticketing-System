import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Use default import for jwt-decode
import Loading from "../components/loading";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [ticketCount, setTicketCount] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.name || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const edit = () => {
    setIsEdit(!isEdit);
  };

  const logout = () => {
    console.log("Logging out");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

    useEffect(() => {
    const id = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    setUserId(id);
  
    if (id) {
      // Token is valid, fetch user profile
      fetch(`/api/users/email/${email}`, {
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
    } else {
      // No token, redirect to login
      window.location.href = "/login";
    }
  }, []);

  const handleUpdate = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(`/api/users/${user.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          name: newUsername.trim() !== "" ? newUsername : user.name,
          role: user.role,
          email: user.email,
          password: newPassword || user.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsEdit(false);
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        // Update local storage with new username
        window.location.href = "/login";
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  // useEffect(() => {
  //   if (user && user.email) {
  //     const ticketCountFetch = fetch(`/api/tickets/user/${userId}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.length !== undefined) {
  //           setTicketCount(data.length);
  //         } else {
  //           console.error(data.message);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [user]);

  // Function to get user initials
  const getInitials = (username) => {
    if (!username) return "";
    const names = username.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.slice(0, 2).toUpperCase();
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100">
      <div className="flex flex-col items-center mt-10 p-6 bg-white rounded shadow-md w-4/5 min-h-96">
        {/* SVG Circle with User Initials */}
        <div className="mb-4">
          <svg className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill="#4F46E5" />
            <text x="50%" y="55%" textAnchor="middle" fill="#FFFFFF" fontSize="40px" fontFamily="Arial, Helvetica, sans-serif" dy=".3em">
              {getInitials(user.name)}
            </text>
          </svg>
        </div>
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>

        <p className="text-gray-700">Email: {user.email}</p>
        <p className={`mt-1 font-bold text-gray-500 ${user.role === "admin" ? "text-red-500" : "text-green-500"} ${user.role === "vip" ? "text-yellow-500" : ""}`}>{user.role}</p>
        <div className="flex flex-col bg-gray-300 w-full min-h-20 rounded-md p-2">
          {/* <p>Total Booked Tickets: {ticketCount} </p> */}
          <p>Points: {ticketCount * 2.9}</p>
          <p
            className="mt-10 text-red-700"
            onClick={() => {
              document.getElementById("update").scrollIntoView({ behavior: "smooth" });
              edit();
            }}
          >
            Edit Profile
          </p>
        </div>
      </div>
      <div className={`${isEdit ? "" : "hidden"} flex flex-col items-center mt-10 p-6 bg-white rounded shadow-md w-4/5 min-h-96`}>
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          <div className="flex items-center justify-between">
            <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update
            </button>
            <button onClick={() => setIsEdit(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <button onClick={logout} className="mt-4 px-4 py-2 my-5 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-indigo-200">
        Logout
      </button>
      <div id="update"></div>
    </div>
  );
};

export default Profile;
