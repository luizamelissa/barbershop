import { Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function ClientDashboard() {
  // Simulando dados do localStorage
  const mockAppointments = [
    { id: 1, service: "Corte Clássico", barber: "Carlos", date: "25/06/2026", time: "14:00" },
  ];

  return (
    <div>
      <h1 className="mb-4">Meus Agendamentos</h1>
      
      {mockAppointments.length === 0 ? (
        <Card style={{ textAlign: "center", padding: "60px 20px" }}>
          <Calendar size={64} color="var(--border-color)" style={{ marginBottom: "16px" }} />
          <h2 style={{ marginBottom: "16px" }}>Você ainda não possui agendamentos</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
            Agende agora mesmo um horário com um de nossos profissionais.
          </p>
          <Link to="/client/new">
            <Button>Novo Agendamento</Button>
          </Link>
        </Card>
      ) : (
        <div style={{ display: "grid", gap: "24px" }}>
          <Link to="/client/new" style={{ alignSelf: "flex-start" }}>
            <Button>+ Novo Agendamento</Button>
          </Link>
          
          <h2 style={{ fontSize: "1.2rem", marginTop: "16px" }}>Próximos Horários</h2>
          {mockAppointments.map(app => (
            <Card key={app.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "24px" }}>
                <div style={{ backgroundColor: "var(--red-accent)", color: "#fff", padding: "16px", borderRadius: "8px", textAlign: "center", minWidth: "90px" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>25</div>
                  <div style={{ textTransform: "uppercase", fontSize: "0.9rem" }}>JUN</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <h3 style={{ marginBottom: "8px", color: "var(--blue-dark)" }} className="text-brand">{app.service}</h3>
                  <div style={{ display: "flex", gap: "16px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={16} /> {app.time}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={16} /> Com {app.barber}</span>
                  </div>
                </div>
              </div>
              <div>
                <Button variant="secondary" style={{ color: "var(--red-accent)", borderColor: "var(--red-accent)" }}>Cancelar</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
