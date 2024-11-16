/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [contactInfo, setContactInfo] = useState({
    fullName: 'John Doe', // Added full name
    email: 'tenant@example.com',
    phoneNumber: '+1234567890',
  });
  const [editMode, setEditMode] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([
    { date: '2023-10-02', amount: '₦25,000', status: 'Paid' },
    { date: '2023-09-02', amount: '₦25,000', status: 'Paid' },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put('http://localhost:5000/api/client/contact-info', contactInfo);
      setEditMode(false);
      alert('Contact information updated successfully!');
    } catch (error) {
      console.error('Error updating contact info:', error);
      alert('Failed to update contact information.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Profile</h2>

        {/* Contact Information Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-lg font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                name="fullName" // Fixed name attribute to match state
                value={contactInfo.fullName}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`mt-2 w-full p-3 border rounded-lg ${
                  editMode ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200'
                }`}
              />
            </div>
            <div>
              <label className="text-lg font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`mt-2 w-full p-3 border rounded-lg ${
                  editMode ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200'
                }`}
              />
            </div>
            <div>
              <label className="text-lg font-medium text-gray-600">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={contactInfo.phoneNumber}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`mt-2 w-full p-3 border rounded-lg ${
                  editMode ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200'
                }`}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            {editMode ? (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleEditToggle}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditToggle}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Edit Contact Information
              </button>
            )}
          </div>
        </div>

        {/* Payment History Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Payment History</h3>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b">{payment.date}</td>
                  <td className="py-2 px-4 border-b">{payment.amount}</td>
                  <td className="py-2 px-4 border-b">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
