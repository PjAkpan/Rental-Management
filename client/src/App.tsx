import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MaintenanceRequest from "./pages/MaintenanceRequest";
import Notifications from "./pages/Notifications";
import ChangePassword from "./pages/ChangePassword";
import TermsAndConditions from "./pages/TermsAndConditions";
import RequestStatus from "./pages/RequestStatus";
import ContactPage from "./pages/Contact ";
import ResetPassword from "./pages/ResetPassword";
import withLoader from "./hoc/withLoader"; // Import the HOC

const App: React.FC = () => {
  const WrappedSignup = withLoader(Signup);
  const WrappedLogin = withLoader(Login);
  const WrappedDashboard = withLoader(Dashboard);
  const WrappedProfile = withLoader(Profile);
  const WrappedMaintenanceRequest = withLoader(MaintenanceRequest);
  const WrappedNotifications = withLoader(Notifications);
  const WrappedChangePassword = withLoader(ChangePassword);
  const WrappedTermsAndConditions = withLoader(TermsAndConditions);
  const WrappedRequestStatus = withLoader(RequestStatus);
  const WrappedContactPage = withLoader(ContactPage);
  const WrappedResetPassword = withLoader(ResetPassword);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WrappedSignup />} />
        <Route path="/signup" element={<WrappedSignup />} />
        <Route path="/login" element={<WrappedLogin />} />
        <Route path="/dashboard" element={<WrappedDashboard />} />
        <Route path="/profile" element={<WrappedProfile />} />
        <Route path="/maintenance" element={<WrappedMaintenanceRequest />} />
        <Route path="/request-status" element={<WrappedRequestStatus />} />
        <Route path="/notifications" element={<WrappedNotifications />} />
        <Route path="/change-password" element={<WrappedChangePassword />} />
        <Route path="/terms" element={<WrappedTermsAndConditions />} />
        <Route path="/contact" element={<WrappedContactPage />} />
        <Route path="/reset-password" element={<WrappedResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
