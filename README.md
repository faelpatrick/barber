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
- `dist/` é a saída final do Vite
- `.htaccess` na raiz do repositório faz a Hostinger servir o conteúdo compilado de `dist/`
- `public/.htaccess` continua a ser copiado para `dist/` e garante o fallback de SPA dentro da build

## Validação após deploy

- A landing page abre em `barber.faelpatrick.com`
- O layout funciona bem em telemóvel
- Os botões fazem scroll para as secções certas
- A secção de serviços aparece com os preços corretos
- `https://barber.faelpatrick.com/src/main.js` deve deixar de abrir
- `https://barber.faelpatrick.com/favicon.svg` deve funcionar sem usar `/public/`

## Deploy na Hostinger

1. Corre `npm run build` antes do commit final da etapa.
2. Faz push normal para `main`.
3. A Hostinger pode continuar a publicar a raiz do repositório.
4. O `.htaccess` da raiz redireciona o domínio para a build dentro de `dist/`.

Assim o domínio deixa de servir `src/main.js` e passa a servir a app compilada.
