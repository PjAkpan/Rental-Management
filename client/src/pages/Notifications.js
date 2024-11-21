import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom"; // For navigation
import { FaHome, FaArrowLeft } from "react-icons/fa"; // For icons
import axios from "axios";
import { initializeWebSocket, closeWebSocket } from "../utils/websocket";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const websocketRef = useRef(null);

  // Fetch notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/notifications");
        setNotifications(response.data.notifications);
        setLoading(false);
      } catch (error) {
        setErrorMessage("Failed to load notifications.");
        setLoading(false);
      }
    };
    fetchNotifications();

    // Handle WebSocket connection for real-time updates
    const onNewNotification = (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]);
    };

    websocketRef.current = initializeWebSocket("ws://localhost:4000", onNewNotification); // Store WebSocket instance in ref

    // Cleanup WebSocket connection on unmount
    return () => {
      closeWebSocket();
    };
  }, []);

  // Mark notification as read/unread
  const toggleReadStatus = async (id, isRead) => {
    try {
      await axios.patch(`/api/notifications/${id}`, { isRead: !isRead });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id ? { ...notification, isRead: !isRead } : notification
        )
      );
    } catch (error) {
      setErrorMessage("Failed to update notification status.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-t-lg">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <FaArrowLeft size={24} />
          <span>Back</span>
        </Link>
        <Link to="/dashboard" className="flex items-center space-x-2">
          <FaHome size={24} />
          <span>Home</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Notifications</h1>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <>
            {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-2 px-4 text-gray-700 font-semibold">Notification</th>
                  <th className="border-b py-2 px-4 text-gray-700 font-semibold">Date</th>
                  <th className="border-b py-2 px-4 text-gray-700 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification) => (
                  <tr key={notification.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4">
                      <button
                        onClick={() => setSelectedNotification(notification)}
                        className="text-blue-600 hover:underline"
                      >
                        {notification.title}
                      </button>
                    </td>
                    <td className="py-2 px-4 text-gray-600">
                      {new Date(notification.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => toggleReadStatus(notification.id, notification.isRead)}
                        className={`px-3 py-1 rounded-full ${
                          notification.isRead ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {notification.isRead ? "Read" : "Unread"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedNotification && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {selectedNotification.title}
                  </h2>
                  <p className="text-gray-600">{selectedNotification.message}</p>
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => setSelectedNotification(null)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;
