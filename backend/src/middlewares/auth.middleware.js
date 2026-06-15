import { auth as adminAuth, db } from '../config/firebaseAdmin.js';

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido ou formato inválido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    
    // Se o Custom Claim 'role' existir (como no caso do admin_fixed_uid criado com createCustomToken)
    let role = decoded.role;
    
    // Se não existir, buscamos no Firestore
    if (!role) {
      const userDoc = await db.collection('users').doc(decoded.uid).get();
      if (userDoc.exists) {
        role = userDoc.data().role;
      } else {
        role = 'client';
      }
    }

    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      role: role
    };
    next();
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

const isAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Apenas administradores permitidos.' });
  }

  next();
};

export { verifyToken, isAdmin };
