import { Link } from "react-router-dom";
import { Scissors, User, LogIn, Calendar } from "lucide-react";

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div className="container" style={styles.navContainer}>
        <Link to="/" style={styles.logo}>
          <Scissors size={28} />
          <span>Atlas Barbearia</span>
        </Link>
        
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Início</Link>
          <Link to="/schedule" style={styles.link}><Calendar size={18} /> Agendar</Link>
          <Link to="/profile" style={styles.link}><User size={18} /> Perfil</Link>
          <Link to="/login" className="btn-primary" style={{ padding: "8px 16px", fontSize: "0.9rem" }}>
            <LogIn size={18} /> Entrar
          </Link>
          <Link to="/barber/dashboard" style={{...styles.link, color: 'var(--gray-light)', fontSize: '0.8rem'}}>Área do Barbeiro</Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "var(--blue-dark)",
    padding: "16px 0",
    color: "var(--white)",
    boxShadow: "var(--shadow-md)"
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontFamily: "var(--font-primary)",
    fontSize: "1.5rem",
    color: "var(--white)",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "24px"
  },
  link: {
    color: "var(--white)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "var(--font-secondary)",
    fontWeight: "500",
    transition: "color 0.2s"
  }
};
