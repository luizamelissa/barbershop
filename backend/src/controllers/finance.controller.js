import { db } from '../config/firebaseAdmin.js';

// GET /finance
const getFinance = async (req, res) => {
  try {
    const snapshot = await db.collection('finance').get();
    const transactions = [];
    snapshot.forEach(doc => transactions.push(doc.data()));
    
    // Opcional: ordenar por data mais recente
    transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Erro ao buscar transações financeiras:", error);
    return res.status(500).json({ message: "Erro ao buscar transações financeiras." });
  }
};

// DELETE /finance/:id
const deleteFinance = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('finance').doc(id).delete();
    return res.status(200).json({ message: "Transação deletada com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar transação:", error);
    return res.status(500).json({ message: "Erro ao deletar transação." });
  }
};


export {
  getFinance,
  deleteFinance
};
