// Inicializa chaves no localStorage se elas não existirem
export const initStorage = () => {
  const defaults = {
    atlas_users: [],
    atlas_appointments: [],
    atlas_transactions: [],
    atlas_reviews: [],
    atlas_services: [],
    atlas_barbers: [],
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
