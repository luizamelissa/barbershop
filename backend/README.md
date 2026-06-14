# Barbearia Atlas - Backend API

Esta é a API REST completa para o sistema da Barbearia Atlas. Ela foi construída com Node.js, Express, e utiliza o Firebase Admin SDK para gerenciar dados no Firestore de maneira segura, além de gerenciar a autenticação de clientes, barbeiros e administradores.

## 🚀 Tecnologias

- **Node.js + Express**: Servidor e rotas da API.
- **Firebase Admin SDK**: Acesso privilegiado ao banco de dados Firestore e criação de tokens personalizados.
- **Firebase Client SDK**: Autenticação (Login com Email/Senha e Google).
- **Dotenv**: Gerenciamento de variáveis de ambiente.

## 🛠 Como Instalar e Rodar Localmente

1. Entre na pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as Variáveis de Ambiente:
   - Copie o arquivo `.env.example` e renomeie para `.env`.
   - Acesse o [Console do Firebase](https://console.firebase.google.com/), vá em **Configurações do Projeto > Contas de Serviço**, e gere uma nova chave privada. Copie o `project_id`, `client_email` e a `private_key` para o `.env`.
   - Adicione também as variáveis de cliente do seu app web.

4. Inicie o servidor:
   ```bash
   npm run dev
   # ou
   node src/server.js
   ```
   
   O servidor iniciará, por padrão, em `http://localhost:3000`.

## 🧪 Como Testar as Rotas (Postman / Insomnia)

Você pode importar as rotas no Postman ou Insomnia. A URL base é `http://localhost:3000/api`.

### Autenticação (`/api/auth`)
- **`POST /api/auth/register`**
  - **Body (JSON)**: `{"email": "teste@email.com", "password": "123456", "name": "Nome", "role": "client"}`
  - Cria um usuário no Firebase Auth e cria o perfil no Firestore.
- **`POST /api/auth/login`**
  - **Body (JSON)**: `{"email": "teste@email.com", "password": "123456"}`
  - Retorna o token de autenticação e os dados do usuário.

### Serviços (`/api/services`)
- **`GET /api/services`**: Lista todos os serviços ativos.
- **`POST /api/services`**: Cria um novo serviço. (Requer role: admin)
- **`PUT /api/services/:id`**: Atualiza um serviço existente.
- **`DELETE /api/services/:id`**: Remove (ou desativa) um serviço.

### Profissionais (`/api/barbers`)
- **`GET /api/barbers`**: Lista todos os profissionais.
- **`POST /api/barbers`**: Cria um novo profissional.
- **`PUT /api/barbers/:id`**: Atualiza um profissional.
- **`DELETE /api/barbers/:id`**: Remove um profissional.

### Agendamentos (`/api/appointments`)
- **`GET /api/appointments`**: Lista agendamentos (filtra por userId se for cliente).
- **`POST /api/appointments`**: Cria um novo agendamento. Se confirmado, cria também um registro financeiro correspondente.
- **`PUT /api/appointments/:id/status`**: Atualiza o status (`concluido`, `cancelado`, `falta`). Se cancelado, remove o registro financeiro atrelado.
- **`DELETE /api/appointments/:id`**: Apaga o agendamento e a movimentação financeira.

### Financeiro (`/api/finance`)
- **`GET /api/finance`**: Lista as transações de entrada e saída.
- **`DELETE /api/finance/:id`**: Deleta uma movimentação manualmente.

### Relatórios (`/api/reports`)
- **`GET /api/reports/dashboard`**: Traz o resumo geral (clientes totais, atendimentos hoje, receita, etc).
- **`GET /api/reports/finance`**: Traz receita agregada por mês.
- **`GET /api/reports/services`**: Traz o ranking de serviços mais realizados.
- **`GET /api/reports/clients`**: Compara clientes novos vs recorrentes.
- **`GET /api/reports/schedules`**: Agrupa e mostra os horários de pico.

---
**Nota sobre Segurança**: Em um ambiente de produção real, é necessário passar o token JWT no cabeçalho `Authorization: Bearer <TOKEN>` para que o middleware de autenticação libere o acesso e injete o `req.user`.
