import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { Plus, Trash2, X, Check, Image as ImageIcon } from "lucide-react";
import { getStorageData, setStorageData } from "../services/storage";

export default function BarberProfessionals() {
  const [barbers, setBarbers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newBarber, setNewBarber] = useState({ name: "", specialty: "", image: "", active: true });

  useEffect(() => {
    setBarbers(getStorageData("atlas_barbers") || []);
  }, []);

  const saveToStorage = (data) => {
    setBarbers(data);
    setStorageData("atlas_barbers", data);
  };

  const toggleStatus = (id) => {
    saveToStorage(barbers.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const handleDelete = (id) => {
    if(window.confirm("Apagar profissional?")) {
      saveToStorage(barbers.filter(b => b.id !== id));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBarber({ ...newBarber, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (newBarber.name) {
      const added = [...barbers, { ...newBarber, id: Date.now() }];
      saveToStorage(added);
      setNewBarber({ name: "", specialty: "", image: "", active: true });
      setIsAdding(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ margin: 0 }}>Profissionais / Barbeiros</h1>
        <Button onClick={() => setIsAdding(!isAdding)}><Plus size={18} /> Novo Profissional</Button>
      </div>

      {isAdding && (
        <Card style={{ marginBottom: "24px", border: "1px dashed var(--blue-dark)" }}>
          <h3 className="mb-4">Adicionar Novo Profissional</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-end" }}>
            
            <div style={{ width: "100px", height: "100px", backgroundColor: "var(--bg-primary)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid var(--border-color)" }}>
              {newBarber.image ? (
                <img src={newBarber.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <ImageIcon size={32} color="var(--text-secondary)" />
              )}
            </div>

            <div style={{ flex: "1 1 200px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem" }}>Foto de Perfil</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: "100%", padding: "10px", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--text-primary)" }} />
            </div>

            <div style={{ flex: "2 1 200px" }}><Input label="Nome Completo" value={newBarber.name} onChange={e => setNewBarber({...newBarber, name: e.target.value})} /></div>
            <div style={{ flex: "2 1 200px" }}><Input label="Especialidade (Ex: Fade, Barba)" value={newBarber.specialty} onChange={e => setNewBarber({...newBarber, specialty: e.target.value})} /></div>
            
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px", width: "100%", justifyContent: "flex-end" }}>
               <Button variant="secondary" onClick={() => setIsAdding(false)}><X size={18}/> Cancelar</Button>
               <Button onClick={handleAdd}><Check size={18}/> Salvar Profissional</Button>
            </div>
          </div>
        </Card>
      )}

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
            <tr>
              <th style={{ padding: "16px", width: "60px" }}>Foto</th>
              <th style={{ padding: "16px" }}>Nome do Profissional</th>
              <th style={{ padding: "16px" }}>Especialidade</th>
              <th style={{ padding: "16px" }}>Status</th>
              <th style={{ padding: "16px", textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {barbers.map((barber) => (
              <tr key={barber.id} style={{ borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--bg-surface)" }}>
                <td style={{ padding: "16px" }}>
                  {barber.image ? (
                    <img src={barber.image} alt={barber.name} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ImageIcon size={16} color="var(--text-secondary)" />
                    </div>
                  )}
                </td>
                <td style={{ padding: "16px", fontWeight: "bold" }}>{barber.name}</td>
                <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{barber.specialty || "Geral"}</td>
                <td style={{ padding: "16px" }}>
                  <button onClick={() => toggleStatus(barber.id)} style={{
                    border: "none", background: "none", cursor: "pointer",
                    padding: "4px 12px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "bold",
                    backgroundColor: barber.active ? "var(--bg-status-success)" : "var(--bg-status-danger)",
                    color: barber.active ? "var(--status-success)" : "var(--status-danger)"
                  }}>
                    {barber.active ? "Ativo" : "Inativo"}
                  </button>
                </td>
                <td style={{ padding: "16px", textAlign: "right" }}>
                  <button onClick={() => handleDelete(barber.id)} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--red-accent)" }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {barbers.length === 0 && (
               <tr><td colSpan="5" style={{ padding: "24px", textAlign: "center", color: "var(--text-secondary)" }}>Nenhum profissional cadastrado.</td></tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
