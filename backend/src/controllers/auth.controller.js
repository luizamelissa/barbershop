import { auth as adminAuth, db } from '../config/firebaseAdmin.js';
import { authClient } from '../config/firebaseClient.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

// POST /auth/register
const register = async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Email, password e name são obrigatórios." });
  }

  try {
    // Cria usuário no Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    // Define a role padrão se não for fornecida (apenas admin pode criar outros admins via UI)
    const userRole = role || 'client';

    // Salva perfil no Firestore
    const userData = {
      id: userRecord.uid,
      name,
      email,
      photo: "",
      role: userRole,
      createdAt: new Date().toISOString()
    };

    await db.collection('users').doc(userRecord.uid).set(userData);

    return res.status(201).json({ message: "Usuário registrado com sucesso.", user: userData });
  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ message: error.message });
  }
};

// POST /auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e password são obrigatórios." });
  }

  try {
    // Tenta fazer login com o SDK do Client (Isso gera o token de autenticação completo que o frontend usaria)
    // Se estivesse 100% separado, o frontend enviaria o token. Como pediram a rota /login:
    if (!authClient) {
        return res.status(500).json({ message: "Firebase Client não configurado no backend. Use o frontend para gerar o token." });
    }
    
    const userCredential = await signInWithEmailAndPassword(authClient, email, password);
    const idToken = await userCredential.user.getIdToken();

    // Pega dados do Firestore
    const userDoc = await db.collection('users').doc(userCredential.user.uid).get();
    const userData = userDoc.exists ? userDoc.data() : null;

    return res.status(200).json({ 
      message: "Login efetuado com sucesso.", 
      token: idToken, 
      user: userData 
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(401).json({ message: "Credenciais inválidas." });
  }
};

// POST /auth/google
const googleLogin = async (req, res) => {
  // Frontend envia o token recebido pelo popup do Google
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "idToken é obrigatório." });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    // Verifica se já existe no Firestore
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    let userData;

    if (!userDoc.exists) {
      // Cria novo usuário client
      userData = {
        id: uid,
        name: name || email.split('@')[0],
        email: email,
        photo: picture || "",
        role: "client",
        createdAt: new Date().toISOString()
      };
      await userRef.set(userData);
    } else {
      userData = userDoc.data();
    }

    return res.status(200).json({ message: "Login com Google efetuado com sucesso.", user: userData });
  } catch (error) {
    console.error("Erro no login com Google:", error);
    return res.status(401).json({ message: "Token Google inválido." });
  }
};

export default {
  register,
  login,
  googleLogin
};
