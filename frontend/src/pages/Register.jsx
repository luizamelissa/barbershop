import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Register mock
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <Navbar />
      <div className="container" style={{ display: "flex", justifyContent: "center", paddingTop: "60px", paddingBottom: "60px" }}>
        <Card style={{ width: "100%", maxWidth: "500px" }}>
          <h2 className="text-center mb-4">Crie sua Conta</h2>
          
          <form onSubmit={handleRegister}>
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}><Input label="Nome" required /></div>
              <div style={{ flex: 1 }}><Input label="Sobrenome" required /></div>
            </div>
            
            <Input label="Telefone" type="tel" placeholder="(00) 00000-0000" required />
            <Input label="E-mail" type="email" placeholder="seu@email.com" required />
            <Input label="Senha" type="password" placeholder="********" required />
            <Input label="Confirmar Senha" type="password" placeholder="********" required />
            
            <Button type="submit" style={{ width: "100%", marginTop: "16px" }}>Cadastrar</Button>
          </form>

          <p className="text-center mt-4">
            Já tem uma conta? <Link to="/login" style={{ fontWeight: "bold" }}>Faça Login</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
