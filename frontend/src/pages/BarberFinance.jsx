import { useEffect, useState } from "react";
import Card from "../components/Card";
import { TrendingUp, TrendingDown, DollarSign, Trash2 } from "lucide-react";
import { getStorageData, setStorageData } from "../services/storage";

export default function BarberFinance() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const txs = getStorageData("atlas_transactions") || [];
    setTransactions(txs);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente apagar esta movimentação? Isso atualizará o faturamento e os relatórios.")) {
      const updated = transactions.filter(t => t.id !== id);
      setTransactions(updated);
      setStorageData("atlas_transactions", updated);
    }
  };

  const totals = transactions.reduce((acc, tx) => {
    const val = parseFloat(tx.value.replace("R$ ", "").replace(",", "."));
    if (tx.type === "entrada") acc.in += val;
    if (tx.type === "saida") acc.out += val;
    acc.net = acc.in - acc.out;
    return acc;
  }, { in: 0, out: 0, net: 0 });

  const formatCurrency = (val) => val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div>
      <h1 className="mb-4">Financeiro</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        <Card style={{ borderLeft: "4px solid green" }}>
          <p style={{ color: "var(--text-secondary)", fontWeight: "bold" }}>ENTRADAS (GERAL)</p>
          <h2 style={{ fontSize: "2rem", color: "green", display: "flex", alignItems: "center", gap: "8px" }}>
            <TrendingUp size={28} /> {formatCurrency(totals.in)}
          </h2>
        </Card>
        <Card style={{ borderLeft: "4px solid red" }}>
          <p style={{ color: "var(--text-secondary)", fontWeight: "bold" }}>SAÍDAS (GERAL)</p>
          <h2 style={{ fontSize: "2rem", color: "red", display: "flex", alignItems: "center", gap: "8px" }}>
            <TrendingDown size={28} /> {formatCurrency(totals.out)}
          </h2>
        </Card>
        <Card style={{ borderLeft: "4px solid var(--blue-dark)", backgroundColor: "var(--blue-dark)" }}>
          <p style={{ color: "rgba(255,255,255,0.8)", fontWeight: "bold" }}>SALDO LÍQUIDO</p>
          <h2 style={{ fontSize: "2rem", color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
            <DollarSign size={28} color="#fff" /> {formatCurrency(totals.net)}
          </h2>
        </Card>
      </div>

      <Card>
        <h2 style={{ marginBottom: "24px" }}>Últimas Movimentações</h2>
        
        {transactions.length === 0 ? (
          <p style={{ color: "var(--text-secondary)", textAlign: "center" }}>Nenhuma movimentação financeira registrada.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {transactions.map(t => (
              <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--bg-surface)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ 
                    backgroundColor: t.type === 'entrada' ? 'rgba(0,128,0,0.1)' : 'rgba(255,0,0,0.1)',
                    color: t.type === 'entrada' ? 'green' : 'red',
                    padding: "12px", borderRadius: "50%"
                  }}>
                    {t.type === 'entrada' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--text-primary)" }}>{t.desc}</h3>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{t.date}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: t.type === 'entrada' ? 'green' : 'red' }}>
                    {t.type === 'entrada' ? '+' : '-'} {t.value}
                  </div>
                  <button 
                    onClick={() => handleDelete(t.id)} 
                    style={{ background: "none", border: "none", color: "var(--status-danger)", cursor: "pointer", padding: "8px" }}
                    title="Apagar movimentação"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
