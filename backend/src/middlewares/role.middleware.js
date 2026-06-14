import { db } from '../config/firebaseAdmin.js';

// Middleware para verificar as roles (admin, barber, client)
const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const uid = req.user.uid;
      
      const userDoc = await db.collection('users').doc(uid).get();
      
      if (!userDoc.exists) {
        return res.status(403).json({ message: 'Usuário não encontrado no Firestore.' });
      }

      const userData = userDoc.data();
      
      if (allowedRoles.includes(userData.role)) {
        req.userData = userData; // Injetamos os dados do user no req para uso posterior
        next();
      } else {
        return res.status(403).json({ message: 'Acesso negado: Permissão insuficiente.' });
      }
    } catch (error) {
      console.error("Erro na verificação de role:", error);
      return res.status(500).json({ message: 'Erro interno ao verificar permissões.' });
    }
  };
};

export { checkRole };
