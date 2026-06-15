// ARQUIVO OBSOLETO: A autenticação é 100% gerenciada pelo Firebase Auth no Frontend.
// Este arquivo foi esvaziado pois não há mais necessidade de controllers de login/registro no backend.

export const register = async (req, res) => {
  return res.status(410).json({ message: "Rota obsoleta. Use o Firebase Auth no frontend." });
};

export const login = async (req, res) => {
  return res.status(410).json({ message: "Rota obsoleta. Use o Firebase Auth no frontend." });
};

export const googleLogin = async (req, res) => {
  return res.status(410).json({ message: "Rota obsoleta. Use o Firebase Auth no frontend." });
};
