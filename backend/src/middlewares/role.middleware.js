const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    if (req.user.role && allowedRoles.includes(req.user.role)) {
      return next();
    }

    return res.status(403).json({ message: 'Acesso negado: Permissão insuficiente.' });
  };
};

export { checkRole };
