import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";
import { getStorageData, setStorageData } from "../services/storage";

export default function BarberServices() {
  const [services, setServices] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newService, setNewService] = useState({ name: "", duration: "", price: "", active: true });

  useEffect(() => {
    setServices(getStorageData("atlas_services") || []);
  }, []);

  const saveToStorage = (data) => {
    setServices(data);
    setStorageData("atlas_services", data);
  };

  const toggleStatus = (id) => {
    saveToStorage(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const handleDelete = (id) => {
    if(window.confirm("Apagar serviço?")) {
      saveToStorage(services.filter(s => s.id !== id));
    }
  };

  const handleAdd = () => {
    if (newService.name && newService.price) {
      const added = [...services, { ...newService, id: Date.now() }];
      saveToStorage(added);
      setNewService({ name: "", duration: "", price: "", active: true });
      setIsAdding(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ margin: 0 }}>Catálogo de Serviços</h1>
        <Button onClick={() => setIsAdding(!isAdding)}><Plus size={18} /> Novo Serviço</Button>
      </div>

      {isAdding && (
        <Card style={{ marginBottom: "24px", border: "1px dashed var(--blue-dark)" }}>
          <h3 className="mb-2">Adicionar Novo Serviço</h3>
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
            <div style={{ flex: 2 }}><Input label="Nome" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} /></div>
            <div style={{ flex: 1 }}><Input label="Duração (ex: 40 min)" value={newService.duration} onChange={e => setNewService({...newService, duration: e.target.value})} /></div>
            <div style={{ flex: 1 }}><Input label="Preço (ex: 45.00)" type="number" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} /></div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
               <Button onClick={handleAdd}><Check size={18}/></Button>
               <Button variant="secondary" onClick={() => setIsAdding(false)}><X size={18}/></Button>
            </div>
          </div>
        </Card>
      )}

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
            {services.map((service) => (
              <tr key={service.id} style={{ borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--bg-surface)" }}>
                <td style={{ padding: "16px", fontWeight: "bold" }}>{service.name}</td>
                <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{service.duration}</td>
                <td style={{ padding: "16px", fontWeight: "bold", color: "var(--blue-dark)" }}>R$ {service.price}</td>
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
                  <button onClick={() => handleDelete(service.id)} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--red-accent)" }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
               <tr><td colSpan="5" style={{ padding: "24px", textAlign: "center", color: "var(--text-secondary)" }}>Nenhum serviço configurado.</td></tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
