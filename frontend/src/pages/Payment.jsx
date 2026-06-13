import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import { CheckCircle } from "lucide-react";

export default function Payment() {
  const navigate = useNavigate();

  const handlePay = () => {
    alert("Pagamento Confirmado (Mock)!");
    navigate("/history");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <Navbar />
      <div className="container" style={{ padding: "40px 20px" }}>
        <h2 className="text-center mb-4">Pagamento</h2>
        
        <Card style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
          <CheckCircle size={48} color="var(--blue-dark)" style={{ marginBottom: "16px" }} />
          <h3>Resumo do Agendamento</h3>
          <p className="mt-2">Serviço: Corte Clássico</p>
          <p>Barbeiro: Carlos Machado</p>
          <p>Data: 20/06/2026 às 14:00</p>
          <h2 className="mt-4" style={{ color: "var(--red-accent)" }}>Total: R$ 45,00</h2>

          <div className="mt-4" style={{ textAlign: "left" }}>
            <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Forma de pagamento:</p>
            <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
              <label><input type="radio" name="pay" defaultChecked /> Cartão</label>
              <label><input type="radio" name="pay" /> Pix</label>
              <label><input type="radio" name="pay" /> Dinheiro</label>
            </div>
          </div>

          <Button onClick={handlePay} style={{ width: "100%" }}>Confirmar Pagamento</Button>
        </Card>
      </div>
    </div>
  );
}
