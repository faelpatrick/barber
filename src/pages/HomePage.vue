<script setup>
import SystemStatus from '../components/SystemStatus.vue'
import logoBarbearia from '../assets/logo-barbearia.png'
</script>

<template>
  <section class="landing-page">
    <v-container class="landing-wrap px-4 py-8 py-sm-10">
      <v-sheet class="landing-card pa-6 pa-sm-8" rounded="xl">
        <img
          :src="logoBarbearia"
          alt="Logo Guilherme Barbershop"
          class="landing-logo"
        >

        <div class="landing-copy">
          <p class="landing-name">Guilherme Barbershop</p>
          <p class="landing-tagline">Marcacoes online</p>
        </div>

        <v-btn
          class="landing-button"
          color="primary"
          size="large"
          to="/app"
        >
          Abrir app
        </v-btn>

        <v-sheet class="qr-panel pa-5" rounded="xl">
          <div class="qr-box">QR</div>
          <p class="qr-text">Aponte a camara para abrir a app</p>
        </v-sheet>
      </v-sheet>
    </v-container>

    <div class="landing-status">
      <SystemStatus />
    </div>

    <footer class="landing-footer">&copy; Guilherme Barbershop</footer>
  </section>
</template>

<style scoped>
.landing-page {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.landing-wrap {
  display: flex;
  flex: 1;
  align-items: center;
}

.landing-card {
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  display: grid;
  justify-items: center;
  gap: 1.5rem;
  background: rgba(10, 10, 10, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
  text-align: center;
}

.landing-logo {
  width: min(58vw, 220px);
  max-width: 100%;
  display: block;
}

.landing-copy {
  display: grid;
  gap: 0.4rem;
}

.landing-name {
  margin: 0;
  font-family: "Palatino Linotype", "Book Antiqua", serif;
  font-size: clamp(1.8rem, 6vw, 2.4rem);
  line-height: 1.05;
}

.landing-tagline {
  margin: 0;
  color: #d0d0d0;
  font-size: 1rem;
}

.landing-button {
  width: 100%;
  max-width: 20rem;
  color: #080808 !important;
  font-weight: 700;
}

.qr-panel {
  width: 100%;
  display: grid;
  justify-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed rgba(255, 255, 255, 0.16);
}

.qr-box {
  display: grid;
  width: 132px;
  height: 132px;
  place-items: center;
  border: 1px dashed rgba(255, 255, 255, 0.3);
  border-radius: 1.25rem;
  color: #f5f5f5;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.qr-text {
  margin: 0;
  color: #bdbdbd;
  font-size: 0.95rem;
  line-height: 1.5;
}

.landing-status {
  padding: 0 1.5rem;
}

.landing-footer {
  padding: 0.85rem 1.5rem 1.75rem;
  color: #888;
  text-align: center;
}
</style>
