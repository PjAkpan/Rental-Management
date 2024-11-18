import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MaintenanceRequest from './pages/MaintenanceRequest';
import Notifications from './pages/Notifications';
import ChangePassword from './pages/ChangePassword';
import TermsAndConditions from './pages/TermsAndConditions';
import RequestStatus from './pages/RequestStatus';
import ContactPage from './pages/Contact ';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/maintenance" element={<MaintenanceRequest />} />
        <Route path="/request-status" element={<RequestStatus />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
