import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Users, Scissors, Clock, DollarSign, BarChart3, LogOut, UserCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = [
    { path: "/barber/dashboard", name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/barber/appointments", name: "Agenda", icon: <CalendarDays size={20} /> },
    { path: "/barber/clients", name: "Clientes", icon: <Users size={20} /> },
    { path: "/barber/services", name: "Serviços", icon: <Scissors size={20} /> },
    { path: "/barber/professionals", name: "Profissionais", icon: <UserCheck size={20} /> },
    { path: "/barber/schedule-config", name: "Horários", icon: <Clock size={20} /> },
    { path: "/barber/finance", name: "Financeiro", icon: <DollarSign size={20} /> },
    { path: "/barber/reports", name: "Relatórios", icon: <BarChart3 size={20} /> }
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <h2 style={{ color: "#ffffff", margin: 0 }}>Atlas Admin</h2>
        <span style={{ fontSize: "0.85rem", color: "#cccccc" }}>Área do Barbeiro</span>
      </div>

      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            style={{
              ...styles.link,
              backgroundColor: location.pathname === item.path ? "var(--red-accent)" : "transparent"
            }}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      <div style={styles.footer}>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          <LogOut size={20} /> Sair do Painel
        </button>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    backgroundColor: "var(--brown-dark)",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    boxShadow: "var(--shadow-md)",
    overflowY: "auto"
  },
  header: {
    padding: "24px",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    padding: "16px 0",
    flex: 1
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 24px",
    color: "#ffffff",
    fontFamily: "var(--font-secondary)",
    fontWeight: "500",
    transition: "background-color 0.2s"
  },
  footer: {
    padding: "16px",
    borderTop: "1px solid rgba(255,255,255,0.1)"
  },
  logoutBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    backgroundColor: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#ffffff",
    borderRadius: "4px",
    cursor: "pointer",
    fontFamily: "var(--font-secondary)",
    fontSize: "1rem"
  }
};
