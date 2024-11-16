import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('Employee'); // Default to 'Employee'
  const [error, setError] = useState<string>(''); // For displaying errors
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any previous error
    try {
      const response = await axios.post('http://localhost:5000/admin/signup', {
        username,
        password,
        role,
      });
      if (response.status === 201) {
        navigate('/admin/login'); // Redirect to login after successful signup
      }
    } catch (err: any) {
      console.error('Signup failed', err);
      setError('Signup failed. Please try again later.'); // Display error message to user
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Admin Signup</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Owner">Owner</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
