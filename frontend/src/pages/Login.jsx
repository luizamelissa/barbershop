import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { Scissors } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("cliente"); // 'cliente' | 'admin'

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const loggedUser = await login(email, password);
        
        if (loggedUser) {
          if (loggedUser.role === "admin") {
            navigate("/barber/dashboard");
          } else {
            navigate("/client/dashboard");
          }
        }
      } catch (error) {
        console.error("Login failed", error);
        alert("Credenciais inválidas ou erro no servidor.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const loggedUser = await loginWithGoogle();
      if (loggedUser) {
        navigate("/client/dashboard");
      }
    } catch (error) {
      console.error("Google Login failed", error);
      alert("Falha no login com Google.");
    }
  };

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 200px)", padding: "40px 20px" }}>
      <Card style={{ width: "100%", maxWidth: "400px", borderTop: loginType === 'admin' ? "4px solid var(--brand-blue)" : "none" }}>
        
        {loginType === 'admin' && (
           <div style={{ textAlign: "center", marginBottom: "16px" }}>
             <Scissors size={32} color="var(--brand-blue)" />
           </div>
        )}

        <h2 className="text-center mb-4 text-brand">
          {loginType === 'cliente' ? 'Acesse sua Conta' : 'Acesso Administrativo'}
        </h2>
        
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          <button 
            type="button"
            onClick={() => setLoginType("cliente")}
            style={{ 
              flex: 1, padding: "8px", border: "none", cursor: "pointer", 
              backgroundColor: loginType === "cliente" ? "var(--brand-red)" : "var(--bg-primary)",
              color: loginType === "cliente" ? "#fff" : "var(--text-secondary)",
              borderRadius: "4px"
            }}
          >
            Cliente
          </button>
          <button 
            type="button"
            onClick={() => setLoginType("admin")}
            style={{ 
              flex: 1, padding: "8px", border: "none", cursor: "pointer", 
              backgroundColor: loginType === "admin" ? "var(--brand-blue)" : "var(--bg-primary)",
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
            placeholder={loginType === 'admin' ? "admin@atlas.com" : "seu@email.com"} 
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
          
          <Button type="submit" style={{ width: "100%", marginTop: "16px", backgroundColor: loginType === 'admin' ? "var(--brand-blue)" : "var(--brand-red)", border: "none" }}>
            Entrar
          </Button>
        </form>

        {loginType === 'cliente' && (
          <>
            <div style={{ margin: "24px 0", textAlign: "center", position: "relative" }}>
              <div style={{ position: "absolute", top: "50%", left: "0", right: "0", borderTop: "1px solid var(--border-color)", zIndex: 1 }}></div>
              <span style={{ backgroundColor: "var(--bg-surface)", padding: "0 10px", color: "var(--text-secondary)", position: "relative", zIndex: 2 }}>ou</span>
            </div>

            <Button type="button" variant="secondary" style={{ width: "100%", display: "flex", justifyContent: "center" }} onClick={handleGoogleLogin}>
              Entrar com Google
            </Button>

            <p className="text-center mt-4" style={{ color: "var(--text-secondary)" }}>
              Ainda não tem conta? <Link to="/register" style={{ fontWeight: "bold", color: "var(--brand-red)" }}>Cadastre-se</Link>
            </p>
          </>
        )}

      </Card>
    </div>
  );
}
