import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

// Inicialização do App
const app = express();

// Middlewares Globais
app.use(cors());
app.use(express.json()); // Permite ler JSON no body
app.use(express.urlencoded({ extended: true }));

// Importação das Rotas
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import servicesRoutes from "./routes/services.routes.js";
import barbersRoutes from "./routes/barbers.routes.js";
import appointmentsRoutes from "./routes/appointments.routes.js";
import financeRoutes from "./routes/finance.routes.js";
import reportsRoutes from "./routes/reports.routes.js";

// Definição dos Endpoints Base
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/barbers', barbersRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/reports', reportsRoutes);

// Rota de Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Barbearia Atlas API está rodando perfeitamente! 🚀' });
});

// Middleware de tratamento de rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "Rota não encontrada." });
});

// Middleware genérico de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno no servidor." });
});

// Iniciar o Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
});
