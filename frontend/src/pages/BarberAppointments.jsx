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
              <th style={{ padding: "16px" }}>Barbeiro</th>
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
                <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{app.barber}</td>
                <td style={{ padding: "16px", fontWeight: "bold", color: "var(--red-accent)" }}>{app.date} às {app.time}</td>
                <td style={{ padding: "16px" }}>
                  <span style={{ 
                    padding: "4px 12px", 
                    borderRadius: "12px", 
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    backgroundColor: app.status === "Confirmado" ? "rgba(6, 95, 70, 0.1)" : app.status === "Concluído" ? "rgba(0,0,255,0.1)" : "rgba(146, 64, 14, 0.1)",
                    color: app.status === "Confirmado" ? "#065f46" : app.status === "Concluído" ? "var(--blue-dark)" : "#92400e"
                  }}>
                    {app.status}
                  </span>
                </td>
                <td style={{ padding: "16px", display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                  {app.status === "Confirmado" && (
                    <Button style={{ padding: "4px 8px", fontSize: "0.8rem", backgroundColor: "green" }} onClick={() => changeStatus(app.id, "Concluído")}>Marcar Concluído</Button>
                  )}
                  {app.status !== "Cancelado" && (
                     <Button variant="secondary" style={{ padding: "4px 8px", fontSize: "0.8rem", color: "red", borderColor: "red" }} onClick={() => changeStatus(app.id, "Cancelado")}>Cancelar</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
