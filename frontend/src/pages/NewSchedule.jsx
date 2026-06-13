import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { CheckCircle, CreditCard, Star } from "lucide-react";

export default function NewSchedule() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    barber: "",
    date: "",
    time: "",
    rating: 0
  });

  const handleNext = () => setStep(step + 1);
  const handleFinish = () => {
    alert("Agendamento Concluído com sucesso!");
    navigate("/client/dashboard");
  };

  return (
    <div>
      <h1 className="mb-4">Novo Agendamento</h1>
      
      <Card style={{ maxWidth: "600px", margin: "0 auto" }}>
        
        {/* Progress Bar Visual */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px", position: "relative" }}>
          <div style={{ position: "absolute", top: "12px", left: "0", right: "0", height: "2px", backgroundColor: "var(--border-color)", zIndex: 1 }}></div>
          {[1, 2, 3, 4].map(num => (
            <div key={num} style={{ 
              width: "26px", height: "26px", borderRadius: "50%", 
              backgroundColor: step >= num ? "var(--red-accent)" : "var(--bg-primary)",
              color: step >= num ? "#fff" : "var(--text-secondary)",
              display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
              fontWeight: "bold", border: `2px solid ${step >= num ? "var(--red-accent)" : "var(--border-color)"}`
            }}>
              {num}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h3 className="mb-4">Serviço e Profissional</h3>
            <Input 
              label="Qual serviço deseja?" 
              placeholder="Ex: Corte Clássico" 
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
            />
            <div className="input-group mt-2">
              <label>Escolha o Barbeiro</label>
              <select value={formData.barber} onChange={(e) => setFormData({...formData, barber: e.target.value})}>
                <option value="" disabled>Selecione...</option>
                <option value="Carlos Machado">Carlos Machado</option>
                <option value="Roberto Almeida">Roberto Almeida</option>
                <option value="Fernando Silva">Fernando Silva</option>
              </select>
            </div>
            <Button onClick={handleNext} style={{ width: "100%", marginTop: "16px" }} disabled={!formData.service || !formData.barber}>
              Próximo
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="mb-4">Data e Horário</h3>
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <Input 
                  label="Data" 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Input 
                  label="Horário" 
                  type="time" 
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
              <Button variant="secondary" onClick={() => setStep(1)} style={{ flex: 1 }}>Voltar</Button>
              <Button onClick={handleNext} style={{ flex: 1 }} disabled={!formData.date || !formData.time}>Próximo</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: "center" }}>
            <h3 className="mb-4">Pagamento (Simulação)</h3>
            <div style={{ padding: "24px", backgroundColor: "var(--bg-primary)", borderRadius: "8px", marginBottom: "24px" }}>
              <CreditCard size={48} color="var(--blue-dark)" style={{ marginBottom: "16px" }} />
              <p>Total a pagar: <strong style={{ color: "var(--red-accent)", fontSize: "1.2rem" }}>R$ 45,00</strong></p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>O pagamento real seria processado aqui.</p>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <Button variant="secondary" onClick={() => setStep(2)} style={{ flex: 1 }}>Voltar</Button>
              <Button onClick={handleNext} style={{ flex: 1 }}>Confirmar Pagamento</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign: "center" }}>
            <CheckCircle size={64} color="green" style={{ marginBottom: "16px" }} />
            <h3 className="mb-2">Tudo Certo!</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>Seu agendamento foi confirmado.</p>
            
            <div style={{ marginBottom: "32px" }}>
              <p style={{ marginBottom: "8px", fontWeight: "bold" }}>Avalie nosso atendimento visual:</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    size={32} 
                    color={formData.rating >= star ? "#fbbf24" : "var(--border-color)"} 
                    fill={formData.rating >= star ? "#fbbf24" : "none"}
                    onClick={() => setFormData({...formData, rating: star})}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </div>

            <Button onClick={handleFinish} style={{ width: "100%" }}>Ver Meus Agendamentos</Button>
          </div>
        )}

      </Card>
    </div>
  );
}
