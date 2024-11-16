/* eslint-disable jsx-a11y/anchor-is-valid */
// src/pages/AdminSignup.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee'); // Default to Employee
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      const response = await axios.post(
        'http://localhost:5000/admin/signup',
        { username, password, role },
        {
          withCredentials: true, // Include credentials such as cookies if required
        }
      );
      console.log(response.data);
      navigate('/admin/login'); // Redirect to admin login page
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Signup failed. Please check your input or try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-50 to-green-100 p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Admin Signup</h2>
        <p className="text-center text-gray-500 mb-6">
          Create an admin account to manage the platform effectively.
        </p>

        {error && (
          <div className="text-red-600 text-center mb-4 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Username/Email Field */}
          <div>
            <label className="text-lg text-gray-700 font-semibold">Username (Email)</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              autoComplete="email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="text-lg text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              autoComplete="new-password"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="text-lg text-gray-700 font-semibold">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="Owner">Owner</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          {/* Terms and Signup Button */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              By signing up, you agree to our{' '}
              <a href="/terms" className="text-green-500 hover:underline">
                Terms and Conditions
              </a>
              .
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold mt-4 transition-all hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Sign Up
          </button>

          {/* Already have an account */}
          <div className="text-center text-gray-600 mt-6">
            Already have an admin account?{' '}
            <span
              className="text-green-600 hover:text-green-700 cursor-pointer font-semibold"
              onClick={() => navigate('/admin/login')}
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
