import { Link, useLocation, useNavigate } from "react-router-dom";
import { Calendar, History, User, PlusCircle, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ClientSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = [
    { path: "/client/dashboard", name: "Meus Agendamentos", icon: <Calendar size={20} /> },
    { path: "/client/new", name: "Novo Agendamento", icon: <PlusCircle size={20} /> },
    { path: "/client/history", name: "Histórico", icon: <History size={20} /> },
    { path: "/client/profile", name: "Meu Perfil", icon: <User size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <h2 style={{ color: "#ffffff", margin: 0 }}>Atlas</h2>
        <span style={{ fontSize: "0.85rem", color: "#cccccc" }}>Olá, {user?.firstName || "Cliente"}</span>
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
          <LogOut size={20} /> Sair da Conta
        </button>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    backgroundColor: "var(--blue-dark)",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    boxShadow: "var(--shadow-md)"
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
    padding: "14px 24px",
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
