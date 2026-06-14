import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, LogIn, UserPlus } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import logo1fundo from "../assets/logo1fundo.png";
import logo2fundo from "../assets/logo2fundo.png";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleScroll = (id) => {
    // Se não estiver na home, navega pra home primeiro
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const logoSrc = theme === "dark" ? logo2fundo : logo1fundo;

  return (
    <nav style={styles.navbar}>
      <div className="container" style={styles.navContainer}>
        <div 
          onClick={() => handleScroll('inicio')} 
          style={{...styles.logo, cursor: 'pointer'}}
        >
          <img src={logoSrc} alt="Atlas Logo" style={{ height: "40px", objectFit: "contain" }} />
          <span>Atlas</span>
        </div>
        
        <div style={styles.links}>
          <button onClick={() => handleScroll('inicio')} style={styles.linkBtn}>Início</button>
          <button onClick={() => handleScroll('sobre')} style={styles.linkBtn}>Sobre Nós</button>
          <button onClick={() => handleScroll('localizacao')} style={styles.linkBtn}>Localização</button>
          
          <button onClick={toggleTheme} style={styles.iconBtn} aria-label="Toggle theme">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Link to={user.role === 'admin' ? "/barber/dashboard" : "/client/dashboard"} style={styles.linkBtn}>
                Minha Área
              </Link>
              <button onClick={handleLogout} className="btn-secondary" style={{ padding: "6px 12px", fontSize: "0.9rem", color: "var(--white)", borderColor: "var(--white)" }}>
                Sair
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "12px" }}>
              <Link to="/login" style={{ ...styles.linkBtn, display: "flex", alignItems: "center", gap: "6px" }}>
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
    backgroundColor: "var(--bg-navbar)",
    padding: "16px 0",
    color: "var(--text-navbar)",
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
    color: "var(--text-navbar)",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "24px"
  },
  linkBtn: {
    color: "var(--text-navbar)",
    fontFamily: "var(--font-secondary)",
    fontWeight: "500",
    transition: "color 0.2s",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontSize: "1rem",
    textDecoration: "none"
  },
  iconBtn: {
    background: "none",
    border: "none",
    color: "var(--text-navbar)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};
