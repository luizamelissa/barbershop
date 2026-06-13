import Card from "../components/Card";
import { History as HistoryIcon, MapPin, Clock } from "lucide-react";

export default function History() {
  const pastAppointments = [
    { id: 1, service: "Corte Clássico", barber: "Carlos Machado", date: "15/05/2026", time: "14:00", status: "Concluído", price: "R$ 45,00" },
    { id: 2, service: "Barba Terapia", barber: "Roberto Almeida", date: "10/04/2026", time: "16:30", status: "Concluído", price: "R$ 35,00" },
    { id: 3, service: "Corte + Barba", barber: "Fernando Silva", date: "05/03/2026", time: "10:00", status: "Concluído", price: "R$ 70,00" }
  ];

  return (
    <div>
      <h1 className="mb-4">Histórico de Agendamentos</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {pastAppointments.map(app => (
          <Card key={app.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <div style={{ backgroundColor: "var(--bg-primary)", padding: "16px", borderRadius: "50%", color: "var(--text-secondary)" }}>
                <HistoryIcon size={24} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <h3 style={{ margin: 0, color: "var(--text-primary)" }}>{app.service}</h3>
                <div style={{ display: "flex", gap: "16px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={16} /> {app.date} às {app.time}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={16} /> {app.barber}</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ 
                display: "inline-block", 
                padding: "6px 16px", 
                borderRadius: "20px", 
                fontSize: "0.85rem",
                fontWeight: "bold",
                backgroundColor: "rgba(0, 61, 143, 0.1)",
                color: "var(--blue-dark)"
              }}>
                {app.status}
              </span>
              <p style={{ fontWeight: "bold", marginTop: "8px", fontSize: "1.1rem" }}>{app.price}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
