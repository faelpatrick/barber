# Guilherme Barbershop Backend

API Node.js/Express do projeto Guilherme Barbershop, preparada para correr de forma independente do frontend.

## Requisitos

- Node.js 20+
- MySQL ou MariaDB

## Instalar

```bash
npm install
```

## Configurar .env

1. Copia o ficheiro `.env.example` para `.env`
2. Preenche as variaveis com os dados da tua base de dados

Exemplo:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=teu_utilizador
DB_PASSWORD=tua_password
DB_NAME=barbershop
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

## Base de dados

O script inicial da base de dados esta em:

`database/schema.sql`

Cria a base de dados no MySQL/MariaDB e executa esse script antes de testar os endpoints de autenticacao.

## Rodar localmente

Modo desenvolvimento:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

Por omissao, a API fica disponivel em:

`http://localhost:3000`

## Endpoints disponiveis

- `GET /api/health`
- `GET /api/env-check`
- `GET /api/db-test`
- `POST /api/auth/register`
- `POST /api/auth/login`

## Estrutura

```txt
backend/
  database/
    schema.sql
  src/
    routes/
    db.js
    server.js
  .env.example
  .gitignore
  package.json
  package-lock.json
  README.md
```

## Notas

- Este backend nao depende de ficheiros da raiz do frontend.
- `.env` e `node_modules` ficam ignorados pelo `.gitignore` local da pasta `backend`.
- Ainda nao existe JWT, password, SMS ou WhatsApp nesta fase do MVP.
