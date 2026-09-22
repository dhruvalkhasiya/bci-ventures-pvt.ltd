import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import SplashScreen from "./components/SplashScreen";

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Certification from "./pages/Certification";
import CertificateVerify from "./pages/CertificateVerify";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import Registrations from "./admin/Registrations";
import Enquiries from "./admin/Enquiries";
import AdminCourses from "./admin/Courses";
import Students from "./admin/Students";
import Certificates from "./admin/Certificates";

export default function App() {
  return (
    <>
      <SplashScreen />
      <Routes>
        {/* Public site */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/certification" element={<Certification />} />
          <Route path="/certificate/verify" element={<CertificateVerify />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="registrations" element={<Registrations />} />
          <Route path="students" element={<Students />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="certificates" element={<Certificates />} />
        </Route>
      </Routes>
    </>
  );
}
