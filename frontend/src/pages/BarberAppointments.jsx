import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { getStorageData, setStorageData } from "../services/storage";

export default function BarberAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(getStorageData("atlas_appointments") || []);
  }, []);

  const changeStatus = (id, newStatus) => {
    const updated = appointments.map(app => app.id === id ? { ...app, status: newStatus } : app);
    setAppointments(updated);
    setStorageData("atlas_appointments", updated);
  };

  const handleDelete = (id) => {
    if(window.confirm("Apagar agendamento definitivamente?")) {
      const updated = appointments.filter(app => app.id !== id);
      setAppointments(updated);
      setStorageData("atlas_appointments", updated);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ margin: 0 }}>Agendamentos</h1>
      </div>

      <Card style={{ padding: "0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
            <tr>
              <th style={{ padding: "16px" }}>Cliente</th>
              <th style={{ padding: "16px" }}>Serviço</th>
              <th style={{ padding: "16px" }}>Pagamento</th>
              <th style={{ padding: "16px" }}>Data / Hora</th>
              <th style={{ padding: "16px" }}>Status</th>
              <th style={{ padding: "16px", textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 && (
               <tr>
                 <td colSpan="6" style={{ padding: "24px", textAlign: "center", color: "var(--text-secondary)" }}>Nenhum agendamento no sistema.</td>
               </tr>
            )}
            {appointments.map((app) => (
              <tr key={app.id} style={{ borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--bg-surface)" }}>
                <td style={{ padding: "16px", fontWeight: "bold" }}>{app.clientName}</td>
                <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{app.serviceName}</td>
                <td style={{ padding: "16px", color: "var(--text-secondary)", textTransform: "capitalize" }}>
                  {app.paymentMethod === 'credito' ? 'Crédito' : app.paymentMethod === 'debito' ? 'Débito' : app.paymentMethod || 'N/A'}
                </td>
                <td style={{ padding: "16px", fontWeight: "bold", color: "var(--red-accent)" }}>{app.date} às {app.time}</td>
                <td style={{ padding: "16px" }}>
                  <span style={{ 
                    padding: "4px 12px", 
                    borderRadius: "12px", 
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    backgroundColor: app.status === "Confirmado" ? "var(--bg-status-success)" : app.status === "Concluído" ? "var(--bg-status-info)" : app.status === "Falta" ? "var(--bg-status-warning)" : "var(--bg-status-danger)",
                    color: app.status === "Confirmado" ? "var(--status-success)" : app.status === "Concluído" ? "var(--status-info)" : app.status === "Falta" ? "var(--status-warning)" : "var(--status-danger)"
                  }}>
                    {app.status}
                  </span>
                </td>
                <td style={{ padding: "16px", display: "flex", gap: "8px", justifyContent: "flex-end", flexWrap: "wrap" }}>
                  {app.status === "Confirmado" && (
                    <>
                      <Button style={{ padding: "4px 8px", fontSize: "0.8rem", backgroundColor: "var(--status-success)" }} onClick={() => changeStatus(app.id, "Concluído")}>Concluir</Button>
                      <Button variant="secondary" style={{ padding: "4px 8px", fontSize: "0.8rem", color: "var(--status-warning)", borderColor: "var(--status-warning)" }} onClick={() => changeStatus(app.id, "Falta")}>Falta</Button>
                    </>
                  )}
                  {app.status !== "Cancelado" && app.status !== "Concluído" && app.status !== "Falta" && (
                     <Button variant="secondary" style={{ padding: "4px 8px", fontSize: "0.8rem", color: "var(--status-danger)", borderColor: "var(--status-danger)" }} onClick={() => changeStatus(app.id, "Cancelado")}>Cancelar</Button>
                  )}
                  <Button variant="secondary" style={{ padding: "4px 8px", fontSize: "0.8rem", color: "var(--text-secondary)", borderColor: "var(--border-color)" }} onClick={() => handleDelete(app.id)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
