import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TenantManagement = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch tenants data from the API (example API call)
    axios.get('/api/tenants')
      .then(response => {
        setTenants(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching tenants:", error);
        setLoading(false);
      });
  }, []);

  const handleDeleteTenant = (tenantId) => {
    // Delete tenant logic
    axios.delete(`/api/tenants/${tenantId}`)
      .then(response => {
        setTenants(tenants.filter(tenant => tenant.id !== tenantId));
      })
      .catch(error => console.error("Error deleting tenant:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-6">Tenant Management</h2>
      {loading ? (
        <p>Loading tenants...</p>
      ) : (
        <div className="space-y-4">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="flex justify-between p-4 bg-white shadow-md rounded-lg">
              <div>
                <p className="font-bold">{tenant.name}</p>
                <p>{tenant.roomNumber}</p>
                <p>Status: {tenant.paymentStatus}</p>
              </div>
              <div className="flex space-x-4">
                <Link to={`/admin/tenants/edit/${tenant.id}`} className="text-blue-500">Edit</Link>
                <button
                  onClick={() => handleDeleteTenant(tenant.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenantManagement;
