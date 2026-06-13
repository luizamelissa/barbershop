import { Routes, Route } from "react-router-dom";
import { PublicLayout, ClientLayout, AdminLayout } from "../layouts/Layouts";

// Páginas Públicas
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Páginas do Cliente
import ClientDashboard from "../pages/ClientDashboard";
import NewSchedule from "../pages/NewSchedule";
import History from "../pages/History";
import Profile from "../pages/Profile";

// Páginas do Admin
import BarberDashboard from "../pages/BarberDashboard";
import BarberAppointments from "../pages/BarberAppointments";
import BarberClients from "../pages/BarberClients";
import BarberServices from "../pages/BarberServices";
import BarberScheduleConfig from "../pages/BarberScheduleConfig";
import BarberFinance from "../pages/BarberFinance";
import BarberReports from "../pages/BarberReports";

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Rotas Privadas - Cliente */}
      <Route path="/client" element={<ClientLayout />}>
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="new" element={<NewSchedule />} />
        <Route path="history" element={<History />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Rotas Privadas - Admin */}
      <Route path="/barber" element={<AdminLayout />}>
        <Route path="dashboard" element={<BarberDashboard />} />
        <Route path="appointments" element={<BarberAppointments />} />
        <Route path="clients" element={<BarberClients />} />
        <Route path="services" element={<BarberServices />} />
        <Route path="schedule-config" element={<BarberScheduleConfig />} />
        <Route path="finance" element={<BarberFinance />} />
        <Route path="reports" element={<BarberReports />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
