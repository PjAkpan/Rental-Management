/* eslint-disable jsx-a11y/anchor-is-valid */
// src/pages/Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/client/signup', {
        username,
        password,
        roomNumber,
      },
      {
        withCredentials: true, // Include credentials such as cookies (if required)
      }
    );
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Hostel Occupant Signup</h2>
        <p className="text-center text-gray-500 mb-6">Create an account to manage your rental space.</p>
        
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Username/Email Field */}
          <div>
            <label className="text-lg text-gray-700 font-semibold">Username (Email)</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="new-password" 
            />
          </div>

          {/* Room Number Dropdown */}
          <div>
            <label className="text-lg text-gray-700 font-semibold">Room Number</label>
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
              By signing up, you agree to our{' '}
              <a href="/terms" className="text-blue-500 hover:underline">
                Terms and Conditions
              </a>.
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-4 transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Sign Up
          </button>

          {/* Already have an account */}
          <div className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <span
              className="text-blue-600 hover:text-blue-700 cursor-pointer font-semibold"
              onClick={() => navigate('/login')}
            >
              Log In
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
