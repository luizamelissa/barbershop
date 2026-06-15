import { auth as adminAuth, db } from '../config/firebaseAdmin.js';

// GET /users
const getUsers = async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = [];
    snapshot.forEach(doc => {
      users.push(doc.data());
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ message: "Erro ao buscar usuários." });
  }
};

// DELETE /users/:id
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Tenta deletar no Auth
    try {
      await adminAuth.deleteUser(id);
    } catch (authErr) {
      console.warn("Aviso: Usuário não encontrado no Auth ou erro ao deletar:", authErr.message);
    }

    // Deleta no Firestore
    await db.collection('users').doc(id).delete();

    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return res.status(500).json({ message: "Erro ao deletar usuário." });
  }
};

export {
  getUsers,
  deleteUser
};

