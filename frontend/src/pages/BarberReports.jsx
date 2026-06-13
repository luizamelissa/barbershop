import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getStorageData } from "../services/storage";

export default function BarberReports() {
  const [topServices, setTopServices] = useState([]);
  const [revenueStats, setRevenueStats] = useState([]);

  useEffect(() => {
    const apps = getStorageData("atlas_appointments") || [];
    const txs = getStorageData("atlas_transactions") || [];

    // Calculate Top Services
    const serviceCounts = {};
    apps.forEach(app => {
      serviceCounts[app.serviceName] = (serviceCounts[app.serviceName] || 0) + 1;
    });

    const totalApps = apps.length;
    const sortedServices = Object.keys(serviceCounts).map(name => ({
      name,
      count: serviceCounts[name],
      percent: totalApps > 0 ? Math.round((serviceCounts[name] / totalApps) * 100) : 0
    })).sort((a, b) => b.count - a.count);
    
    setTopServices(sortedServices);

    const revenueByMonth = {};
    txs.forEach(tx => {
      if (tx.type === "entrada") {
         const parts = tx.date.split("/");
         if (parts.length === 3) {
           const monthYear = `${parts[1]}/${parts[2]}`;
           const val = parseFloat(tx.value.replace("R$ ", "").replace(",", "."));
           revenueByMonth[monthYear] = (revenueByMonth[monthYear] || 0) + val;
         }
      }
    });

    const monthNames = {
      "01": "Janeiro", "02": "Fevereiro", "03": "Março", "04": "Abril", "05": "Maio", "06": "Junho",
      "07": "Julho", "08": "Agosto", "09": "Setembro", "10": "Outubro", "11": "Novembro", "12": "Dezembro"
    };

    const sortedMonths = Object.keys(revenueByMonth).sort((a, b) => {
      const [m1, y1] = a.split("/");
      const [m2, y2] = b.split("/");
      return new Date(y2, m2 - 1) - new Date(y1, m1 - 1);
    });

    let maxRev = 0;
    Object.values(revenueByMonth).forEach(v => { if(v > maxRev) maxRev = v; });

    const newStats = sortedMonths.map(my => {
      const [m, y] = my.split("/");
      const val = revenueByMonth[my];
      return {
        month: `${monthNames[m]} ${y}`,
        value: val,
        percent: maxRev > 0 ? Math.round((val / maxRev) * 100) : 0
      };
    });

    setRevenueStats(newStats);

  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: "32px" }}>Relatórios Analíticos</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        <Card>
          <h2 style={{ marginBottom: "24px" }}>Serviços Realizados</h2>
          {topServices.length === 0 ? (
             <p style={{ color: "var(--text-secondary)" }}>Nenhum serviço agendado ainda.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {topServices.map((item, i) => (
                 <li key={i} style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: i !== topServices.length - 1 ? "1px solid var(--border-color)" : "none" }}>
                   <span style={{ fontWeight: "500" }}>{item.name} <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>({item.count})</span></span>
                   <strong style={{ color: "var(--blue-dark)" }}>{item.percent}%</strong>
                 </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 style={{ marginBottom: "24px" }}>Crescimento de Faturamento</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {revenueStats.map((stat, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span>{stat.month}</span>
                  <span style={{ fontWeight: "bold", color: "green" }}>
                    {stat.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </div>
                <div style={{ width: "100%", backgroundColor: "var(--bg-primary)", height: "12px", borderRadius: "6px" }}>
                  <div style={{ width: `${stat.percent}%`, backgroundColor: "var(--blue-dark)", height: "100%", borderRadius: "6px" }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
