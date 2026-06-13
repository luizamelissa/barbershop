import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import { Scissors, CheckCircle, Star, MapPin, Clock, Phone } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div className="container" style={{ textAlign: "center", color: "#ffffff" }}>
          <Scissors size={64} color="var(--red-accent)" style={{ marginBottom: "24px" }} />
          <h1 style={{ color: "#ffffff", fontSize: "3rem", marginBottom: "16px" }}>Bem-vindo à Barbearia Atlas</h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", marginBottom: "32px", color: "#dddddd" }}>
            Tradição, estilo e excelência no seu atendimento. Descubra a melhor experiência em barbearia clássica e moderna.
          </p>
          <Link to="/login">
            <Button style={{ padding: "16px 32px", fontSize: "1.2rem" }}>Agendar Agora</Button>
          </Link>
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" className="container" style={{ padding: "80px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center" }}>
          <div style={{ flex: "1 1 400px" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "24px", color: "var(--blue-dark)" }} className="text-brand">Sobre Nós</h2>
            <p style={{ fontSize: "1.1rem", marginBottom: "16px", color: "var(--text-secondary)" }}>
              Fundada em 2026, a Barbearia Atlas nasceu com o propósito de resgatar a autêntica experiência de barbearia. Não somos apenas um salão de cortes, somos um refúgio para o homem moderno que valoriza um bom papo, estilo refinado e um momento de cuidado pessoal.
            </p>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>
              Nossos profissionais são altamente qualificados nas técnicas mais tradicionais e nas tendências atuais, garantindo que você saia com o visual impecável.
            </p>
          </div>
          <div style={{ flex: "1 1 400px", backgroundColor: "var(--border-color)", height: "300px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
            [Imagem da Barbearia]
          </div>
        </div>
      </section>

      {/* Por que escolher */}
      <section style={{ backgroundColor: "var(--blue-dark)", padding: "80px 0", color: "#ffffff" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", color: "#ffffff", marginBottom: "48px", fontSize: "2.5rem" }}>Por que escolher a Atlas?</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            <div style={styles.featureBox}>
              <CheckCircle size={40} color="var(--red-accent)" style={{ marginBottom: "16px" }} />
              <h3 style={{ color: "#ffffff", marginBottom: "12px" }}>Qualidade Impecável</h3>
              <p style={{ color: "#cccccc" }}>Utilizamos os melhores produtos do mercado e técnicas avançadas para garantir um resultado perfeito.</p>
            </div>
            <div style={styles.featureBox}>
              <Star size={40} color="var(--red-accent)" style={{ marginBottom: "16px" }} />
              <h3 style={{ color: "#ffffff", marginBottom: "12px" }}>Profissionais Experientes</h3>
              <p style={{ color: "#cccccc" }}>Nossa equipe é formada por especialistas apaixonados pelo que fazem, sempre atualizados com as tendências.</p>
            </div>
            <div style={styles.featureBox}>
              <Scissors size={40} color="var(--red-accent)" style={{ marginBottom: "16px" }} />
              <h3 style={{ color: "#ffffff", marginBottom: "12px" }}>Ambiente Premium</h3>
              <p style={{ color: "#cccccc" }}>Um espaço climatizado, com música boa, café expresso e cerveja gelada esperando por você.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contato e Localização */}
      <section id="localizacao" className="container" style={{ padding: "80px 20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "48px", fontSize: "2.5rem" }} className="text-brand">Localização e Contato</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
          <Card>
            <h3 style={{ marginBottom: "24px", color: "var(--blue-dark)" }}>Informações</h3>
            <div style={styles.contactItem}>
              <MapPin color="var(--red-accent)" />
              <div>
                <strong>Endereço</strong>
                <p style={{ color: "var(--text-secondary)" }}>Rua das Flores, 123 - Centro<br/>São Paulo, SP - 01234-567</p>
              </div>
            </div>
            <div style={styles.contactItem}>
              <Phone color="var(--red-accent)" />
              <div>
                <strong>Telefone / WhatsApp</strong>
                <p style={{ color: "var(--text-secondary)" }}>(11) 99999-9999</p>
              </div>
            </div>
            <div style={styles.contactItem}>
              <Clock color="var(--red-accent)" />
              <div>
                <strong>Horário de Funcionamento</strong>
                <p style={{ color: "var(--text-secondary)" }}>Segunda a Sábado: 09h às 20h<br/>Domingo: Fechado</p>
              </div>
            </div>
          </Card>
          
          <div style={{ backgroundColor: "var(--border-color)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", minHeight: "300px" }}>
            [Iframe Google Maps simulado]
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    backgroundColor: "var(--brown-dark)",
    backgroundImage: "linear-gradient(to bottom, rgba(43, 20, 7, 0.8), rgba(0, 61, 143, 0.8))",
    padding: "120px 20px",
  },
  featureBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: "32px",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.1)"
  },
  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "24px"
  }
};
