import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simular validação
    if (email && password) {
      // Mock de usuário
      const mockUser = {
        email,
        role: "cliente",
        firstName: email.split("@")[0],
      };
      login(mockUser);
      navigate("/client/dashboard");
    }
  };

  const handleGoogleLogin = () => {
    const mockUser = {
      email: "googleuser@gmail.com",
      role: "cliente",
      firstName: "GoogleUser",
    };
    login(mockUser);
    navigate("/client/dashboard");
  };

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 200px)", padding: "40px 20px" }}>
      <Card style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4 text-brand">Acesse sua Conta</h2>
        
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
          
          <Button type="submit" style={{ width: "100%", marginTop: "16px" }}>Entrar</Button>
        </form>

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

        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <Link to="/admin-login" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Acesso Restrito (Barbeiros)</Link>
        </div>
      </Card>
    </div>
  );
}
