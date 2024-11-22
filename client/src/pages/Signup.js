/* eslint-disable jsx-a11y/anchor-is-valid */
// src/pages/Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useFetcher } from "netwrap";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

let deviceId = localStorage.getItem("deviceId");
if (!deviceId) {
  deviceId = crypto.randomUUID(); // Generate a new UUID if none exists
  localStorage.setItem("deviceId", deviceId);
}

const Signup = () => {
  const [email, setUsername] = useState("");
  const [fullName, setUserFullname] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const {
    trigger: handleSignup,
    isLoading,
    data,
    error,
  } = useFetcher({
    queryFn: async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/api/users/add",
          {
            email,
            fullName,
            password,
            password2,
            roomNumber,
            phoneNumber,
            deviceId,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        return response.data; // Return response data if the request is successful
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Signup failed";
        throw new Error(errorMessage); // Throw error for `onError` to handle
      }
    },
    onSuccess: () => {
      console.log("Signup successful");
      navigate("/login");
    },
    onError: (err) => {
      console.error("Error during signup:", err.message);
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.clear();
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft size={24} />
          <span className="ml-2 font-medium">Back</span>
        </button>
        <button
          onClick={handleLogout}
          className="text-red-500 font-semibold hover:text-red-700"
        >
          Logout
        </button>
      </nav>

      {/* Signup Form */}
      <div className="flex-grow flex justify-center items-center p-6">
        <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Hostel Occupant Signup
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Create an account to manage your rental space.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
            className="space-y-6"
          >
            {/* Username/Email Field */}
            <div>
              <label className="text-lg text-gray-700 font-semibold">
                Full name
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                value={fullName}
                onChange={(e) => setUserFullname(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Username/Email Field */}
            <div>
              <label className="text-lg text-gray-700 font-semibold">
                Username (Email)
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="text-lg text-gray-700 font-semibold">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="text-lg text-gray-700 font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter your password again"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="new-password"
              />
            </div>
            {/* Phone Number Field */}
            <div>
              <label className="text-lg text-gray-700 font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Room Number Dropdown */}
            <div>
              <label className="text-lg text-gray-700 font-semibold">
                Room Number
              </label>
              <select
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Room Number</option>
                {Array.from({ length: 27 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Room {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Terms and Signup Button */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                By signing up, you agree to our{" "}
                <a href="/terms" className="text-blue-500 hover:underline">
                  Terms and Conditions
                </a>
                .
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-4 transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            {error && <p className="text-red-500 mt-4">{error.message}</p>}
            {data && <p className="text-green-500 mt-4">Signup successful!</p>}

            {/* Already have an account */}
            <div className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <span
                className="text-blue-600 hover:text-blue-700 cursor-pointer font-semibold"
                onClick={() => navigate("/login")}
              >
                Log In
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
