import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/admin/reset-password', {
        email,
      });

      if (response.status === 200) {
        setMessage('Password reset instructions have been sent to your email.');
      }
    } catch (err) {
      setError('Failed to send reset instructions. Please check the email or try again later.');
      console.error('Error resetting password:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-200 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Reset Password</h2>
        <p className="text-center text-gray-500 mb-4">
          Enter your email address to receive password reset instructions.
        </p>

        {message && (
          <div className="mb-4 text-green-600 text-center bg-green-100 p-2 rounded-md">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 text-red-600 text-center bg-red-100 p-2 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center text-gray-600 mt-6">
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate('/admin/login')}
          >
            Back to Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
