import { db } from "../config/firebaseAdmin.js";

// Listar barbeiros
const getBarbers = async (req, res) => {
  try {
    const snapshot = await db.collection("barbers").get();
    const barbers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(barbers);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar barbeiros" });
  }
};

// Criar barbeiro
const createBarber = async (req, res) => {
  try {
    const barber = req.body;
    const docRef = await db.collection("barbers").add(barber);

    res.status(201).json({ id: docRef.id, ...barber });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar barbeiro" });
  }
};

// Atualizar barbeiro
const updateBarber = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("barbers").doc(id).update(req.body);

    res.json({ message: "Barbeiro atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar barbeiro" });
  }
};

// Deletar barbeiro
const deleteBarber = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("barbers").doc(id).delete();

    res.json({ message: "Barbeiro removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar barbeiro" });
  }
};

export default {
  getBarbers,
  createBarber,
  updateBarber,
  deleteBarber
};