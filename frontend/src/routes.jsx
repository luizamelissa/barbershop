import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Historico from "./pages/Historico";
import Pagamentos from "./pages/Pagamentos";
import Perfil from "./pages/Perfil";
import Relatorios from "./pages/Relatorios";
import Home from "./pages/Home";
import { PrivateRoute, AdminRoute } from "./components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Rotas Privadas (Cliente) */}
      <Route path="/historico" element={<PrivateRoute><Historico /></PrivateRoute>} />
      <Route path="/pagamentos" element={<PrivateRoute><Pagamentos /></PrivateRoute>} />
      <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />

      {/* Rotas Admin/Barbeiro */}
      <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
      <Route path="/clientes" element={<AdminRoute><Clientes /></AdminRoute>} />
      <Route path="/relatorios" element={<AdminRoute><Relatorios /></AdminRoute>} />
    </Routes>
  );
}

export default AppRoutes;
