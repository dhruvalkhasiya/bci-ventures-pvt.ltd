import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Registrations from "./pages/Registrations";
import Enquiries from "./pages/Enquiries";
import Certificates from "./pages/Certificates";
import Students from "./pages/Students";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/registrations" element={<Registrations />} />
        <Route path="/students" element={<Students />} />
        <Route path="/enquiries" element={<Enquiries />} />
        <Route path="/certificates" element={<Certificates />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
