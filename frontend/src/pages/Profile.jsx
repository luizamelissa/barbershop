import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { Camera } from "lucide-react";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    email: user?.email || ""
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <div>
      <h1 className="mb-4">Meu Perfil</h1>
      
      <Card style={{ maxWidth: "700px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px", position: "relative" }}>
          <div style={{ 
            width: "120px", height: "120px", borderRadius: "50%", 
            backgroundColor: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", border: "2px solid var(--border-color)", position: "relative"
          }}>
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontSize: "3rem", color: "var(--text-secondary)" }}>
                {formData.firstName ? formData.firstName.charAt(0).toUpperCase() : "U"}
              </span>
            )}
            
            <label style={{ 
              position: "absolute", bottom: 0, left: 0, right: 0, 
              backgroundColor: "rgba(0,0,0,0.6)", color: "#fff", 
              textAlign: "center", padding: "4px 0", cursor: "pointer", fontSize: "0.8rem" 
            }}>
              <Camera size={16} />
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
            </label>
          </div>
          <p style={{ marginTop: "12px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>Clique na imagem para alterar</p>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <Input label="Nome" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div style={{ flex: 1 }}>
              <Input label="Sobrenome" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          
          <Input label="Telefone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
          
          <div className="input-group">
            <label>E-mail</label>
            <input type="email" value={formData.email} disabled style={{ backgroundColor: "var(--bg-primary)", opacity: 0.7, cursor: "not-allowed" }} />
            <small style={{ color: "var(--text-secondary)", marginTop: "4px" }}>O e-mail não pode ser alterado.</small>
          </div>
          
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
            <Button type="submit">Salvar Alterações</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
