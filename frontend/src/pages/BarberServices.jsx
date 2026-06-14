import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { Plus, Trash2, X, Check, Image as ImageIcon } from "lucide-react";
import { getStorageData, setStorageData } from "../services/storage";

export default function BarberServices() {
  const [services, setServices] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newService, setNewService] = useState({ name: "", duration: "", price: "", image: "", active: true });

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewService({ ...newService, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (newService.name && newService.price) {
      const added = [...services, { ...newService, id: Date.now() }];
      saveToStorage(added);
      setNewService({ name: "", duration: "", price: "", image: "", active: true });
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
          <h3 className="mb-4">Adicionar Novo Serviço</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-end" }}>
            
            <div style={{ width: "100px", height: "100px", backgroundColor: "var(--bg-primary)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid var(--border-color)" }}>
              {newService.image ? (
                <img src={newService.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <ImageIcon size={32} color="var(--text-secondary)" />
              )}
            </div>

            <div style={{ flex: "1 1 200px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem" }}>Foto do Serviço</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: "100%", padding: "10px", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--text-primary)" }} />
            </div>

            <div style={{ flex: "2 1 200px" }}><Input label="Nome" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} /></div>
            <div style={{ flex: "1 1 100px" }}><Input label="Duração (ex: 40 min)" value={newService.duration} onChange={e => setNewService({...newService, duration: e.target.value})} /></div>
            <div style={{ flex: "1 1 100px" }}><Input label="Preço (ex: 45.00)" type="number" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} /></div>
            
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px", width: "100%", justifyContent: "flex-end" }}>
               <Button variant="secondary" onClick={() => setIsAdding(false)}><X size={18}/> Cancelar</Button>
               <Button onClick={handleAdd}><Check size={18}/> Salvar Serviço</Button>
            </div>
          </div>
        </Card>
      )}

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
            <tr>
              <th style={{ padding: "16px", width: "60px" }}>Foto</th>
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
                <td style={{ padding: "16px" }}>
                  {service.image ? (
                    <img src={service.image} alt={service.name} style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ImageIcon size={16} color="var(--text-secondary)" />
                    </div>
                  )}
                </td>
                <td style={{ padding: "16px", fontWeight: "bold" }}>{service.name}</td>
                <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{service.duration}</td>
                <td style={{ padding: "16px", fontWeight: "bold", color: "var(--blue-dark)" }}>R$ {service.price}</td>
                <td style={{ padding: "16px" }}>
                  <button onClick={() => toggleStatus(service.id)} style={{
                    border: "none", background: "none", cursor: "pointer",
                    padding: "4px 12px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "bold",
                    backgroundColor: service.active ? "var(--bg-status-success)" : "var(--bg-status-danger)",
                    color: service.active ? "var(--status-success)" : "var(--status-danger)"
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
               <tr><td colSpan="6" style={{ padding: "24px", textAlign: "center", color: "var(--text-secondary)" }}>Nenhum serviço configurado.</td></tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
