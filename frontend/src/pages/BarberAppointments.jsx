import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Button from "../components/Button";

export default function BarberAppointments() {
  const appointments = [
    { id: 1, client: "João Silva", service: "Corte Clássico", date: "Hoje", time: "14:00", status: "Confirmado" },
    { id: 2, client: "Pedro Henrique", service: "Corte + Barba", date: "Hoje", time: "15:30", status: "Pendente" },
    { id: 3, client: "Lucas Mendes", service: "Barba Terapia", date: "Hoje", time: "17:00", status: "Confirmado" },
    { id: 4, client: "Marcos Paulo", service: "Pigmentação", date: "Amanhã", time: "09:00", status: "Pendente" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", flex: 1, padding: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <h1 style={{ margin: 0 }}>Agendamentos</h1>
          <Button>Novo Agendamento</Button>
        </div>

        <Card style={{ padding: "0", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead style={{ backgroundColor: "var(--blue-dark)", color: "var(--white)" }}>
              <tr>
                <th style={{ padding: "16px" }}>Cliente</th>
                <th style={{ padding: "16px" }}>Serviço</th>
                <th style={{ padding: "16px" }}>Data</th>
                <th style={{ padding: "16px" }}>Horário</th>
                <th style={{ padding: "16px" }}>Status</th>
                <th style={{ padding: "16px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app, index) => (
                <tr key={app.id} style={{ borderBottom: "1px solid var(--border)", backgroundColor: index % 2 === 0 ? "var(--white)" : "var(--gray-light)" }}>
                  <td style={{ padding: "16px", fontWeight: "bold" }}>{app.client}</td>
                  <td style={{ padding: "16px" }}>{app.service}</td>
                  <td style={{ padding: "16px" }}>{app.date}</td>
                  <td style={{ padding: "16px", fontWeight: "bold", color: "var(--red-accent)" }}>{app.time}</td>
                  <td style={{ padding: "16px" }}>
                    <span style={{ 
                      padding: "4px 12px", 
                      borderRadius: "12px", 
                      fontSize: "0.85rem",
                      backgroundColor: app.status === "Confirmado" ? "#d1fae5" : "#fef3c7",
                      color: app.status === "Confirmado" ? "#065f46" : "#92400e"
                    }}>
                      {app.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px", display: "flex", gap: "8px" }}>
                    <Button variant="secondary" style={{ padding: "4px 8px", fontSize: "0.8rem" }}>Editar</Button>
                    {app.status === "Pendente" && (
                      <Button style={{ padding: "4px 8px", fontSize: "0.8rem" }}>Confirmar</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
