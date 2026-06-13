import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { Users, CalendarCheck, TrendingUp, DollarSign } from "lucide-react";

export default function BarberDashboard() {
  const stats = [
    { title: "Total Clientes", value: "142", icon: <Users size={32} color="var(--blue-dark)" /> },
    { title: "Agendamentos Hoje", value: "12", icon: <CalendarCheck size={32} color="var(--red-accent)" /> },
    { title: "Serviços Concluídos", value: "854", icon: <TrendingUp size={32} color="var(--brown-dark)" /> },
    { title: "Faturamento Estimado", value: "R$ 4.250", icon: <DollarSign size={32} color="green" /> },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", flex: 1, padding: "40px" }}>
        <h1 style={{ marginBottom: "32px" }}>Dashboard do Barbeiro</h1>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {stats.map((stat, idx) => (
            <Card key={idx} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ padding: "16px", backgroundColor: "var(--gray-light)", borderRadius: "50%" }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.9rem", textTransform: "uppercase" }}>
                  {stat.title}
                </p>
                <h2 style={{ margin: 0, fontSize: "1.8rem" }}>{stat.value}</h2>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-4">
          <Card>
            <h2>Resumo Diário</h2>
            <p style={{ color: "var(--text-secondary)" }}>Nenhum gráfico disponível (mock visual).</p>
            <div style={{ height: "200px", backgroundColor: "var(--gray-light)", borderRadius: "8px", marginTop: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span>Espaço para gráfico de faturamento</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
