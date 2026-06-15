import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    
    try {
      await register(formData);
      alert("Cadastro realizado com sucesso! Faça login.");
      navigate("/login");
    } catch (error) {
  if (error.code === "auth/email-already-in-use") {
    alert("Esse e-mail já existe. Faça login.");
  } else {
    alert("Erro ao cadastrar");
  }
}

  };

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", padding: "60px 20px" }}>
      <Card style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4 text-brand">Crie sua Conta</h2>
        
        <form onSubmit={handleRegister}>
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <Input label="Nome" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div style={{ flex: 1 }}>
              <Input label="Sobrenome" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>
          
          <Input label="Telefone" name="phone" type="tel" placeholder="(00) 00000-0000" value={formData.phone} onChange={handleChange} required />
          <Input label="E-mail" name="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} required />
          <Input label="Senha" name="password" type="password" placeholder="********" value={formData.password} onChange={handleChange} required />
          <Input label="Confirmar Senha" name="confirmPassword" type="password" placeholder="********" value={formData.confirmPassword} onChange={handleChange} required />
          
          <Button type="submit" style={{ width: "100%", marginTop: "16px" }}>Concluir Cadastro</Button>
        </form>

        <p className="text-center mt-4" style={{ color: "var(--text-secondary)" }}>
          Já tem uma conta? <Link to="/login" style={{ fontWeight: "bold", color: "var(--red-accent)" }}>Faça Login</Link>
        </p>
      </Card>
    </div>
  );
}
