import Card from "../components/Card";
import { History as HistoryIcon, MapPin, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getStorageData, setStorageData } from "../services/storage";
import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function History() {
  const { user } = useAuth();
  const [pastApps, setPastApps] = useState([]);

  useEffect(() => {
    const allApps = getStorageData("atlas_appointments") || [];
    // Filtra apenas agendamentos do cliente concluídos
    const userApps = allApps.filter(app => app.clientId === user?.id && app.status === "Concluído");
    setPastApps(userApps);
  }, [user]);

  return (
    <div>
      <h1 className="mb-4">Histórico de Agendamentos</h1>
      
      {pastApps.length === 0 ? (
        <Card style={{ textAlign: "center", padding: "60px 20px" }}>
          <HistoryIcon size={64} color="var(--border-color)" style={{ marginBottom: "16px" }} />
          <h2 style={{ marginBottom: "16px" }}>Seu histórico está vazio</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Os agendamentos concluídos aparecerão aqui.
          </p>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {pastApps.map(app => (
            <Card key={app.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                <div style={{ backgroundColor: "var(--bg-primary)", padding: "16px", borderRadius: "50%", color: "var(--text-secondary)" }}>
                  <HistoryIcon size={24} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <h3 style={{ margin: 0, color: "var(--text-primary)" }}>{app.serviceName}</h3>
                  <div style={{ display: "flex", gap: "16px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={16} /> {app.date} às {app.time}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={16} /> {app.barber}</span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
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
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
