import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Schedule() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const services = ["Corte Clássico", "Barba Terapia", "Corte + Barba", "Pigmentação"];
  const barbers = ["Carlos Machado", "Roberto Almeida", "Fernando Silva"];
  const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  const handleNext = () => setStep(step + 1);
  const handleFinish = () => navigate("/payment");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <Navbar />
      <div className="container" style={{ padding: "40px 20px" }}>
        <h2 className="text-center mb-4">Agendar Horário</h2>
        
        <Card style={{ maxWidth: "600px", margin: "0 auto" }}>
          {step === 1 && (
            <div>
              <h3>1. Escolha o Serviço</h3>
              <div className="input-group mt-2">
                <select defaultValue="">
                  <option value="" disabled>Selecione um serviço...</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <Button onClick={handleNext} style={{ width: "100%", marginTop: "16px" }}>Continuar</Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3>2. Escolha o Profissional</h3>
              <div className="input-group mt-2">
                <select defaultValue="">
                  <option value="" disabled>Selecione o barbeiro...</option>
                  {barbers.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <Button onClick={handleNext} style={{ width: "100%", marginTop: "16px" }}>Continuar</Button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3>3. Escolha Data e Horário</h3>
              <div style={{ display: "flex", gap: "16px" }} className="mt-2">
                <div style={{ flex: 1 }}><Input type="date" /></div>
                <div style={{ flex: 1 }}>
                  <div className="input-group">
                    <select defaultValue="">
                      <option value="" disabled>Horário...</option>
                      {times.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <Button onClick={handleFinish} style={{ width: "100%", marginTop: "16px" }}>Ir para Pagamento</Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
