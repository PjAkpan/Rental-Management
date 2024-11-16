import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Room {
  id: number;
  number: string;
  status: string;
}

const RoomManagement = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/admin/rooms')
      .then((response) => setRooms(response.data))
      .catch((err) => console.error('Error fetching rooms', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-6">Room Management</h2>
      <table className="table-auto w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Room Number</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td className="px-4 py-2">{room.number}</td>
              <td className="px-4 py-2">{room.status}</td>
              <td className="px-4 py-2">
                <button className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-700">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomManagement;
