import { useEffect, useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { getStorageData, setStorageData } from "../services/storage";
import { Trash2 } from "lucide-react";

export default function BarberClients() {
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState([]);
  
  useEffect(() => {
    const allUsers = getStorageData("atlas_users") || [];
    setClients(allUsers.filter(u => u.role === "cliente"));
  }, []);

  const filteredClients = clients.filter(c => c.firstName.toLowerCase().includes(search.toLowerCase()) || (c.email && c.email.toLowerCase().includes(search.toLowerCase())));

  const handleDelete = (id) => {
    if(window.confirm("Apagar cliente definitivamente?")) {
      const allUsers = getStorageData("atlas_users") || [];
      const updatedUsers = allUsers.filter(u => u.id !== id);
      setStorageData("atlas_users", updatedUsers);
      setClients(updatedUsers.filter(u => u.role === "cliente"));
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "32px" }}>Lista de Clientes Cadastrados</h1>

      <Card style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <Input 
              label="Buscar cliente" 
              placeholder="Digite o nome ou email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <Card style={{ padding: "0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
            <tr>
              <th style={{ padding: "16px" }}>Nome</th>
              <th style={{ padding: "16px" }}>E-mail</th>
              <th style={{ padding: "16px" }}>Telefone</th>
              <th style={{ padding: "16px", textAlign: "right" }}>ID Local</th>
              <th style={{ padding: "16px", textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id} style={{ borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--bg-surface)" }}>
                <td style={{ padding: "16px", fontWeight: "bold" }}>{client.firstName} {client.lastName}</td>
                <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{client.email}</td>
                <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{client.phone || "Não informado"}</td>
                <td style={{ padding: "16px", textAlign: "right", color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                  {client.id}
                </td>
                <td style={{ padding: "16px", textAlign: "right" }}>
                  <button onClick={() => handleDelete(client.id)} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--brand-red)" }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: "24px", textAlign: "center", color: "var(--text-secondary)" }}>Nenhum cliente encontrado. Crie uma conta de cliente no painel público.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
