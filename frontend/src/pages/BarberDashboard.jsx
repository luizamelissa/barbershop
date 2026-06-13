import Card from "../components/Card";
import { Users, CalendarCheck, TrendingUp, DollarSign, Activity } from "lucide-react";

export default function BarberDashboard() {
  const stats = [
    { title: "Total Clientes", value: "342", change: "+12%", icon: <Users size={28} color="var(--blue-dark)" /> },
    { title: "Agendamentos Hoje", value: "18", change: "+4", icon: <CalendarCheck size={28} color="var(--red-accent)" /> },
    { title: "Serviços no Mês", value: "256", change: "+8%", icon: <TrendingUp size={28} color="var(--blue-dark)" /> },
    { title: "Faturamento (Mês)", value: "R$ 12.450", change: "+15%", icon: <DollarSign size={28} color="green" /> },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)" }}>
          <Activity size={20} /> Atualizado agora
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        {stats.map((stat, idx) => (
          <Card key={idx} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ padding: "16px", backgroundColor: "var(--bg-primary)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.85rem", textTransform: "uppercase", fontWeight: "bold" }}>
                {stat.title}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <h2 style={{ margin: 0, fontSize: "1.8rem" }}>{stat.value}</h2>
                <span style={{ color: stat.change.includes("+") ? "green" : "red", fontSize: "0.85rem", fontWeight: "bold" }}>
                  {stat.change}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        <Card>
          <h2 style={{ marginBottom: "24px" }}>Fluxo de Clientes (Semanal)</h2>
          <div style={{ height: "300px", display: "flex", alignItems: "flex-end", gap: "16px", padding: "20px 0", borderBottom: "1px solid var(--border-color)" }}>
            {[40, 60, 30, 80, 100, 120, 50].map((h, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: "var(--blue-dark)", height: `${h}%`, borderRadius: "4px 4px 0 0", position: "relative", transition: "height 0.3s" }}>
                <span style={{ position: "absolute", top: "-24px", left: "50%", transform: "translateX(-50%)", fontSize: "0.8rem", color: "var(--text-secondary)" }}>{h}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
          </div>
        </Card>

        <Card>
          <h2 style={{ marginBottom: "24px" }}>Próximos Hoje</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { time: "14:00", name: "Lucas Moura", service: "Corte Clássico" },
              { time: "14:45", name: "Pedro Silva", service: "Barba Terapia" },
              { time: "15:30", name: "Marcos Paulo", service: "Corte + Barba" }
            ].map((app, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", alignItems: "center", borderBottom: i !== 2 ? "1px solid var(--border-color)" : "none", paddingBottom: i !== 2 ? "12px" : "0" }}>
                <div style={{ fontWeight: "bold", color: "var(--red-accent)" }}>{app.time}</div>
                <div>
                  <div style={{ fontWeight: "bold", color: "var(--text-primary)" }}>{app.name}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{app.service}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
