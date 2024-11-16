import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignup';
import AdminDashboard from './components/AdminDashboard';
import RoomManagement from './components/RoomManagement';
import TenantManagement from './components/TenantManagement';
import TermsAndConditions from './components/TermsAndConditions';
import ResetPassword from './components/ResetPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} /> {/* Default route */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/rooms" element={<RoomManagement />} />
        <Route path="/admin/tenants" element={<TenantManagement />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/reset-password" element={<ResetPassword />}/>
      </Routes>
    </Router>
  );
};

export default App;
