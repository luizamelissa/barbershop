import { Link, useNavigate } from "react-router-dom";
import { Scissors, Sun, Moon, LogIn, UserPlus } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <div className="container" style={styles.navContainer}>
        <Link to="/" style={styles.logo}>
          <Scissors size={28} />
          <span>Barbearia Atlas</span>
        </Link>
        
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Início</Link>
          <a href="#sobre" style={styles.link}>Sobre Nós</a>
          <a href="#localizacao" style={styles.link}>Localização</a>
          
          <button onClick={toggleTheme} style={styles.iconBtn} aria-label="Toggle theme">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Link to={user.role === 'admin' ? "/barber/dashboard" : "/schedule"} style={styles.link}>
                Minha Área
              </Link>
              <button onClick={handleLogout} className="btn-secondary" style={{ padding: "6px 12px", fontSize: "0.9rem", color: "var(--white)", borderColor: "var(--white)" }}>
                Sair
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "12px" }}>
              <Link to="/login" style={{ ...styles.link, display: "flex", alignItems: "center", gap: "6px" }}>
                <LogIn size={18} /> Entrar
              </Link>
              <Link to="/register" className="btn-primary" style={{ padding: "8px 16px", fontSize: "0.9rem", backgroundColor: "var(--red-accent)", border: "none" }}>
                <UserPlus size={18} /> Cadastro
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "var(--blue-dark)",
    padding: "16px 0",
    color: "#ffffff",
    boxShadow: "var(--shadow-md)",
    position: "sticky",
    top: 0,
    zIndex: 100
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
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "24px"
  },
  link: {
    color: "#ffffff",
    fontFamily: "var(--font-secondary)",
    fontWeight: "500",
    transition: "color 0.2s",
    cursor: "pointer"
  },
  iconBtn: {
    background: "none",
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};
