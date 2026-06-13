import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Users, CalendarCheck, TrendingUp, DollarSign, Activity } from "lucide-react";
import { getStorageData } from "../services/storage";

export default function BarberDashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    appointmentsToday: 0,
    servicesMonth: 0,
    revenue: 0
  });
  const [recentApps, setRecentApps] = useState([]);

  useEffect(() => {
    const clients = (getStorageData("atlas_users") || []).filter(u => u.role === "cliente");
    const apps = getStorageData("atlas_appointments") || [];
    const txs = getStorageData("atlas_transactions") || [];

    const todayStr = new Date().toISOString().split('T')[0];
    const todayApps = apps.filter(a => a.date === todayStr);

    const revenue = txs.reduce((acc, tx) => {
      if (tx.type === "entrada") {
        const val = parseFloat(tx.value.replace("R$ ", "").replace(",", "."));
        return acc + val;
      }
      return acc;
    }, 0);

    setStats({
      clients: clients.length,
      appointmentsToday: todayApps.length,
      servicesMonth: apps.length,
      revenue: revenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    });

    // Pega os ultimos 3 agendamentos do dia (ou os proximos)
    setRecentApps(apps.slice(-3).reverse());

  }, []);

  const statCards = [
    { title: "Total Clientes", value: stats.clients, change: "", icon: <Users size={28} color="var(--blue-dark)" /> },
    { title: "Agendamentos Hoje", value: stats.appointmentsToday, change: "", icon: <CalendarCheck size={28} color="var(--red-accent)" /> },
    { title: "Serviços Cadastrados", value: stats.servicesMonth, change: "", icon: <TrendingUp size={28} color="var(--blue-dark)" /> },
    { title: "Faturamento Bruto", value: stats.revenue, change: "", icon: <DollarSign size={28} color="green" /> },
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
        {statCards.map((stat, idx) => (
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
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        <Card>
          <h2 style={{ marginBottom: "24px" }}>Fluxo de Clientes (Mock Semanal)</h2>
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
          <h2 style={{ marginBottom: "24px" }}>Últimos Registrados</h2>
          {recentApps.length === 0 ? (
            <p style={{ color: "var(--text-secondary)" }}>Nenhum agendamento recente.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {recentApps.map((app, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", alignItems: "center", borderBottom: i !== recentApps.length - 1 ? "1px solid var(--border-color)" : "none", paddingBottom: i !== recentApps.length - 1 ? "12px" : "0" }}>
                  <div style={{ fontWeight: "bold", color: "var(--red-accent)" }}>{app.time}</div>
                  <div>
                    <div style={{ fontWeight: "bold", color: "var(--text-primary)" }}>{app.clientName}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{app.serviceName}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
