// src/pages/ChangePassword.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChangePassword = () => {
  const navigate = useNavigate();

  // State management
  const [step, setStep] = useState(1); // Step to manage the flow of password change process
  const [contactMethod, setContactMethod] = useState('email'); // Default to email
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle sending OTP
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/send-otp', { contactMethod });
      if (response.data.success) {
        setStep(2);
        setMessage("OTP sent successfully");
      } else {
        setMessage("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  // Function to handle OTP verification
  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/verify-otp', { otp });
      if (response.data.success) {
        setStep(3);
        setMessage("OTP verified successfully");
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  // Function to handle password reset
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/reset-password', {
        newPassword,
      });
      if (response.data.success) {
        setMessage("Password changed successfully");
        setTimeout(() => navigate('/dashboard'), 2000); // Redirect after success
      } else {
        setMessage("Failed to reset password. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Change Password</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        {/* Step 1: Select Contact Method */}
        {step === 1 && (
          <div>
            <p className="mb-4 text-gray-700">Choose where to receive the OTP code:</p>
            <select
              value={contactMethod}
              onChange={(e) => setContactMethod(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-4"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
            <button
              onClick={handleSendOtp}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <div>
            <p className="mb-4 text-gray-700">Enter the OTP sent to your {contactMethod}:</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {/* Step 3: Set New Password */}
        {step === 3 && (
          <div>
            <p className="mb-4 text-gray-700">Enter your new password:</p>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <button
              onClick={handleResetPassword}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
