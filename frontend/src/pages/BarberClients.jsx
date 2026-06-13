import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

export default function BarberClients() {
  const [search, setSearch] = useState("");
  
  const clients = [
    { id: 1, name: "João Silva", phone: "(11) 98765-4321", visits: 12, lastVisit: "10/06/2026" },
    { id: 2, name: "Pedro Henrique", phone: "(11) 91234-5678", visits: 5, lastVisit: "12/06/2026" },
    { id: 3, name: "Lucas Mendes", phone: "(11) 99999-8888", visits: 24, lastVisit: "01/06/2026" },
    { id: 4, name: "Marcos Paulo", phone: "(11) 97777-6666", visits: 1, lastVisit: "15/05/2026" },
  ];

  const filteredClients = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1 style={{ marginBottom: "32px" }}>Lista de Clientes</h1>

      <Card style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <Input 
              label="Buscar cliente" 
              placeholder="Digite o nome..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button style={{ marginBottom: "16px" }}>Pesquisar</Button>
        </div>
      </Card>

      <Card style={{ padding: "0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
            <tr>
              <th style={{ padding: "16px" }}>Nome</th>
              <th style={{ padding: "16px" }}>Telefone</th>
              <th style={{ padding: "16px" }}>Qtd. Visitas</th>
              <th style={{ padding: "16px" }}>Última Visita</th>
              <th style={{ padding: "16px", textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client, index) => (
              <tr key={client.id} style={{ borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--bg-surface)" }}>
                <td style={{ padding: "16px", fontWeight: "bold" }}>{client.name}</td>
                <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{client.phone}</td>
                <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{client.visits}</td>
                <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{client.lastVisit}</td>
                <td style={{ padding: "16px", textAlign: "right" }}>
                  <Button variant="secondary" style={{ padding: "4px 8px", fontSize: "0.8rem" }}>Ver Histórico</Button>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: "24px", textAlign: "center", color: "var(--text-secondary)" }}>Nenhum cliente encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
