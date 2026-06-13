import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { Scissors } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("cliente"); // 'cliente' | 'admin'

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const success = login(email, password, loginType);
      
      if (success) {
        if (loginType === "admin") {
          navigate("/barber/dashboard");
        } else {
          navigate("/client/dashboard");
        }
      } else {
        alert("Credenciais inválidas para o tipo selecionado.");
      }
    }
  };

  const handleGoogleLogin = () => {
    login("google@mock.com", "mock123", "cliente");
    navigate("/client/dashboard");
  };

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 200px)", padding: "40px 20px" }}>
      <Card style={{ width: "100%", maxWidth: "400px", borderTop: loginType === 'admin' ? "4px solid var(--blue-dark)" : "none" }}>
        
        {loginType === 'admin' && (
           <div style={{ textAlign: "center", marginBottom: "16px" }}>
             <Scissors size={32} color="var(--blue-dark)" />
           </div>
        )}

        <h2 className="text-center mb-4 text-brand">
          {loginType === 'cliente' ? 'Acesse sua Conta' : 'Acesso Administrativo'}
        </h2>
        
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          <button 
            onClick={() => setLoginType("cliente")}
            style={{ 
              flex: 1, padding: "8px", border: "none", cursor: "pointer", 
              backgroundColor: loginType === "cliente" ? "var(--red-accent)" : "var(--bg-primary)",
              color: loginType === "cliente" ? "#fff" : "var(--text-secondary)",
              borderRadius: "4px"
            }}
          >
            Cliente
          </button>
          <button 
            onClick={() => setLoginType("admin")}
            style={{ 
              flex: 1, padding: "8px", border: "none", cursor: "pointer", 
              backgroundColor: loginType === "admin" ? "var(--blue-dark)" : "var(--bg-primary)",
              color: loginType === "admin" ? "#fff" : "var(--text-secondary)",
              borderRadius: "4px"
            }}
          >
            Barbeiro
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <Input 
            label="E-mail" 
            type="email" 
            placeholder="seu@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <Input 
            label="Senha" 
            type="password" 
            placeholder="********" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          
          <Button type="submit" style={{ width: "100%", marginTop: "16px", backgroundColor: loginType === 'admin' ? "var(--blue-dark)" : "var(--red-accent)" }}>
            Entrar
          </Button>
        </form>

        {loginType === 'cliente' && (
          <>
            <div style={{ margin: "24px 0", textAlign: "center", position: "relative" }}>
              <div style={{ position: "absolute", top: "50%", left: "0", right: "0", borderTop: "1px solid var(--border-color)", zIndex: 1 }}></div>
              <span style={{ backgroundColor: "var(--bg-surface)", padding: "0 10px", color: "var(--text-secondary)", position: "relative", zIndex: 2 }}>ou</span>
            </div>

            <Button variant="secondary" style={{ width: "100%", display: "flex", justifyContent: "center" }} onClick={handleGoogleLogin}>
              Entrar com Google
            </Button>

            <p className="text-center mt-4" style={{ color: "var(--text-secondary)" }}>
              Ainda não tem conta? <Link to="/register" style={{ fontWeight: "bold", color: "var(--red-accent)" }}>Cadastre-se</Link>
            </p>
          </>
        )}

      </Card>
    </div>
  );
}
