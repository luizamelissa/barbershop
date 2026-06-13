import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export function PublicLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function ClientLayout() {
  const { user } = useAuth();
  
  if (!user || user.role !== "cliente") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ClientSidebar />
      <div style={{ marginLeft: "250px", flex: 1, padding: "40px", backgroundColor: "var(--bg-primary)" }}>
        <Outlet />
      </div>
    </div>
  );
}

export function AdminLayout() {
  const { user } = useAuth();
  
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <div style={{ marginLeft: "250px", flex: 1, padding: "40px", backgroundColor: "var(--bg-primary)" }}>
        <Outlet />
      </div>
    </div>
  );
}

// Sidebars are imported at the top
import ClientSidebar from "../components/ClientSidebar";
import AdminSidebar from "../components/AdminSidebar";
