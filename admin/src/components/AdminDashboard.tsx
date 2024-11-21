/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUsers, FiHome, FiDollarSign, FiSettings } from "react-icons/fi";
import { AiOutlineTool, AiOutlineBell } from "react-icons/ai";
import Chart from "react-apexcharts";
import jsPDF from "jspdf"; // For PDF export
import { CSVLink } from "react-csv"; // For CSV export]
import { io } from "socket.io-client";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalRooms: 50,
    occupiedRooms: 45,
    totalTenants: 48,
    totalRevenue: 150000,
    outstandingPayments: 20000,
    maintenanceRequests: 5,
  });
  const [notifications, setNotifications] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Mock fetch for analytics and notifications (replace with API calls)
    const fetchAnalytics = async () => {
      const data = {
        totalRooms: 50,
        occupiedRooms: 45,
        totalTenants: 48,
        totalRevenue: 150000,
        outstandingPayments: 20000,
        maintenanceRequests: 5,
      };
      setAnalytics(data);

      const notificationsData = [
        "Payment due for Tenant A in 2 days",
        "New maintenance request submitted",
        "Tenant B moved out of Room 12",
      ];
      setNotifications(notificationsData);
    };
    fetchAnalytics();
  }, []);


  useEffect(() => {
    const socket = io("http://localhost:5000"); 
    socket.on("notification", (message: string) => {
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  // Export analytics as a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Admin Dashboard Analytics", 10, 10);
    Object.entries(analytics).forEach(([key, value], index) =>
      doc.text(`${key}: ${value}`, 10, 20 + index * 10)
    );
    doc.save("dashboard-report.pdf");
  };

  // Graph Data
  const revenueGraphData = {
    series: [
      {
        name: "Revenue",
        data: [10000, 20000, 30000, 50000, 150000],
      },
    ],
    options: {
      chart: { type: "line" as const, toolbar: { show: false } },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
    },
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">Admin Panel</h3>
        <nav className="space-y-4">
          <Link to="/admin/rooms" className="flex items-center text-gray-700 hover:text-blue-600">
            <FiHome className="mr-3" /> Room Management
          </Link>
          <Link to="/admin/tenants" className="flex items-center text-gray-700 hover:text-blue-600">
            <FiUsers className="mr-3" /> Tenant Management
          </Link>
          <Link to="/admin/payments" className="flex items-center text-gray-700 hover:text-blue-600">
            <FiDollarSign className="mr-3" /> Payment Management
          </Link>
          <Link to="/admin/maintenance" className="flex items-center text-gray-700 hover:text-blue-600">
            <AiOutlineTool className="mr-3" /> Maintenance
          </Link>
          <Link to="/admin/roles" className="flex items-center text-gray-700 hover:text-blue-600">
            <FiSettings className="mr-3" /> User Roles
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-md"
            />
            <button className="p-2 bg-blue-500 text-white rounded-md" onClick={() => setFilter("outstandingPayments")}>
              Filter Outstanding Payments
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <AiOutlineBell className="mr-2" /> Notifications
          </h3>
          <ul className="divide-y divide-gray-200">
            {notifications.map((note, index) => (
              <li key={index} className="py-2 text-sm text-gray-600">
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(analytics).map(([key, value]) => (
            <div key={key} className="p-4 bg-white shadow rounded-lg">
              <h3 className="text-lg text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</h3>
              <p className="text-2xl font-bold text-blue-500">{value}</p>
            </div>
          ))}
        </div>

        {/* Revenue Graph */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Revenue Overview</h3>
          <Chart options={revenueGraphData.options} series={revenueGraphData.series} type="line" />
        </div>

        {/* Export Reports */}
        <div className="flex space-x-4">
          <button
            onClick={exportToPDF}
            className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Export PDF
          </button>
          <CSVLink
            data={Object.entries(analytics).map(([key, value]) => ({ key, value }))}
            filename={"dashboard-report.csv"}
            className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
