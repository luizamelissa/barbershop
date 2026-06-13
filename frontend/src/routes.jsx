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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/pagamentos" element={<Pagamentos />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/relatorios" element={<Relatorios />} />
    </Routes>
  );
}

export default AppRoutes;
