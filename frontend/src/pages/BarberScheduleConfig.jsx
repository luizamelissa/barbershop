import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { Save } from "lucide-react";
import { getStorageData, setStorageData } from "../services/storage";

export default function BarberScheduleConfig() {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const config = getStorageData("atlas_config");
    if (config && config.days) {
      setDays(config.days);
    }
  }, []);

  const handleChange = (index, field, value) => {
    const newDays = [...days];
    newDays[index][field] = value;
    setDays(newDays);
  };

  const handleSave = () => {
    const config = getStorageData("atlas_config") || {};
    config.days = days;
    setStorageData("atlas_config", config);
    alert("Horários atualizados com sucesso!");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ margin: 0 }}>Horários de Funcionamento</h1>
        <Button onClick={handleSave}><Save size={18} /> Salvar Configurações</Button>
      </div>

      <Card>
        <h2 style={{ marginBottom: "24px", color: "var(--blue-dark)" }}>Jornada Semanal</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {days.map((day, idx) => (
            <div key={idx} style={{ 
              display: "flex", alignItems: "center", justifyContent: "space-between", 
              padding: "16px", backgroundColor: "var(--bg-primary)", borderRadius: "8px",
              opacity: day.active ? 1 : 0.6
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", width: "200px" }}>
                <input 
                  type="checkbox" 
                  checked={day.active} 
                  onChange={(e) => handleChange(idx, "active", e.target.checked)}
                  style={{ width: "20px", height: "20px" }} 
                />
                <span style={{ fontWeight: "bold" }}>{day.name}</span>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, maxWidth: "400px" }}>
                <Input 
                  type="time" 
                  value={day.start} 
                  onChange={(e) => handleChange(idx, "start", e.target.value)}
                  disabled={!day.active} 
                  style={{ marginBottom: 0 }} 
                />
                <span>até</span>
                <Input 
                  type="time" 
                  value={day.end} 
                  onChange={(e) => handleChange(idx, "end", e.target.value)}
                  disabled={!day.active} 
                  style={{ marginBottom: 0 }} 
                />
              </div>
              
              <div style={{ width: "100px", textAlign: "right" }}>
                <span style={{ color: day.active ? "green" : "red", fontSize: "0.9rem", fontWeight: "bold" }}>
                  {day.active ? "Aberto" : "Fechado"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
