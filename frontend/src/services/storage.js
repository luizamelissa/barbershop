// Inicializa chaves no localStorage se elas não existirem
export const initStorage = () => {
  const defaults = {
    atlas_users: [],
    atlas_appointments: [],
    atlas_transactions: [],
    atlas_reviews: [],
    atlas_services: [
      { id: 1, name: "Corte Clássico", duration: "40 min", price: "45.00", active: true },
      { id: 2, name: "Barba Terapia", duration: "30 min", price: "35.00", active: true },
      { id: 3, name: "Corte + Barba", duration: "1h 10min", price: "75.00", active: true }
    ],
    atlas_config: {
      days: [
        { name: "Segunda-feira", active: true, start: "09:00", end: "20:00" },
        { name: "Terça-feira", active: true, start: "09:00", end: "20:00" },
        { name: "Quarta-feira", active: true, start: "09:00", end: "20:00" },
        { name: "Quinta-feira", active: true, start: "09:00", end: "20:00" },
        { name: "Sexta-feira", active: true, start: "09:00", end: "21:00" },
        { name: "Sábado", active: true, start: "08:00", end: "19:00" },
        { name: "Domingo", active: false, start: "", end: "" },
      ]
    }
  };

  Object.keys(defaults).forEach(key => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(defaults[key]));
    }
  });
};

export const getStorageData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
