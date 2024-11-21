import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 


// Define the type for Tenant
interface Tenant {
  id: string;
  fullName: string;
  roomNumber: string;
  email: string;
  phoneNumber: string;
  paymentStatus: string;
}

const TenantManagement = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTenant, setNewTenant] = useState({
    fullName: '',
    roomNumber: '',
    email: '',
    phoneNumber: '',
    paymentStatus: '',
  });
  const [editTenant, setEditTenant] = useState<Tenant | null>(null);

  // Fetch tenants on component mount
  useEffect(() => {
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

  const handleDeleteTenant = (tenantId: string) => {
    axios.delete(`/api/tenants/${tenantId}`)
      .then(() => {
        setTenants(tenants.filter(tenant => tenant.id !== tenantId));
        toast.success("Tenant deleted successfully!");
      })
      .catch(error => {
        console.error("Error deleting tenant:", error);
        toast.error("Error deleting tenant.");
      });
  };

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('/api/tenants', newTenant)
      .then(response => {
        setTenants([...tenants, response.data]);
        setNewTenant({
          fullName: '',
          roomNumber: '',
          email: '',
          phoneNumber: '',
          paymentStatus: '',
        });
        toast.success("Tenant added successfully!");
      })
      .catch(error => {
        console.error("Error adding tenant:", error);
        toast.error("Error adding tenant.");
      });
  };

  const handleEditTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTenant) {
      axios.put(`/api/tenants/${editTenant.id}`, editTenant)
        .then(response => {
          setTenants(tenants.map(tenant =>
            tenant.id === editTenant.id ? response.data : tenant
          ));
          setEditTenant(null);
          toast.success("Tenant details updated successfully!");
        })
        .catch(error => {
          console.error("Error editing tenant:", error);
          toast.error("Error updating tenant.");
        });
    }
  };

  const goBack = () => {
    navigate(-1);// Navigate to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Navbar with Back Arrow */}
      <div className="flex items-center space-x-4 mb-6">
        <button onClick={goBack} className="text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold">Tenant Management</h2>
      </div>

      {/* Add Tenant Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Add Tenant</h3>
        <form onSubmit={handleAddTenant} className="space-y-4">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              value={newTenant.fullName}
              onChange={(e) => setNewTenant({ ...newTenant, fullName: e.target.value })}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Tenant Full Name"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Room Number</label>
            <input
              type="text"
              value={newTenant.roomNumber}
              onChange={(e) => setNewTenant({ ...newTenant, roomNumber: e.target.value })}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Room Number"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={newTenant.email}
              onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Tenant Email"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              value={newTenant.phoneNumber}
              onChange={(e) => setNewTenant({ ...newTenant, phoneNumber: e.target.value })}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Phone Number"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Payment Status</label>
            <select
              value={newTenant.paymentStatus}
              onChange={(e) => setNewTenant({ ...newTenant, paymentStatus: e.target.value })}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>Select Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Add Tenant
          </button>
        </form>
      </div>

      {loading ? (
        <p>Loading tenants...</p>
      ) : (
        <div className="space-y-4">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
              <div>
                <p className="font-bold">{tenant.fullName}</p>
                <p>Room: {tenant.roomNumber}</p>
                <p>Email: {tenant.email}</p>
                <p>Phone: {tenant.phoneNumber}</p>
                <p>Status: {tenant.paymentStatus}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setEditTenant(tenant)}
                  className="text-blue-500"
                >
                  Edit
                </button>
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

      {/* Edit Tenant Modal */}
      {editTenant && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-xl font-bold mb-4">Edit Tenant</h3>
            <form onSubmit={handleEditTenant} className="space-y-4">
              <div>
                <label className="block font-medium">Full Name</label>
                <input
                  type="text"
                  value={editTenant.fullName}
                  onChange={(e) => setEditTenant({ ...editTenant, fullName: e.target.value })}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Room Number</label>
                <input
                  type="text"
                  value={editTenant.roomNumber}
                  onChange={(e) => setEditTenant({ ...editTenant, roomNumber: e.target.value })}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  value={editTenant.email}
                  onChange={(e) => setEditTenant({ ...editTenant, email: e.target.value })}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Phone Number</label>
                <input
                  type="text"
                  value={editTenant.phoneNumber}
                  onChange={(e) => setEditTenant({ ...editTenant, phoneNumber: e.target.value })}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Payment Status</label>
                <select
                  value={editTenant.paymentStatus}
                  onChange={(e) => setEditTenant({ ...editTenant, paymentStatus: e.target.value })}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Update Tenant
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default TenantManagement;
