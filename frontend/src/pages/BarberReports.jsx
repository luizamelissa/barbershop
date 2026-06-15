import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getStorageData } from "../services/storage";
import { DollarSign, Calendar, Users, Scissors, Clock, Printer } from "lucide-react";
import Button from "../components/Button";
import { generatePDF } from "../utils/pdfGenerator";

export default function BarberReports() {
  const [reportData, setReportData] = useState({
    faturamento: { total: 0, byMonth: [] },
    atendimentos: { total: 0, concluidos: 0, cancelados: 0, faltas: 0 },
    servicos: [],
    clientes: { total: 0, novos: 0, recorrentes: 0 },
    horarios: []
  });

  useEffect(() => {
    const apps = getStorageData("atlas_appointments") || [];
    const txs = getStorageData("atlas_transactions") || [];
    const users = (getStorageData("atlas_users") || []).filter(u => u.role === "cliente");

    // 1. Faturamento (Baseado nas transações reais / CRUD)
    let totalEntradas = 0;
    const revByMonth = {};
    
    txs.forEach(tx => {
      if (tx.type === "entrada") {
        const val = parseFloat(tx.value.replace("R$ ", "").replace(",", "."));
        totalEntradas += val;
        
        // agrupar por mes/ano
        const parts = tx.date.split("/");
        if (parts.length === 3) {
          const monthYear = `${parts[1]}/${parts[2]}`;
          revByMonth[monthYear] = (revByMonth[monthYear] || 0) + val;
        }
      }
    });

    const monthNames = {
      "01": "Jan", "02": "Fev", "03": "Mar", "04": "Abr", "05": "Mai", "06": "Jun",
      "07": "Jul", "08": "Ago", "09": "Set", "10": "Out", "11": "Nov", "12": "Dez"
    };

    const sortedMonths = Object.keys(revByMonth).sort((a, b) => {
      const [m1, y1] = a.split("/");
      const [m2, y2] = b.split("/");
      return new Date(y2, m2 - 1) - new Date(y1, m1 - 1);
    });

    const faturamentoByMonth = sortedMonths.map(my => {
      const [m, y] = my.split("/");
      return { month: `${monthNames[m]} ${y}`, value: revByMonth[my] };
    });

    // 2. Atendimentos
    let concluidos = 0;
    let cancelados = 0;
    let faltas = 0;

    apps.forEach(app => {
      if (app.status === "Concluído" || app.status === "Avaliado") concluidos++;
      else if (app.status === "Cancelado") cancelados++;
      else if (app.status === "Falta") faltas++;
    });

    // 3. Serviços mais realizados (desconsiderando cancelados e faltas)
    const validApps = apps.filter(a => a.status !== "Cancelado" && a.status !== "Falta");
    const serviceCounts = {};
    validApps.forEach(app => {
      serviceCounts[app.serviceName] = (serviceCounts[app.serviceName] || 0) + 1;
    });
    
    const servicos = Object.keys(serviceCounts)
      .map(name => ({ name, count: serviceCounts[name] }))
      .sort((a, b) => b.count - a.count);

    // 4. Clientes (Recorrentes vs Novos baseado no histórico de agendamentos)
    const clientAppCounts = {};
    apps.forEach(app => {
      if (app.status !== "Cancelado" && app.status !== "Falta") {
        clientAppCounts[app.clientId] = (clientAppCounts[app.clientId] || 0) + 1;
      }
    });

    let recorrentes = 0;
    let novos = 0;
    
    // Todos os clientes ativos no sistema (ou que já agendaram alguma vez)
    const activeClientIds = Object.keys(clientAppCounts);
    activeClientIds.forEach(id => {
      if (clientAppCounts[id] > 1) recorrentes++;
      else novos++;
    });

    // 5. Horários mais cheios
    const hourCounts = {};
    validApps.forEach(app => {
      const hour = app.time.split(":")[0] + ":00"; // Agrupa pela hora cheia
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    const horarios = Object.keys(hourCounts)
      .map(time => ({ time, count: hourCounts[time] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // top 5 horários

    setReportData({
      faturamento: { total: totalEntradas, byMonth: faturamentoByMonth },
      atendimentos: { total: apps.length, concluidos, cancelados, faltas },
      servicos,
      clientes: { total: users.length > 0 ? users.length : activeClientIds.length, novos, recorrentes },
      horarios
    });

  }, []);

  const formatCurrency = (val) => val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ margin: 0 }}>Relatórios Completos</h1>
        <Button onClick={() => generatePDF("report-content", "Relatorios_Barbearia.pdf")} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Printer size={20} />
          Baixar Relatório
        </Button>
      </div>

      <div id="report-content" style={{ padding: "20px", backgroundColor: "var(--bg-primary)", borderRadius: "8px" }}>
        {/* Grid Superior de Resumo */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        <Card style={{ borderLeft: "4px solid green" }}>
          <p style={{ color: "var(--text-secondary)", fontWeight: "bold", fontSize: "0.85rem", textTransform: "uppercase" }}>Faturamento Total (Confirmado)</p>
          <h2 style={{ fontSize: "1.8rem", color: "green", display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
            <DollarSign size={24} /> {formatCurrency(reportData.faturamento.total)}
          </h2>
        </Card>
        
        <Card style={{ borderLeft: "4px solid var(--brand-blue)" }}>
          <p style={{ color: "var(--text-secondary)", fontWeight: "bold", fontSize: "0.85rem", textTransform: "uppercase" }}>Total de Atendimentos</p>
          <h2 style={{ fontSize: "1.8rem", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
            <Calendar size={24} color="var(--brand-blue)" /> {reportData.atendimentos.total}
          </h2>
        </Card>

        <Card style={{ borderLeft: "4px solid var(--brand-red)" }}>
          <p style={{ color: "var(--text-secondary)", fontWeight: "bold", fontSize: "0.85rem", textTransform: "uppercase" }}>Total de Clientes</p>
          <h2 style={{ fontSize: "1.8rem", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
            <Users size={24} color="var(--brand-red)" /> {reportData.clientes.total}
          </h2>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>
        
        {/* Atendimentos Info */}
        <Card>
          <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><Calendar size={20}/> Status dos Atendimentos</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
             <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "8px", borderBottom: "1px solid var(--border-color)" }}>
               <span style={{ color: "var(--text-primary)" }}>Concluídos</span>
               <strong style={{ color: "var(--status-success)" }}>{reportData.atendimentos.concluidos}</strong>
             </div>
             <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "8px", borderBottom: "1px solid var(--border-color)" }}>
               <span style={{ color: "var(--text-primary)" }}>Faltas (No-Show)</span>
               <strong style={{ color: "var(--status-warning)" }}>{reportData.atendimentos.faltas}</strong>
             </div>
             <div style={{ display: "flex", justifyContent: "space-between" }}>
               <span style={{ color: "var(--text-primary)" }}>Cancelados</span>
               <strong style={{ color: "var(--status-danger)" }}>{reportData.atendimentos.cancelados}</strong>
             </div>
          </div>
        </Card>

        {/* Clientes Info */}
        <Card>
          <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><Users size={20}/> Perfil de Clientes</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
             <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "8px", borderBottom: "1px solid var(--border-color)" }}>
               <span style={{ color: "var(--text-primary)" }}>Novos Clientes</span>
               <strong style={{ color: "var(--text-primary)" }}>{reportData.clientes.novos}</strong>
             </div>
             <div style={{ display: "flex", justifyContent: "space-between" }}>
               <span style={{ color: "var(--text-primary)" }}>Clientes Recorrentes</span>
               <strong style={{ color: "var(--text-primary)" }}>{reportData.clientes.recorrentes}</strong>
             </div>
          </div>
        </Card>

        {/* Ranking de Serviços */}
        <Card>
          <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><Scissors size={20}/> Serviços Mais Realizados</h3>
          {reportData.servicos.length === 0 ? (
            <p style={{ color: "var(--text-secondary)" }}>Nenhum serviço realizado ainda.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {reportData.servicos.map((item, i) => (
                 <li key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: i !== reportData.servicos.length - 1 ? "1px solid var(--border-color)" : "none" }}>
                   <span style={{ color: "var(--text-primary)", fontWeight: "500" }}>{i + 1}. {item.name}</span>
                   <strong style={{ color: "var(--brand-blue)" }}>{item.count}x</strong>
                 </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Horários mais cheios */}
        <Card>
          <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><Clock size={20}/> Horários de Pico</h3>
          {reportData.horarios.length === 0 ? (
            <p style={{ color: "var(--text-secondary)" }}>Sem dados suficientes.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {reportData.horarios.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ fontWeight: "bold", color: "var(--brand-red)", width: "60px" }}>{h.time}</div>
                  <div style={{ flex: 1, backgroundColor: "var(--bg-primary)", height: "12px", borderRadius: "6px", overflow: "hidden" }}>
                    <div style={{ 
                      width: `${(h.count / reportData.horarios[0].count) * 100}%`, 
                      backgroundColor: "var(--brand-red)", 
                      height: "100%", 
                      borderRadius: "6px" 
                    }}></div>
                  </div>
                  <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{h.count} agend.</div>
                </div>
              ))}
            </div>
          )}
        </Card>

      </div>
      </div>
    </div>
  );
}
