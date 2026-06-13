import Card from "../components/Card";

export default function BarberReports() {
  return (
    <div>
      <h1 style={{ marginBottom: "32px" }}>Relatórios Analíticos</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <Card>
          <h2 style={{ marginBottom: "24px" }}>Serviços Mais Vendidos</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { name: "Corte Clássico", percent: "45%" },
              { name: "Corte + Barba", percent: "30%" },
              { name: "Barba Terapia", percent: "15%" },
              { name: "Pigmentação", percent: "10%" }
            ].map((item, i) => (
               <li key={i} style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: i !== 3 ? "1px solid var(--border-color)" : "none" }}>
                 <span style={{ fontWeight: "500" }}>{item.name}</span>
                 <strong style={{ color: "var(--blue-dark)" }}>{item.percent}</strong>
               </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 style={{ marginBottom: "24px" }}>Crescimento de Faturamento</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Junho/2026</span>
                <span style={{ fontWeight: "bold", color: "green" }}>R$ 14.500,00</span>
              </div>
              <div style={{ width: "100%", backgroundColor: "var(--bg-primary)", height: "12px", borderRadius: "6px" }}>
                <div style={{ width: "85%", backgroundColor: "var(--blue-dark)", height: "100%", borderRadius: "6px" }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Maio/2026</span>
                <span style={{ fontWeight: "bold", color: "green" }}>R$ 12.300,00</span>
              </div>
              <div style={{ width: "100%", backgroundColor: "var(--bg-primary)", height: "12px", borderRadius: "6px" }}>
                <div style={{ width: "70%", backgroundColor: "var(--blue-dark)", height: "100%", borderRadius: "6px" }}></div>
              </div>
            </div>
            
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Abril/2026</span>
                <span style={{ fontWeight: "bold", color: "green" }}>R$ 10.100,00</span>
              </div>
              <div style={{ width: "100%", backgroundColor: "var(--bg-primary)", height: "12px", borderRadius: "6px" }}>
                <div style={{ width: "55%", backgroundColor: "var(--blue-dark)", height: "100%", borderRadius: "6px" }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
