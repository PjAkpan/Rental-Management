import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch room data from the API
    axios.get('/api/rooms')
      .then(response => {
        setRooms(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      });
  }, []);

  const handleChangeRoomStatus = (roomId, status) => {
    // Update room status
    axios.put(`/api/rooms/${roomId}`, { status })
      .then(response => {
        setRooms(rooms.map(room => room.id === roomId ? { ...room, status } : room));
      })
      .catch(error => console.error("Error updating room status:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-6">Room Management</h2>
      {loading ? (
        <p>Loading rooms...</p>
      ) : (
        <div className="space-y-4">
          {rooms.map((room) => (
            <div key={room.id} className="flex justify-between p-4 bg-white shadow-md rounded-lg">
              <div>
                <p className="font-bold">Room {room.roomNumber}</p>
                <p>Status: {room.status}</p>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => handleChangeRoomStatus(room.id, "vacant")} className="text-green-500">Vacant</button>
                <button onClick={() => handleChangeRoomStatus(room.id, "occupied")} className="text-blue-500">Occupied</button>
                <button onClick={() => handleChangeRoomStatus(room.id, "under maintenance")} className="text-yellow-500">Under Maintenance</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomManagement;
