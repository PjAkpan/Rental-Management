

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MaintenanceRequest = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [pictureProof, setPictureProof] = useState(null);
  const [videoProof, setVideoProof] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState("");
  const navigate = useNavigate();

  // Handle file input changes
  const handlePictureChange = (e) => setPictureProof(e.target.files[0]);
  const handleVideoChange = (e) => setVideoProof(e.target.files[0]);

  // Function to submit maintenance request
  const submitRequest = async () => {
    if (!subject || !description) {
      setMessage("Please fill out the subject and description.");
      return;
    }
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    if (pictureProof) formData.append("pictureProof", pictureProof);
    if (videoProof) formData.append("videoProof", videoProof);

    setLoading(true);
    try {
      await axios.post("/api/maintenance-request", formData);
      setMessage("Maintenance request submitted successfully!");
      setLoading(false);
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      setMessage("Failed to submit maintenance request.");
      setLoading(false);
    }
  };

  // Function to view request status
  const viewRequestStatus = async () => {
    try {
      const response = await axios.get("/api/maintenance-request-status");
      setRequestStatus(response.data.status); // Status could be 'pending', 'in progress', 'completed', or 'declined'
    } catch (error) {
      setMessage("Failed to fetch request status.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Maintenance Request</h1>

        {/* Subject Input */}
        <label className="block text-gray-700 font-semibold mb-2">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Brief subject of your request"
        />

        {/* Description Input */}
        <label className="block text-gray-700 font-semibold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Describe the maintenance issue"
        />

        {/* Picture Proof Input */}
        <label className="block text-gray-700 font-semibold mb-2">Picture Proof (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePictureChange}
          className="w-full mb-4"
        />

        {/* Video Proof Input */}
        <label className="block text-gray-700 font-semibold mb-2">Video Proof (optional)</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="w-full mb-4"
        />

        {/* Submit Button */}
        <button
          onClick={submitRequest}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>

        {/* Message Display */}
        {message && (
          <div className="mt-4 p-2 bg-gray-100 text-center text-gray-700">
            {message}
          </div>
        )}

        {/* View Request Status */}
        <div className="mt-6">
          <button
            onClick={viewRequestStatus}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            View Request Status
          </button>
          {requestStatus && (
            <p className="mt-4 text-center text-gray-700">
              Current Status: <span className="font-semibold">{requestStatus}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceRequest;
