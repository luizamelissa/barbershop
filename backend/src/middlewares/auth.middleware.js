import { auth as adminAuth } from '../config/firebaseAdmin.js';

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido ou formato inválido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken; // uid, email, etc.
    next();
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

export { verifyToken };
