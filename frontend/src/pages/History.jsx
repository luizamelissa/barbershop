import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function History() {
  const appointments = [
    { id: 1, date: "20/06/2026", time: "14:00", service: "Corte Clássico", barber: "Carlos Machado", status: "Agendado", price: "R$ 45,00" },
    { id: 2, date: "10/05/2026", time: "15:30", service: "Corte + Barba", barber: "Roberto Almeida", status: "Concluído", price: "R$ 70,00" },
    { id: 3, date: "15/04/2026", time: "10:00", service: "Barba Terapia", barber: "Carlos Machado", status: "Concluído", price: "R$ 35,00" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <Navbar />
      <div className="container" style={{ padding: "40px 20px" }}>
        <h2 className="mb-4">Histórico de Agendamentos</h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {appointments.map(app => (
            <Card key={app.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0 }}>{app.service}</h3>
                <p style={{ color: "var(--text-secondary)", margin: 0 }}>Com {app.barber}</p>
                <p style={{ fontSize: "0.9rem", marginTop: "8px" }}><strong>Data:</strong> {app.date} às {app.time}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ 
                  display: "inline-block", 
                  padding: "4px 12px", 
                  borderRadius: "20px", 
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  backgroundColor: app.status === "Agendado" ? "rgba(215, 38, 13, 0.1)" : "rgba(0, 61, 143, 0.1)",
                  color: app.status === "Agendado" ? "var(--red-accent)" : "var(--blue-dark)"
                }}>
                  {app.status}
                </span>
                <p style={{ fontWeight: "bold", marginTop: "8px" }}>{app.price}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
