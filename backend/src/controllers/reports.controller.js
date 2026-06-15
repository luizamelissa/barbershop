import { db } from '../config/firebaseAdmin.js';

// Helper genérico para buscar coleção
const fetchCollection = async (collectionName) => {
  const snapshot = await db.collection(collectionName).get();
  const data = [];
  snapshot.forEach(doc => data.push(doc.data()));
  return data;
};

// GET /reports/dashboard
const getDashboard = async (req, res) => {
  try {
    const clients = (await fetchCollection('users')).filter(u => u.role === 'client');
    const apps = await fetchCollection('appointments');
    const txs = await fetchCollection('finance');

    const todayStr = new Date().toISOString().split('T')[0]; // Ajuste de timezone pode ser necessário dependendo da região
    const todayApps = apps.filter(a => a.date === new Date().toLocaleDateString("pt-BR"));

    const revenue = txs.reduce((acc, tx) => {
      if (tx.type === "entrada") {
        const val = parseFloat(tx.value.replace("R$ ", "").replace(",", "."));
        return acc + val;
      }
      return acc;
    }, 0);

    return res.status(200).json({
      totalClients: clients.length,
      appointmentsToday: todayApps.length,
      totalAppointments: apps.length,
      totalRevenue: revenue
    });
  } catch (error) {
    console.error("Erro no relatorio dashboard:", error);
    return res.status(500).json({ message: "Erro ao buscar dashboard." });
  }
};

// GET /reports/finance
const getFinanceReport = async (req, res) => {
  try {
    const txs = await fetchCollection('finance');
    let totalEntradas = 0;
    const revByMonth = {};
    
    txs.forEach(tx => {
      if (tx.type === "entrada") {
        const val = parseFloat(tx.value.replace("R$ ", "").replace(",", "."));
        totalEntradas += val;
        
        const parts = tx.date.split("/");
        if (parts.length === 3) {
          const monthYear = `${parts[1]}/${parts[2]}`;
          revByMonth[monthYear] = (revByMonth[monthYear] || 0) + val;
        }
      }
    });

    return res.status(200).json({ total: totalEntradas, byMonth: revByMonth });
  } catch (error) {
    console.error("Erro no relatorio finance:", error);
    return res.status(500).json({ message: "Erro ao buscar relatório financeiro." });
  }
};

// GET /reports/services
const getServicesReport = async (req, res) => {
  try {
    const apps = await fetchCollection('appointments');
    const validApps = apps.filter(a => a.status !== "Cancelado" && a.status !== "Falta");
    const serviceCounts = {};
    
    validApps.forEach(app => {
      serviceCounts[app.serviceName] = (serviceCounts[app.serviceName] || 0) + 1;
    });

    const servicos = Object.keys(serviceCounts)
      .map(name => ({ name, count: serviceCounts[name] }))
      .sort((a, b) => b.count - a.count);

    return res.status(200).json(servicos);
  } catch (error) {
    console.error("Erro no relatorio services:", error);
    return res.status(500).json({ message: "Erro ao buscar relatório de serviços." });
  }
};

// GET /reports/clients
const getClientsReport = async (req, res) => {
  try {
    const apps = await fetchCollection('appointments');
    const users = (await fetchCollection('users')).filter(u => u.role === 'client');
    
    const clientAppCounts = {};
    apps.forEach(app => {
      if (app.status !== "Cancelado" && app.status !== "Falta") {
        clientAppCounts[app.clientId] = (clientAppCounts[app.clientId] || 0) + 1;
      }
    });

    let recorrentes = 0;
    let novos = 0;
    
    const activeClientIds = Object.keys(clientAppCounts);
    activeClientIds.forEach(id => {
      if (clientAppCounts[id] > 1) recorrentes++;
      else novos++;
    });

    return res.status(200).json({
      total: users.length > 0 ? users.length : activeClientIds.length,
      novos,
      recorrentes
    });
  } catch (error) {
    console.error("Erro no relatorio clients:", error);
    return res.status(500).json({ message: "Erro ao buscar relatório de clientes." });
  }
};

// GET /reports/schedules
const getSchedulesReport = async (req, res) => {
  try {
    const apps = await fetchCollection('appointments');
    const validApps = apps.filter(a => a.status !== "Cancelado" && a.status !== "Falta");
    const hourCounts = {};
    
    validApps.forEach(app => {
      const hour = app.time.split(":")[0] + ":00";
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    const horarios = Object.keys(hourCounts)
      .map(time => ({ time, count: hourCounts[time] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // top 5

    return res.status(200).json(horarios);
  } catch (error) {
    console.error("Erro no relatorio schedules:", error);
    return res.status(500).json({ message: "Erro ao buscar relatório de horários." });
  }
};

export {
  getDashboard,
  getFinanceReport,
  getServicesReport,
  getClientsReport,
  getSchedulesReport
};

