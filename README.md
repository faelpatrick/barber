# Guilherme Barbershop

Projeto base em Vue 3 + Vite + Vuetify para validar o primeiro deploy em `barber.faelpatrick.com`.

## Stack

- Vue 3
- Vite
- Vuetify
- JavaScript

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Estrutura

```txt
src/
  assets/
  components/
    ServiceCard.vue
  data/
    services.js
  layouts/
    DefaultLayout.vue
  pages/
    HomePage.vue
  App.vue
  main.js
public/
  .htaccess
```

## Observações desta etapa

- Sem backend
- Sem base de dados
- Sem autenticação real
- `vite.config.js` usa `base: "/"` para o subdomínio
- `public/.htaccess` já prepara o deploy para SPA na Hostinger

## Validação após deploy

- A landing page abre em `barber.faelpatrick.com`
- O layout funciona bem em telemóvel
- Os botões fazem scroll para as secções certas
- A secção de serviços aparece com os preços corretos
