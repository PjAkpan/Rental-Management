

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [tenancyReceipt, setTenancyReceipt] = useState(null);
  const [message, setMessage] = useState("");

  // Handle payment receipt file selection
  const handlePaymentReceiptChange = (e) => {
    setPaymentReceipt(e.target.files[0]);
  };

  // Handle tenancy receipt file selection
  const handleTenancyReceiptChange = (e) => {
    setTenancyReceipt(e.target.files[0]);
  };

  // Function to upload payment receipt
  const uploadReceipt = async () => {
    if (!paymentReceipt) {
      setMessage("Please select a payment receipt to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("receipt", paymentReceipt);

    try {
      await axios.post('/api/upload-payment-receipt', formData);
      setMessage("Payment receipt uploaded successfully!");
    } catch (error) {
      setMessage("Failed to upload payment receipt.");
    }
  };

  // Function to upload tenancy receipt
  const uploadTenancyReceipt = async () => {
    if (!tenancyReceipt) {
      setMessage("Please select a tenancy receipt to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("receipt", tenancyReceipt);

    try {
      await axios.post('/api/upload-tenancy-receipt', formData);
      setMessage("Tenancy receipt uploaded successfully!");
    } catch (error) {
      setMessage("Failed to upload tenancy receipt.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Occupant Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Room Details */}
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">Room Details</h2>
            <p className="text-gray-600">Room Number: 12</p>
            <p className="text-gray-600">Rent Due Date: 5th of every month</p>
          </div>

          {/* Payment Status and Receipt Upload */}
          <div className="bg-green-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-green-700 mb-3">Payment Status</h2>
            <p className="text-gray-600">Last Payment: 2nd October 2023</p>
            <p className="text-gray-600">Amount Paid: ₦25,000</p>
            
            {/* Upload Payment Receipt */}
            <input
              type="file"
              accept="image/*"
              onChange={handlePaymentReceiptChange}
              className="mt-4"
            />
            <button
              onClick={uploadReceipt}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Upload Payment Receipt
            </button>
          </div>

          {/* Upload Tenancy Receipt */}
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">Tenancy Receipt</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleTenancyReceiptChange}
              className="mt-4"
            />
            <button
              onClick={uploadTenancyReceipt}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Upload Tenancy Receipt
            </button>
          </div>

          {/* Maintenance Requests */}
          <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-yellow-700 mb-3">Maintenance Requests</h2>
            <p className="text-gray-600">Recent Request: Leaking Tap</p>
            <button
              onClick={() => navigate('/maintenance')}
              className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            >
              Request Maintenance
            </button>
          </div>

          {/* Account Settings */}
          <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-purple-700 mb-3">Account Settings</h2>
            <button
              onClick={() => navigate('/profile')}
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 w-full"
            >
              View Profile
            </button>
            <button
              onClick={() => navigate('/change-password')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Notifications</h2>
          <p className="text-gray-600">You have 2 new notifications.</p>
          <button
            onClick={() => navigate('/notifications')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            View All Notifications
          </button>
        </div>

        {/* Display Message */}
        {message && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow text-center">
            <p className="text-gray-700 font-medium">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
