import { Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { Calendar, Clock, MapPin, CreditCard, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getStorageData, setStorageData } from "../services/storage";
import { useState, useEffect } from "react";

export default function ClientDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const allApps = getStorageData("atlas_appointments") || [];
    // Filtra apenas agendamentos do cliente atual que NÃO estejam concluídos/cancelados
    const userApps = allApps.filter(app => app.clientId === user?.id && app.status === "Confirmado");
    setAppointments(userApps);
  }, [user]);

  const handleCancel = (appId) => {
    if (window.confirm("Deseja realmente cancelar este agendamento?")) {
      const allApps = getStorageData("atlas_appointments") || [];
      const updatedApps = allApps.map(app => 
        app.id === appId ? { ...app, status: "Cancelado" } : app
      );
      setStorageData("atlas_appointments", updatedApps);
      setAppointments(appointments.filter(app => app.id !== appId));
    }
  };

  return (
    <div>
      <h1 className="mb-4">Meus Agendamentos</h1>
      
      {appointments.length === 0 ? (
        <Card style={{ textAlign: "center", padding: "60px 20px" }}>
          <Calendar size={64} color="var(--border-color)" style={{ marginBottom: "16px" }} />
          <h2 style={{ marginBottom: "16px" }}>Você ainda não possui agendamentos futuros</h2>
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
          {appointments.map(app => {
             // Extract day and month from YYYY-MM-DD
             const [y, m, d] = app.date.split("-");
             const months = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
             const monthStr = months[parseInt(m) - 1];

             return (
              <Card key={app.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                <div style={{ display: "flex", gap: "24px" }}>
                  <div style={{ backgroundColor: "var(--red-accent)", color: "#fff", padding: "16px", borderRadius: "8px", textAlign: "center", minWidth: "90px" }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{d}</div>
                    <div style={{ textTransform: "uppercase", fontSize: "0.9rem" }}>{monthStr}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h3 style={{ marginBottom: "8px", color: "var(--blue-dark)" }} className="text-brand">{app.serviceName}</h3>
                    <div style={{ display: "flex", gap: "16px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={16} /> {app.time}</span>
                      {app.barberName && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><User size={16} /> Com {app.barberName}</span>}
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", textTransform: "capitalize" }}><CreditCard size={16} /> Pagamento: {app.paymentMethod === 'credito' ? 'Crédito' : app.paymentMethod === 'debito' ? 'Débito' : app.paymentMethod || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Button variant="secondary" style={{ color: "var(--red-accent)", borderColor: "var(--red-accent)" }} onClick={() => handleCancel(app.id)}>
                    Cancelar
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
