# Guilherme Barbershop

Projeto em Vue 3 + Vite + Vuetify preparado para deploy em `barber.faelpatrick.com`.

## Stack

- Vue 3
- Vue Router
- Vite
- Vuetify
- JavaScript

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Rotas

- `/`
- `/app`
- `/login`
- `/agendamento`

## Fluxo atual

- A landing publica mostra apenas logo, nome, CTA e area reservada para QR Code.
- `Abrir app` envia o utilizador para `/app`.
- `/app` verifica `localStorage.gb_auth`.
- Sem sessao: redireciona para `/login`.
- Com sessao: redireciona para `/agendamento`.
- O login e mockado e guarda `gb_auth = "true"` no `localStorage`.

## Estrutura

```txt
src/
  assets/
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
  utils/
    auth.js
  App.vue
  main.js
public/
  .htaccess
```

## Deploy na Hostinger

1. Corre `npm run build` antes do push da etapa.
2. Faz push normal para `main`.
3. A Hostinger pode continuar a publicar a raiz do repositorio.
4. O `.htaccess` da raiz encaminha o dominio para a build dentro de `dist/`.

## Validacao depois do deploy

- `barber.faelpatrick.com` abre a landing simples.
- `Abrir app` envia para `/app`.
- Sem `gb_auth`, `/app` envia para `/login`.
- Depois do login mockado, o utilizador entra em `/agendamento`.
- O botao `Sair` remove `gb_auth` e volta para `/login`.
- `https://barber.faelpatrick.com/src/main.js` deixa de ficar publico.
