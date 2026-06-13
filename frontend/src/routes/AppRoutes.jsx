import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Schedule from "../pages/Schedule";
import History from "../pages/History";
import Profile from "../pages/Profile";
import Payment from "../pages/Payment";
import BarberDashboard from "../pages/BarberDashboard";
import BarberAppointments from "../pages/BarberAppointments";
import BarberClients from "../pages/BarberClients";
import BarberReports from "../pages/BarberReports";

function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Cliente */}
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/payment" element={<Payment />} />
      
      {/* Barbeiro/Admin */}
      <Route path="/barber/dashboard" element={<BarberDashboard />} />
      <Route path="/barber/appointments" element={<BarberAppointments />} />
      <Route path="/barber/clients" element={<BarberClients />} />
      <Route path="/barber/reports" element={<BarberReports />} />
    </Routes>
  );
}

export default AppRoutes;
