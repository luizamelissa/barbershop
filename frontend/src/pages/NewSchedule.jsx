import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { CheckCircle, CreditCard, Banknote, QrCode, Scissors, User as UserIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getStorageData, setStorageData } from "../services/storage";

export default function NewSchedule() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  
  const [formData, setFormData] = useState({
    serviceId: "",
    barberId: "",
    date: "",
    time: "",
    paymentMethod: ""
  });

  useEffect(() => {
    const allServices = getStorageData("atlas_services") || [];
    setServices(allServices.filter(s => s.active));
    
    const allBarbers = getStorageData("atlas_barbers") || [];
    setBarbers(allBarbers.filter(b => b.active));
  }, []);

  const selectedService = services.find(s => s.id.toString() === formData.serviceId?.toString());
  const selectedBarber = barbers.find(b => b.id.toString() === formData.barberId?.toString());

  const handleNext = () => setStep(step + 1);
  
  const handleFinish = () => {
    // Save Appointment
    const newApp = {
      id: Date.now().toString(),
      clientId: user.id,
      clientName: user.firstName + " " + (user.lastName || ""),
      serviceId: formData.serviceId,
      serviceName: selectedService.name,
      barberId: formData.barberId,
      barberName: selectedBarber.name,
      price: selectedService.price,
      date: formData.date,
      time: formData.time,
      paymentMethod: formData.paymentMethod,
      status: "Confirmado"
    };

    const apps = getStorageData("atlas_appointments") || [];
    setStorageData("atlas_appointments", [...apps, newApp]);

    // Save Transaction
    const newTx = {
      id: Date.now().toString(),
      desc: `${selectedService.name} - ${user.firstName}`,
      type: "entrada",
      value: `R$ ${selectedService.price}`,
      date: new Date().toLocaleDateString("pt-BR")
    };
    const txs = getStorageData("atlas_transactions") || [];
    setStorageData("atlas_transactions", [newTx, ...txs]);

    alert("Agendamento e Pagamento concluídos com sucesso!");
    navigate("/client/dashboard");
  };

  return (
    <div>
      <h1 className="mb-4">Novo Agendamento</h1>
      
      <Card style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Progress Bar Visual */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px", position: "relative" }}>
          <div style={{ position: "absolute", top: "12px", left: "0", right: "0", height: "2px", backgroundColor: "var(--border-color)", zIndex: 1 }}></div>
          {[1, 2, 3, 4, 5].map(num => (
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
            <h3 className="mb-4 text-center">Escolha o Serviço</h3>
            {services.length === 0 ? (
              <p className="text-center" style={{ color: "var(--text-secondary)" }}>Nenhum serviço disponível no momento.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                {services.map(s => (
                  <div 
                    key={s.id} 
                    onClick={() => setFormData({...formData, serviceId: s.id})}
                    style={{ 
                      border: `2px solid ${formData.serviceId === s.id ? 'var(--blue-dark)' : 'var(--border-color)'}`,
                      borderRadius: "12px", padding: "16px", cursor: "pointer",
                      backgroundColor: formData.serviceId === s.id ? 'rgba(0, 61, 143, 0.05)' : 'var(--bg-surface)',
                      transition: "all 0.2s", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px"
                    }}
                  >
                    <div style={{ width: "80px", height: "80px", borderRadius: "12px", backgroundColor: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {s.image ? (
                        <img src={s.image} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <Scissors size={32} color="var(--text-secondary)" />
                      )}
                    </div>
                    <div>
                      <h4 style={{ margin: "0 0 4px 0", color: "var(--text-primary)" }}>{s.name}</h4>
                      <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "8px" }}>{s.duration}</div>
                      <strong style={{ color: "var(--brand-red)", fontSize: "1.1rem" }}>R$ {s.price}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
              <Button onClick={handleNext} disabled={!formData.serviceId}>Próximo</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="mb-4 text-center">Escolha o Profissional</h3>
            {barbers.length === 0 ? (
              <p className="text-center" style={{ color: "var(--text-secondary)" }}>Nenhum profissional disponível no momento.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                {barbers.map(b => (
                  <div 
                    key={b.id} 
                    onClick={() => setFormData({...formData, barberId: b.id})}
                    style={{ 
                      border: `2px solid ${formData.barberId === b.id ? 'var(--blue-dark)' : 'var(--border-color)'}`,
                      borderRadius: "12px", padding: "16px", cursor: "pointer",
                      backgroundColor: formData.barberId === b.id ? 'rgba(0, 61, 143, 0.05)' : 'var(--bg-surface)',
                      transition: "all 0.2s", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px"
                    }}
                  >
                    <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {b.image ? (
                        <img src={b.image} alt={b.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <UserIcon size={32} color="var(--text-secondary)" />
                      )}
                    </div>
                    <div>
                      <h4 style={{ margin: "0 0 4px 0", color: "var(--text-primary)" }}>{b.name}</h4>
                      <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{b.specialty || "Geral"}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
              <Button variant="secondary" onClick={() => setStep(1)}>Voltar</Button>
              <Button onClick={handleNext} disabled={!formData.barberId}>Próximo</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="mb-4 text-center">Data e Horário</h3>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 200px" }}>
                <Input 
                  label="Data" 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div style={{ flex: "1 1 200px" }}>
                <Input 
                  label="Horário" 
                  type="time" 
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
              <Button variant="secondary" onClick={() => setStep(2)}>Voltar</Button>
              <Button onClick={handleNext} disabled={!formData.date || !formData.time}>Próximo</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign: "center" }}>
            <h3 className="mb-4">Pagamento</h3>
            
            <div style={{ padding: "16px", backgroundColor: "var(--bg-primary)", borderRadius: "8px", marginBottom: "24px" }}>
              <p style={{ fontSize: "1.1rem" }}>Total a pagar: <strong style={{ color: "var(--red-accent)", fontSize: "1.4rem" }}>R$ {selectedService?.price}</strong></p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "24px" }}>
              <button 
                onClick={() => setFormData({...formData, paymentMethod: "pix"})}
                style={{ 
                  padding: "16px", borderRadius: "8px", border: `2px solid ${formData.paymentMethod === 'pix' ? 'var(--blue-dark)' : 'var(--border-color)'}`,
                  backgroundColor: formData.paymentMethod === 'pix' ? 'rgba(0, 61, 143, 0.1)' : 'var(--bg-surface)',
                  color: "var(--text-primary)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px"
                }}>
                <QrCode size={24} /> PIX
              </button>
              <button 
                onClick={() => setFormData({...formData, paymentMethod: "debito"})}
                style={{ 
                  padding: "16px", borderRadius: "8px", border: `2px solid ${formData.paymentMethod === 'debito' ? 'var(--blue-dark)' : 'var(--border-color)'}`,
                  backgroundColor: formData.paymentMethod === 'debito' ? 'rgba(0, 61, 143, 0.1)' : 'var(--bg-surface)',
                  color: "var(--text-primary)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px"
                }}>
                <CreditCard size={24} /> Cartão Débito
              </button>
              <button 
                onClick={() => setFormData({...formData, paymentMethod: "credito"})}
                style={{ 
                  padding: "16px", borderRadius: "8px", border: `2px solid ${formData.paymentMethod === 'credito' ? 'var(--blue-dark)' : 'var(--border-color)'}`,
                  backgroundColor: formData.paymentMethod === 'credito' ? 'rgba(0, 61, 143, 0.1)' : 'var(--bg-surface)',
                  color: "var(--text-primary)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px"
                }}>
                <CreditCard size={24} /> Cartão Crédito
              </button>
              <button 
                onClick={() => setFormData({...formData, paymentMethod: "dinheiro"})}
                style={{ 
                  padding: "16px", borderRadius: "8px", border: `2px solid ${formData.paymentMethod === 'dinheiro' ? 'var(--blue-dark)' : 'var(--border-color)'}`,
                  backgroundColor: formData.paymentMethod === 'dinheiro' ? 'rgba(0, 61, 143, 0.1)' : 'var(--bg-surface)',
                  color: "var(--text-primary)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px"
                }}>
                <Banknote size={24} /> Dinheiro
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="secondary" onClick={() => setStep(3)}>Voltar</Button>
              <Button onClick={handleNext} disabled={!formData.paymentMethod}>Confirmar Pagamento</Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div style={{ textAlign: "center" }}>
            <CheckCircle size={64} color="green" style={{ marginBottom: "16px" }} />
            <h3 className="mb-2">Sucesso!</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>Pagamento processado. Seu horário está garantido!</p>
            <Button onClick={handleFinish} style={{ width: "100%", maxWidth: "300px" }}>Concluir</Button>
          </div>
        )}

      </Card>
    </div>
  );
}
