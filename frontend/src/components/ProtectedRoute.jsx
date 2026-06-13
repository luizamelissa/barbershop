import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  // Assuming 'tipo' field is used to identify admins
  if (!user || (user.tipo !== "admin" && user.tipo !== "barbeiro")) {
    return <Navigate to="/" />; // Redirect non-admins to home
  }

  return children;
}
