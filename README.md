# Guilherme Barbershop

Projeto em Vue 3 + Vite + Vuetify com backend Node.js + Express e base MySQL/MariaDB.

## Stack

- Vue 3
- Vue Router
- Vite
- Vuetify
- JavaScript
- Node.js
- Express
- MySQL / MariaDB

## Frontend

```bash
npm install
npm run dev
npm run build
```

## Backend

```bash
cd backend
npm install
npm run dev
```

## Rotas da app

- `/`
- `/app`
- `/login`
- `/agendamento`

## Endpoints

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`

## Estrutura

```txt
src/
  data/
    services.js
  layouts/
    DefaultLayout.vue
  pages/
    BookingPage.vue
    LandingPage.vue
    LoginPage.vue
  router/
    index.js
  services/
    api.js
  utils/
    auth.js
  App.vue
  main.js

backend/
  database/
    schema.sql
  src/
    db.js
    server.js
    routes/
      auth.routes.js
      health.routes.js
  .env.example
  package.json
```

## Variaveis do backend

Configura em `backend/.env` com base em [backend/.env.example](</C:/Users/rafael.souza/OneDrive - Navarra – Extrusão de Alumínio,SA/Documentos/New project/backend/.env.example>):

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `PORT`
- `CORS_ORIGIN`

## Base de dados

Executa o script [schema.sql](</C:/Users/rafael.souza/OneDrive - Navarra – Extrusão de Alumínio,SA/Documentos/New project/backend/database/schema.sql>) para criar a tabela `clientes`.

## Notas de integracao

- O frontend chama `/api` por defeito.
- Em desenvolvimento, o Vite faz proxy para `http://localhost:3001`.
- Se o frontend e o backend ficarem em origens diferentes, podes definir `VITE_API_BASE_URL` no frontend.
- O `.htaccess` da raiz deixa `/api` passar sem reescrever para a SPA.
