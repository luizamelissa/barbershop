import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Star } from "lucide-react";
import { getStorageData } from "../services/storage";

export default function BarberReviews() {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const revs = getStorageData("atlas_reviews") || [];
    setReviews(revs);
    
    if (revs.length > 0) {
      const sum = revs.reduce((acc, curr) => acc + curr.rating, 0);
      setAverage((sum / revs.length).toFixed(1));
    }
  }, []);

  return (
    <div>
      <h1 className="mb-4">Avaliações dos Clientes</h1>
      
      <div style={{ display: "flex", gap: "24px", marginBottom: "32px", flexWrap: "wrap" }}>
        <Card style={{ flex: 1, minWidth: "250px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h2 style={{ fontSize: "3rem", color: "var(--blue-dark)" }}>{average > 0 ? average : "-"}</h2>
          <div style={{ display: "flex", gap: "4px", color: "#fbbf24" }}>
            {[1, 2, 3, 4, 5].map(s => <Star key={s} fill={s <= Math.round(average) ? "#fbbf24" : "none"} color={s <= Math.round(average) ? "#fbbf24" : "var(--border-color)"} />)}
          </div>
          <p style={{ marginTop: "8px", color: "var(--text-secondary)" }}>Média baseada em {reviews.length} avaliações</p>
        </Card>
        
        <div style={{ flex: 2, minWidth: "300px", display: "flex", flexDirection: "column", gap: "8px" }}>
           {[5,4,3,2,1].map(stars => {
             const count = reviews.filter(r => r.rating === stars).length;
             const percent = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
             return (
               <div key={stars} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                 <span style={{ width: "40px", textAlign: "right" }}>{stars} <Star size={12} fill="var(--text-secondary)" color="var(--text-secondary)" /></span>
                 <div style={{ flex: 1, height: "8px", backgroundColor: "var(--bg-primary)", borderRadius: "4px", overflow: "hidden" }}>
                   <div style={{ width: `${percent}%`, height: "100%", backgroundColor: "var(--red-accent)" }}></div>
                 </div>
                 <span style={{ width: "30px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>{percent}%</span>
               </div>
             )
           })}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {reviews.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Nenhuma avaliação registrada ainda.</p>
        ) : (
          reviews.map(r => (
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
          ))
        )}
      </div>
    </div>
  );
}
