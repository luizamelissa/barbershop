# 💈 Barbearia Atlas

Sistema web para gerenciamento de barbearia.

---

## 🧰 Tecnologias

- Frontend: React + Vite  
- Backend: Node.js + Express  
- Banco de dados: Firebase Firestore  
- Autenticação: Firebase Auth + JWT  
- Login com Google

---

## ⚙️ Funcionalidades

- Autenticação (email/senha e Google)
- Cadastro e listagem de serviços
- Cadastro de profissionais (barbeiros)
- Agendamentos com método de pagamento
- Controle financeiro
- Relatórios e dashboard

---

## 🔗 Principais Rotas da API

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/google`

### Serviços
- `GET /api/services`
- `POST /api/services`
- `DELETE /api/services/:id`

### Agendamentos
- `GET /api/appointments`
- `POST /api/appointments`
- `DELETE /api/appointments/:id`

### Relatórios
- `GET /api/reports/dashboard`

## ▶️ Como Rodar

### Backend
```bash
cd backend
npm install
npm run dev
```

Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis:

```
PORT=3000
JWT_SECRET=sua_chave
FIREBASE_PROJECT_ID=xxxx
FIREBASE_CLIENT_EMAIL=xxxx
FIREBASE_PRIVATE_KEY=xxxx
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### 🔑 Login com Google

1. Popup do Google no frontend.
2. Token enviado ao backend.
3. Usuário criado automaticamente.
4. JWT retornado.

### 🚀 Status

- ✔ Frontend pronto
- ✔ Backend estruturado
- ✔ Firebase integrado
- 🛠 Ajustes finais em andamento

link do site: https://barbeariaatlas.netlify.app/login
