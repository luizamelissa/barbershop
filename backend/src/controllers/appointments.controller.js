import { db } from '../config/firebaseAdmin.js';

// Helper para criar movimentação financeira
const createFinanceRecord = async (appointmentData) => {
  const financeRef = db.collection('finance').doc(appointmentData.id); // Usamos o mesmo ID para facilitar o vínculo
  await financeRef.set({
    id: appointmentData.id,
    appointmentId: appointmentData.id,
    desc: `Atendimento: ${appointmentData.serviceName} - ${appointmentData.clientName}`,
    type: 'entrada',
    value: `R$ ${appointmentData.price}`, // Mantendo o formato original que o frontend espera
    paymentMethod: appointmentData.paymentMethod,
    date: new Date().toLocaleDateString("pt-BR"),
    createdAt: new Date().toISOString()
  });
};

// Helper para deletar movimentação financeira
const deleteFinanceRecord = async (appointmentId) => {
  await db.collection('finance').doc(appointmentId).delete();
};

// POST /appointments
const createAppointment = async (req, res) => {
  try {
    const data = req.body;
    const newAppRef = db.collection('appointments').doc();
    
    const appointmentData = {
      ...data,
      id: newAppRef.id,
      status: data.status || 'Confirmado',
      createdAt: new Date().toISOString()
    };

    await newAppRef.set(appointmentData);

    // Se já nasce Confirmado/Concluído, gera fluxo no financeiro
    if (appointmentData.status === 'Confirmado' || appointmentData.status === 'Concluído') {
      await createFinanceRecord(appointmentData);
    }

    return res.status(201).json({ message: "Agendamento criado com sucesso.", appointment: appointmentData });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return res.status(500).json({ message: "Erro ao criar agendamento." });
  }
};

// GET /appointments
const getAppointments = async (req, res) => {
  try {
    const { userId } = req.query; // Para o cliente buscar apenas os dele

    let query = db.collection('appointments');
    if (userId) {
      query = query.where('clientId', '==', userId);
    }

    const snapshot = await query.get();
    const appointments = [];
    snapshot.forEach(doc => appointments.push(doc.data()));
    
    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return res.status(500).json({ message: "Erro ao buscar agendamentos." });
  }
};

// PUT /appointments/:id/status
const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const appRef = db.collection('appointments').doc(id);
    const doc = await appRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }

    await appRef.update({ status });

    const appData = { ...doc.data(), status };

    // Regras financeiras baseadas no status
    if (status === 'Cancelado' || status === 'Falta') {
      await deleteFinanceRecord(id);
    } else if (status === 'Confirmado' || status === 'Concluído') {
      // Cria/Atualiza caso tenham alterado de Cancelado para Confirmado
      await createFinanceRecord(appData);
    }

    return res.status(200).json({ message: "Status do agendamento atualizado." });
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return res.status(500).json({ message: "Erro ao atualizar status." });
  }
};

// DELETE /appointments/:id
const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('appointments').doc(id).delete();
    // Exclui também a movimentação atrelada
    await deleteFinanceRecord(id);
    
    return res.status(200).json({ message: "Agendamento deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar agendamento:", error);
    return res.status(500).json({ message: "Erro ao deletar agendamento." });
  }
};

export {
  createAppointment,
  getAppointments,
  updateStatus,
  deleteAppointment
};
