import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import { CheckCircle, Star, MapPin, Clock, Phone, Scissors } from "lucide-react";
import logo1fundo from "../assets/logo1fundo.png";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section id="inicio" style={styles.hero}>
        <div className="container" style={{ textAlign: "center", color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={logo1fundo} alt="Logo Atlas" style={{ height: "120px", marginBottom: "24px", objectFit: "contain" }} />
          <h1 style={{ color: "#ffffff", fontSize: "3.5rem", marginBottom: "16px" }}>Barbearia Atlas</h1>
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
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "24px", color: "var(--blue-dark)" }} className="text-brand">Sobre Nós</h2>
          <p style={{ fontSize: "1.2rem", marginBottom: "24px", color: "var(--text-secondary)" }}>
            Fundada em 2026, a Barbearia Atlas nasceu com o propósito de resgatar a autêntica experiência de barbearia. Não somos apenas um salão de cortes, somos um refúgio para o homem moderno que valoriza um bom papo, estilo refinado e um momento de cuidado pessoal.
          </p>
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)" }}>
            Nossos profissionais são altamente qualificados nas técnicas mais tradicionais e nas tendências atuais, garantindo que você saia com o visual impecável.
          </p>
        </div>
      </section>

      {/* Por que escolher */}
      <section style={{ backgroundColor: "var(--blue-dark)", padding: "80px 0", color: "#ffffff" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", color: "#ffffff", marginBottom: "48px", fontSize: "2.5rem" }}>Por que escolher a Barbearia Atlas?</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "32px" }}>
            <div style={styles.featureBox}>
              <Star size={40} color="var(--red-accent)" style={{ marginBottom: "16px" }} />
              <h3 style={{ color: "#ffffff", marginBottom: "12px" }}>Atendimento Premium</h3>
              <p style={{ color: "#cccccc" }}>Nosso foco absoluto é a sua satisfação. Desde o café de boas-vindas até o último ajuste do corte.</p>
            </div>
            <div style={styles.featureBox}>
              <Scissors size={40} color="var(--red-accent)" style={{ marginBottom: "16px" }} />
              <h3 style={{ color: "#ffffff", marginBottom: "12px" }}>Profissionais Qualificados</h3>
              <p style={{ color: "#cccccc" }}>Nossa equipe é formada por especialistas que dominam visagismo e as melhores técnicas de barber shop.</p>
            </div>
            <div style={styles.featureBox}>
              <CheckCircle size={40} color="var(--red-accent)" style={{ marginBottom: "16px" }} />
              <h3 style={{ color: "#ffffff", marginBottom: "12px" }}>Ambiente Confortável</h3>
              <p style={{ color: "#cccccc" }}>Um espaço climatizado, com música boa, TV e cerveja gelada esperando por você.</p>
            </div>
            <div style={styles.featureBox}>
              <Clock size={40} color="var(--red-accent)" style={{ marginBottom: "16px" }} />
              <h3 style={{ color: "#ffffff", marginBottom: "12px" }}>Tradição e Estilo</h3>
              <p style={{ color: "#cccccc" }}>Unimos a cultura clássica da barbearia raiz com as inovações estéticas contemporâneas.</p>
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
                <p style={{ color: "var(--text-secondary)" }}>Centro<br/>Acopiara - CE</p>
              </div>
            </div>
            <div style={styles.contactItem}>
              <Phone color="var(--red-accent)" />
              <div>
                <strong>Telefone / WhatsApp</strong>
                <p style={{ color: "var(--text-secondary)" }}>(88) 99999-9999</p>
              </div>
            </div>
            <div style={styles.contactItem}>
              <Clock color="var(--red-accent)" />
              <div>
                <strong>Horário de Funcionamento</strong>
                <p style={{ color: "var(--text-secondary)" }}>Segunda a Sábado: 08h às 20h<br/>Domingo: Fechado</p>
              </div>
            </div>
          </Card>
          
          <div style={{ backgroundColor: "var(--border-color)", borderRadius: "8px", overflow: "hidden", minHeight: "300px" }}>
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15814.787680267798!2d-39.4632!3d-6.0963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a2f913d31b26ef%3A0xcafdbd443c68f184!2sAcopiara%2C%20CE!5e0!3m2!1spt-BR!2sbr!4v1718220000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Acopiara"
             ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    backgroundColor: "var(--brown-dark)",
    backgroundImage: "linear-gradient(to bottom, rgba(43, 20, 7, 0.85), rgba(0, 61, 143, 0.95))",
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
