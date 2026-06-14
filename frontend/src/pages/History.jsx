import Card from "../components/Card";
import { History as HistoryIcon, MapPin, Clock, Star, CreditCard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getStorageData, setStorageData } from "../services/storage";
import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function History() {
  const { user } = useAuth();
  const [pastApps, setPastApps] = useState([]);
  const [ratingTarget, setRatingTarget] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    const allApps = getStorageData("atlas_appointments") || [];
    const userApps = allApps.filter(app => app.clientId === user?.id && (app.status === "Concluído" || app.status === "Avaliado"));
    setPastApps(userApps);
  }, [user]);

  const handleRating = (appId) => {
    const allApps = getStorageData("atlas_appointments") || [];
    const appIndex = allApps.findIndex(a => a.id === appId);
    if (appIndex > -1) {
      allApps[appIndex].status = "Avaliado";
      setStorageData("atlas_appointments", allApps);

      const allReviews = getStorageData("atlas_reviews") || [];
      const newReview = {
        id: Date.now().toString(),
        client: user.firstName,
        rating: ratingValue,
        comment: "Avaliação rápida pelo painel do cliente.",
        date: new Date().toLocaleDateString("pt-BR")
      };
      setStorageData("atlas_reviews", [newReview, ...allReviews]);

      setPastApps(pastApps.map(a => a.id === appId ? { ...a, status: "Avaliado" } : a));
      setRatingTarget(null);
      setRatingValue(0);
      alert("Avaliação enviada!");
    }
  };

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
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", textTransform: "capitalize" }}><CreditCard size={16} /> Pagamento: {app.paymentMethod === 'credito' ? 'Crédito' : app.paymentMethod === 'debito' ? 'Débito' : app.paymentMethod || 'N/A'}</span>
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
                  backgroundColor: "var(--bg-status-info)",
                  color: "var(--status-info)"
                }}>
                  {app.status}
                </span>
                
                {app.status === "Concluído" && ratingTarget !== app.id && (
                  <button onClick={() => setRatingTarget(app.id)} style={{ background: "none", border: "none", color: "var(--brand-red)", cursor: "pointer", fontSize: "0.9rem", textDecoration: "underline", marginTop: "8px" }}>
                    Avaliar
                  </button>
                )}

                {ratingTarget === app.id && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                     <div style={{ display: "flex", gap: "2px" }}>
                       {[1, 2, 3, 4, 5].map(star => (
                         <Star 
                           key={star} 
                           size={20} 
                           fill={ratingValue >= star ? "#fbbf24" : "none"} 
                           color={ratingValue >= star ? "#fbbf24" : "var(--border-color)"}
                           onClick={() => setRatingValue(star)}
                           style={{ cursor: "pointer" }}
                         />
                       ))}
                     </div>
                     <Button style={{ padding: "4px 8px", fontSize: "0.8rem" }} onClick={() => handleRating(app.id)} disabled={ratingValue === 0}>Salvar</Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
