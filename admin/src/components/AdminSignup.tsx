/* eslint-disable jsx-a11y/anchor-is-valid */
// src/pages/AdminSignup.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/admin/signup", {
        email,
        password,
      });
      if (response.status === 201) {
        setSuccess("Signup successful. You can now log in.");
        setTimeout(() => navigate("/admin/login"), 2000);
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error("Error during signup:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-50 to-green-100 p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Admin Signup
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Create an admin account to manage the platform effectively.
        </p>

        {error && (
          <div className="text-red-600 text-center bg-red-100 p-2 rounded-md mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 text-center bg-green-100 p-2 rounded-md mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Terms and Signup Button */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              By signing up, you agree to our{" "}
              <a href="/terms" className="text-green-500 hover:underline">
                Terms and Conditions
              </a>
              .
            </div>
          </div>
          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all"
          >
            Sign Up
          </button>

          {/* Already have an account */}
          <div className="text-center text-gray-600 mt-6">
            Already have an admin account?{" "}
            <span
              className="text-green-600 hover:text-green-700 cursor-pointer font-semibold"
              onClick={() => navigate("/admin/login")}
            >
              Log In
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
