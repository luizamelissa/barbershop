import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Login mock
    navigate("/profile");
  };

  const handleGoogleLogin = () => {
    navigate("/profile");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <Navbar />
      <div className="container" style={{ display: "flex", justifyContent: "center", paddingTop: "60px" }}>
        <Card style={{ width: "100%", maxWidth: "400px" }}>
          <h2 className="text-center mb-4">Acesse sua Conta</h2>
          
          <form onSubmit={handleLogin}>
            <Input label="E-mail" type="email" placeholder="seu@email.com" required />
            <Input label="Senha" type="password" placeholder="********" required />
            
            <Button type="submit" style={{ width: "100%", marginTop: "16px" }}>Entrar</Button>
          </form>

          <div style={{ margin: "24px 0", textAlign: "center", color: "var(--text-secondary)", position: "relative" }}>
            <span>ou</span>
          </div>

          <Button variant="secondary" style={{ width: "100%" }} onClick={handleGoogleLogin}>
            Entrar com Google
          </Button>

          <p className="text-center mt-4">
            Ainda não tem conta? <Link to="/register" style={{ fontWeight: "bold" }}>Cadastre-se</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
