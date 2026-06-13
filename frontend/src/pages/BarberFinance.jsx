import Card from "../components/Card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function BarberFinance() {
  const transactions = [
    { id: 1, desc: "Corte Clássico - João", type: "entrada", value: "R$ 45,00", date: "Hoje, 14:30" },
    { id: 2, desc: "Corte + Barba - Marcos", type: "entrada", value: "R$ 75,00", date: "Hoje, 11:00" },
    { id: 3, desc: "Pagamento Fornecedor (Pomadas)", type: "saida", value: "R$ 350,00", date: "Ontem, 16:00" },
    { id: 4, desc: "Barba Terapia - Lucas", type: "entrada", value: "R$ 35,00", date: "Ontem, 14:00" },
  ];

  return (
    <div>
      <h1 className="mb-4">Financeiro (Simulação)</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "32px" }}>
        <Card style={{ borderLeft: "4px solid green" }}>
          <p style={{ color: "var(--text-secondary)", fontWeight: "bold" }}>ENTRADAS (MÊS)</p>
          <h2 style={{ fontSize: "2rem", color: "green", display: "flex", alignItems: "center", gap: "8px" }}>
            <TrendingUp size={28} /> R$ 14.500,00
          </h2>
        </Card>
        <Card style={{ borderLeft: "4px solid red" }}>
          <p style={{ color: "var(--text-secondary)", fontWeight: "bold" }}>SAÍDAS (MÊS)</p>
          <h2 style={{ fontSize: "2rem", color: "red", display: "flex", alignItems: "center", gap: "8px" }}>
            <TrendingDown size={28} /> R$ 3.200,00
          </h2>
        </Card>
        <Card style={{ borderLeft: "4px solid var(--blue-dark)", backgroundColor: "var(--blue-dark)", color: "#fff" }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: "bold" }}>SALDO LÍQUIDO</p>
          <h2 style={{ fontSize: "2rem", color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
            <DollarSign size={28} /> R$ 11.300,00
          </h2>
        </Card>
      </div>

      <Card>
        <h2 style={{ marginBottom: "24px" }}>Últimas Movimentações</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {transactions.map(t => (
            <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ 
                  backgroundColor: t.type === 'entrada' ? 'rgba(0,128,0,0.1)' : 'rgba(255,0,0,0.1)',
                  color: t.type === 'entrada' ? 'green' : 'red',
                  padding: "12px", borderRadius: "50%"
                }}>
                  {t.type === 'entrada' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{t.desc}</h3>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{t.date}</span>
                </div>
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: t.type === 'entrada' ? 'green' : 'red' }}>
                {t.type === 'entrada' ? '+' : '-'} {t.value}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
