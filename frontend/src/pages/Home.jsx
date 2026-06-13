import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Card from "../components/Card";
import { Scissors, CheckCircle } from "lucide-react";

export default function Home() {
  const services = [
    { id: 1, name: "Corte Clássico", price: "R$ 45,00", time: "40 min" },
    { id: 2, name: "Barba Terapia", price: "R$ 35,00", time: "30 min" },
    { id: 3, name: "Corte + Barba", price: "R$ 70,00", time: "1h 10 min" },
    { id: 4, name: "Pigmentação", price: "R$ 50,00", time: "45 min" },
  ];

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />
      
      <div className="page-header">
        <div className="container">
          <Scissors size={48} color="var(--red-accent)" style={{ marginBottom: "16px" }} />
          <h1>Bem-vindo à Atlas Barbearia</h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
            Tradição, estilo e excelência no seu atendimento. Agende seu horário conosco.
          </p>
          <div className="mt-4">
            <Link to="/schedule">
              <Button>Agendar Agora</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mb-4">
        <h2 className="text-center mb-4">Nossos Serviços</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
          {services.map(service => (
            <Card key={service.id}>
              <h3 style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle size={20} color="var(--red-accent)" />
                {service.name}
              </h3>
              <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--blue-dark)" }}>
                {service.price}
              </p>
              <p style={{ color: "var(--text-secondary)" }}>
                Duração aprox: {service.time}
              </p>
              <Link to="/schedule" style={{ display: "block", marginTop: "16px" }}>
                <Button variant="secondary" style={{ width: "100%" }}>Agendar</Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
