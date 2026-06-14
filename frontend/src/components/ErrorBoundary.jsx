import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", textAlign: "center", minHeight: "100vh", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h1 style={{ color: "var(--red-accent)", marginBottom: "16px" }}>Ops! Algo deu errado.</h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "32px", maxWidth: "400px" }}>
            Tivemos um problema inesperado ao carregar esta tela. Mas não se preocupe, você pode voltar para a página inicial.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="btn-primary"
            style={{ padding: "12px 24px", fontSize: "1rem", cursor: "pointer" }}
          >
            Voltar para o Início
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
