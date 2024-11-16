import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Tenant {
  id: number;
  name: string;
  roomNumber: string;
}

const TenantManagement = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/admin/tenants')
      .then((response) => setTenants(response.data))
      .catch((err) => console.error('Error fetching tenants', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-6">Tenant Management</h2>
      <table className="table-auto w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Room</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td className="px-4 py-2">{tenant.name}</td>
              <td className="px-4 py-2">{tenant.roomNumber}</td>
              <td className="px-4 py-2">
                <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenantManagement;
