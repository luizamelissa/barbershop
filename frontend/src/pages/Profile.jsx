import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { UserCircle } from "lucide-react";

export default function Profile() {
  const handleSave = (e) => {
    e.preventDefault();
    alert("Perfil salvo (Mock)!");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <Navbar />
      <div className="container" style={{ padding: "40px 20px" }}>
        <h2 className="mb-4 text-center">Meu Perfil</h2>
        
        <Card style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <UserCircle size={80} color="var(--blue-dark)" />
            <p style={{ marginTop: "8px", color: "var(--red-accent)", cursor: "pointer", fontWeight: "bold" }}>Alterar Foto</p>
          </div>

          <form onSubmit={handleSave}>
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}><Input label="Nome" defaultValue="João" /></div>
              <div style={{ flex: 1 }}><Input label="Sobrenome" defaultValue="Silva" /></div>
            </div>
            <Input label="Telefone" defaultValue="(11) 99999-9999" />
            <Input label="E-mail" defaultValue="joao.silva@email.com" readOnly style={{ backgroundColor: "#f5f5f5" }} />
            
            <Button type="submit" style={{ width: "100%", marginTop: "16px" }}>Salvar Alterações</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
