import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { Save } from "lucide-react";

export default function BarberScheduleConfig() {
  const days = [
    { name: "Segunda-feira", active: true, start: "09:00", end: "20:00" },
    { name: "Terça-feira", active: true, start: "09:00", end: "20:00" },
    { name: "Quarta-feira", active: true, start: "09:00", end: "20:00" },
    { name: "Quinta-feira", active: true, start: "09:00", end: "20:00" },
    { name: "Sexta-feira", active: true, start: "09:00", end: "21:00" },
    { name: "Sábado", active: true, start: "08:00", end: "19:00" },
    { name: "Domingo", active: false, start: "", end: "" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ margin: 0 }}>Horários de Funcionamento</h1>
        <Button><Save size={18} /> Salvar Configurações</Button>
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
                <input type="checkbox" defaultChecked={day.active} style={{ width: "20px", height: "20px" }} />
                <span style={{ fontWeight: "bold" }}>{day.name}</span>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, maxWidth: "400px" }}>
                <Input type="time" defaultValue={day.start} disabled={!day.active} style={{ marginBottom: 0 }} />
                <span>até</span>
                <Input type="time" defaultValue={day.end} disabled={!day.active} style={{ marginBottom: 0 }} />
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
