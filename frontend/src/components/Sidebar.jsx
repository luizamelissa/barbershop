import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Users, BarChart3, LogOut } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/barber/dashboard", name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/barber/appointments", name: "Agendamentos", icon: <CalendarDays size={20} /> },
    { path: "/barber/clients", name: "Clientes", icon: <Users size={20} /> },
    { path: "/barber/reports", name: "Relatórios", icon: <BarChart3 size={20} /> }
  ];

  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <h2 style={{ color: "var(--white)", margin: 0 }}>Atlas Admin</h2>
        <span style={{ fontSize: "0.8rem", color: "var(--gray-light)" }}>Área do Barbeiro</span>
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
        <Link to="/" style={styles.link}><LogOut size={20} /> Voltar ao Site</Link>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    backgroundColor: "var(--brown-dark)",
    color: "var(--white)",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0
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
    color: "var(--white)",
    fontFamily: "var(--font-secondary)",
    fontWeight: "500",
    transition: "background-color 0.2s"
  },
  footer: {
    padding: "16px 0",
    borderTop: "1px solid rgba(255,255,255,0.1)"
  }
};
