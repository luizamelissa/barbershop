import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--brown-dark)",
        color: "#EAEAEA",
        padding: "40px 0 20px",
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "32px",
          marginBottom: "32px",
        }}
      >
        <div>
          <h2
            style={{
              color: "#ffffff",
              marginBottom: "16px",
              fontFamily: "var(--font-primary)",
            }}
          >
            BARBEARIA ATLAS
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#cccccc" }}>
            Tradição e excelência em cada corte. O melhor ambiente para cuidar do
            seu estilo e bem-estar.
          </p>
        </div>

        <div>
          <h3 style={{ color: "#ffffff", marginBottom: "16px" }}>Contato</h3>
          <p>📍 Rua das Flores, 123 - Centro</p>
          <p>📞 (11) 99999-9999</p>
          <p>✉️ contato@barbeariaatlas.com</p>
        </div>

        <div>
          <h3 style={{ color: "#ffffff", marginBottom: "16px" }}>
            Redes Sociais
          </h3>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="#" style={{ color: "#EAEAEA" }}>
              <FaInstagram size={24} />
            </a>
            <a href="#" style={{ color: "#EAEAEA" }}>
              <FaFacebook size={24} />
            </a>
            <a href="#" style={{ color: "#EAEAEA" }}>
              <FaXTwitter size={24} />
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "20px",
          fontSize: "0.85rem",
          color: "#aaaaaa",
        }}
      >
        &copy; {new Date().getFullYear()} Barbearia Atlas. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}