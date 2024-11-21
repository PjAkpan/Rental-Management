import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the types for the state
type Request = { id: string; description: string; status: string };
type Room = { id: string; status: string };
type Payment = { id: string; status: string };

const MaintenanceManagement = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch maintenance request data
    axios
      .get("/api/maintenance-requests")
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching maintenance requests:", error);
        setLoading(false);
      });
  }, []);

  const handleUpdateRequestStatus = (
    requestId: string,
    status: string
  ): void => {
    // Update maintenance request status
    axios
      .put(`/api/maintenance-requests/${requestId}`, { status })
      .then((response) => {
        setRequests(
          requests.map((request) =>
            request.id === requestId ? { ...request, status } : request
          )
        );
      })
      .catch((error) => console.error("Error updating request status:", error));
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-6">Maintenance Management</h2>
      {loading ? (
        <p>Loading maintenance requests...</p>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex justify-between p-4 bg-white shadow-md rounded-lg"
            >
              <div>
                <p className="font-bold">{request.description}</p>
                <p>Status: {request.status}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() =>
                    handleUpdateRequestStatus(request.id, "completed")
                  }
                  className="text-green-500"
                >
                  Completed
                </button>
                <button
                  onClick={() =>
                    handleUpdateRequestStatus(request.id, "pending")
                  }
                  className="text-yellow-500"
                >
                  Pending
                </button>
                <button
                  onClick={() =>
                    handleUpdateRequestStatus(request.id, "rejected")
                  }
                  className="text-red-500"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaintenanceManagement;
