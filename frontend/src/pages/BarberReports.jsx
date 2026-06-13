import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

export default function BarberReports() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", flex: 1, padding: "40px" }}>
        <h1 style={{ marginBottom: "32px" }}>Relatórios (Mock)</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <Card>
            <h2>Serviços Mais Vendidos</h2>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "16px" }}>
              <li style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                <span>1. Corte Clássico</span>
                <strong>45%</strong>
              </li>
              <li style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                <span>2. Corte + Barba</span>
                <strong>30%</strong>
              </li>
              <li style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                <span>3. Barba Terapia</span>
                <strong>15%</strong>
              </li>
              <li style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
                <span>4. Pigmentação</span>
                <strong>10%</strong>
              </li>
            </ul>
          </Card>

          <Card>
            <h2>Faturamento Mensal (Mock)</h2>
            <div style={{ marginTop: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Junho/2026</span>
                <span style={{ fontWeight: "bold", color: "green" }}>R$ 14.500,00</span>
              </div>
              <div style={{ width: "100%", backgroundColor: "var(--gray-light)", height: "12px", borderRadius: "6px" }}>
                <div style={{ width: "85%", backgroundColor: "var(--blue-dark)", height: "100%", borderRadius: "6px" }}></div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", marginTop: "24px" }}>
                <span>Maio/2026</span>
                <span style={{ fontWeight: "bold", color: "green" }}>R$ 12.300,00</span>
              </div>
              <div style={{ width: "100%", backgroundColor: "var(--gray-light)", height: "12px", borderRadius: "6px" }}>
                <div style={{ width: "70%", backgroundColor: "var(--blue-dark)", height: "100%", borderRadius: "6px" }}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
