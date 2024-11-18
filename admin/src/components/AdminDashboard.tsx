import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="space-y-4">
        <Link to="/admin/rooms" className="block bg-blue-500 text-white text-center p-4 rounded-lg shadow-md hover:bg-blue-700">
          Room Management
        </Link>
        <Link to="/admin/tenants" className="block bg-green-500 text-white text-center p-4 rounded-lg shadow-md hover:bg-green-700">
          Tenant Management
        </Link>
        <Link to="/admin/payments" className="block bg-yellow-500 text-white text-center p-4 rounded-lg shadow-md hover:bg-yellow-700">
          Payment Management
        </Link>
        <Link to="/admin/maintenance" className="block bg-red-500 text-white text-center p-4 rounded-lg shadow-md hover:bg-red-700">
          Maintenance Management
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
