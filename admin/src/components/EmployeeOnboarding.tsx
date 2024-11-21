

import React, { useState } from "react";
import axios from "axios";

const EmployeeOnboarding = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOnboarding = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/admin/onboard-employee", {
        email,
        phoneNumber,
        role,
      });

      if (response.status === 201) {
        setSuccess("Employee successfully onboarded. Check email for credentials.");
      }
    } catch (err) {
      setError("Onboarding failed. Please try again.");
      console.error("Error during onboarding:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 to-yellow-200 p-4">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Employee Onboarding</h2>
        <p className="text-center text-gray-500 mb-4">
          Add employees by providing their email, phone number, and role.
        </p>

        {error && <div className="text-red-600 text-center bg-red-100 p-2 rounded-md mb-4">{error}</div>}
        {success && (
          <div className="text-green-600 text-center bg-green-100 p-2 rounded-md mb-4">{success}</div>
        )}

        <form onSubmit={handleOnboarding} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter employee's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-3 rounded-md font-semibold hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 focus:outline-none transition-all"
          >
            Onboard Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeOnboarding;
