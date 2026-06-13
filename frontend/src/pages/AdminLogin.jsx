import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { Scissors } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [code, setCode] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (code) {
      const mockAdmin = {
        role: "admin",
        firstName: "Admin",
      };
      login(mockAdmin);
      navigate("/barber/dashboard");
    }
  };

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 200px)", padding: "40px 20px" }}>
      <Card style={{ width: "100%", maxWidth: "400px", borderTop: "4px solid var(--blue-dark)" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Scissors size={48} color="var(--blue-dark)" style={{ marginBottom: "8px" }} />
          <h2 className="text-brand">Acesso Administrativo</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Área exclusiva para barbeiros e gestão</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <Input 
            label="Código de Acesso / E-mail" 
            type="text" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required 
          />
          <Input 
            label="Senha" 
            type="password" 
            required 
          />
          
          <Button type="submit" style={{ width: "100%", marginTop: "16px", backgroundColor: "var(--blue-dark)" }}>Acessar Painel</Button>
        </form>
      </Card>
    </div>
  );
}
