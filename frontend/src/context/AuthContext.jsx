import { createContext, useContext, useState, useEffect } from "react";
import { initStorage, getStorageData, setStorageData } from "../services/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    initStorage();
    const savedUser = getStorageData("atlas_current_user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (email, password, role) => {
    let targetUser = null;
    
    if (role === "admin") {
      // Simulação simples de login admin
      targetUser = { id: "admin-1", email, role: "admin", firstName: "Admin" };
    } else {
      const users = getStorageData("atlas_users") || [];
      targetUser = users.find(u => u.email === email && u.password === password);
      
      // Fallback pra facilitar o mock
      if (!targetUser && email && password) {
        targetUser = { id: Date.now().toString(), email, role: "cliente", firstName: email.split("@")[0] };
        setStorageData("atlas_users", [...users, targetUser]);
      }
    }

    if (targetUser) {
      setUser(targetUser);
      setStorageData("atlas_current_user", targetUser);
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const users = getStorageData("atlas_users") || [];
    const newUser = { ...userData, id: Date.now().toString(), role: "cliente" };
    setStorageData("atlas_users", [...users, newUser]);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("atlas_current_user");
  };

  const updateProfile = (updatedData) => {
    const newData = { ...user, ...updatedData };
    setUser(newData);
    setStorageData("atlas_current_user", newData);
    
    if (user.role === "cliente") {
      const users = getStorageData("atlas_users") || [];
      const updatedUsers = users.map(u => u.id === user.id ? newData : u);
      setStorageData("atlas_users", updatedUsers);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
