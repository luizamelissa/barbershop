import { createContext, useContext, useState, useEffect } from "react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            setUser(userSnap.data());
          } else {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: 'client'
            });
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário no Firestore:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const userRef = doc(db, "users", result.user.uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : { role: 'client' };
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    const userRef = doc(db, "users", firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const userData = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        email: firebaseUser.email,
        photo: firebaseUser.photoURL || '',
        role: "client",
        createdAt: new Date().toISOString()
      };
      await setDoc(userRef, userData);
      return userData;
    }
    return userSnap.data();
  };

  const register = async (userData) => {
    const result = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const firebaseUser = result.user;

    const newUser = {
      uid: firebaseUser.uid,
      name: userData.firstName + " " + userData.lastName,
      email: firebaseUser.email,
      phone: userData.phone || '',
      role: "client",
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, "users", firebaseUser.uid), newUser);
    return newUser;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateProfile = async (updatedData) => {
    if (!user) return;
    const newData = { ...user, ...updatedData };
    setUser(newData);
    await setDoc(doc(db, "users", user.uid), newData, { merge: true });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
