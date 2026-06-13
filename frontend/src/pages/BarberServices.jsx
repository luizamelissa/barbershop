import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function BarberServices() {
  const [services, setServices] = useState([
    { id: 1, name: "Corte Clássico", duration: "40 min", price: "R$ 45,00", active: true },
    { id: 2, name: "Corte Fade / Degradê", duration: "50 min", price: "R$ 55,00", active: true },
    { id: 3, name: "Barba Terapia", duration: "30 min", price: "R$ 35,00", active: true },
    { id: 4, name: "Corte + Barba", duration: "1h 10min", price: "R$ 75,00", active: true },
    { id: 5, name: "Pigmentação", duration: "45 min", price: "R$ 50,00", active: false }
  ]);

  const toggleStatus = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ margin: 0 }}>Catálogo de Serviços</h1>
        <Button><Plus size={18} /> Novo Serviço</Button>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
            <tr>
              <th style={{ padding: "16px" }}>Nome do Serviço</th>
              <th style={{ padding: "16px" }}>Duração</th>
              <th style={{ padding: "16px" }}>Preço</th>
              <th style={{ padding: "16px" }}>Status</th>
              <th style={{ padding: "16px", textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id} style={{ borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--bg-surface)" }}>
                <td style={{ padding: "16px", fontWeight: "bold" }}>{service.name}</td>
                <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{service.duration}</td>
                <td style={{ padding: "16px", fontWeight: "bold", color: "var(--blue-dark)" }}>{service.price}</td>
                <td style={{ padding: "16px" }}>
                  <button onClick={() => toggleStatus(service.id)} style={{
                    border: "none", background: "none", cursor: "pointer",
                    padding: "4px 12px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "bold",
                    backgroundColor: service.active ? "rgba(6, 95, 70, 0.1)" : "rgba(153, 27, 27, 0.1)",
                    color: service.active ? "#065f46" : "#991b1b"
                  }}>
                    {service.active ? "Ativo" : "Inativo"}
                  </button>
                </td>
                <td style={{ padding: "16px", textAlign: "right" }}>
                  <button style={{ border: "none", background: "none", cursor: "pointer", color: "var(--blue-dark)", marginRight: "12px" }}>
                    <Edit2 size={18} />
                  </button>
                  <button style={{ border: "none", background: "none", cursor: "pointer", color: "var(--red-accent)" }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
