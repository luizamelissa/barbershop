import Card from "../components/Card";
import { Star } from "lucide-react";

export default function BarberReviews() {
  const reviews = [
    { id: 1, client: "Roberto Silva", rating: 5, comment: "Excelente atendimento! O Carlos manda muito bem no fade.", date: "Ontem" },
    { id: 2, client: "Lucas Mendes", rating: 5, comment: "Ambiente top, cerveja gelada e barba perfeita.", date: "Há 2 dias" },
    { id: 3, client: "Marcos Paulo", rating: 4, comment: "Muito bom, mas atrasei um pouco para ser atendido.", date: "Há 1 semana" },
  ];

  return (
    <div>
      <h1 className="mb-4">Avaliações dos Clientes</h1>
      
      <div style={{ display: "flex", gap: "24px", marginBottom: "32px" }}>
        <Card style={{ flex: 1, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h2 style={{ fontSize: "3rem", color: "var(--blue-dark)" }}>4.8</h2>
          <div style={{ display: "flex", gap: "4px", color: "#fbbf24" }}>
            <Star fill="#fbbf24" /><Star fill="#fbbf24" /><Star fill="#fbbf24" /><Star fill="#fbbf24" /><Star fill="#fbbf24" />
          </div>
          <p style={{ marginTop: "8px", color: "var(--text-secondary)" }}>Média baseada em 342 avaliações</p>
        </Card>
        <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "8px" }}>
           {/* Visual mock of rating distribution */}
           {[5,4,3,2,1].map(stars => (
             <div key={stars} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
               <span style={{ width: "40px", textAlign: "right" }}>{stars} <Star size={12} fill="var(--text-secondary)" color="var(--text-secondary)" /></span>
               <div style={{ flex: 1, height: "8px", backgroundColor: "var(--bg-primary)", borderRadius: "4px", overflow: "hidden" }}>
                 <div style={{ width: stars === 5 ? "80%" : stars === 4 ? "15%" : stars === 3 ? "5%" : "0%", height: "100%", backgroundColor: "var(--red-accent)" }}></div>
               </div>
             </div>
           ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {reviews.map(r => (
          <Card key={r.id}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <div>
                <h3 style={{ margin: 0 }}>{r.client}</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{r.date}</span>
              </div>
              <div style={{ display: "flex", color: "#fbbf24" }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < r.rating ? "#fbbf24" : "none"} color={i < r.rating ? "#fbbf24" : "var(--border-color)"} />)}
              </div>
            </div>
            <p style={{ color: "var(--text-primary)", fontStyle: "italic" }}>"{r.comment}"</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
