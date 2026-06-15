<script setup>
import guilhermePhoto from '../assets/guilherme.jpg'
import ServiceCard from '../components/ServiceCard.vue'
import { services } from '../data/services'

const futureCards = [
  {
    title: 'Marcações simples',
    text: 'A base está pronta para receber o fluxo de escolha de barbeiro, serviços, data e horário.',
  },
  {
    title: 'Agenda preparada',
    text: 'Os serviços já guardam duração internamente para suportar disponibilidade e conflitos no MVP.',
  },
  {
    title: 'Fidelidade no horizonte',
    text: 'O layout já reserva espaço para evoluir para selos, promoções e campanhas simples.',
  },
]
</script>

<template>
  <section class="home-page">
    <v-container class="px-4 py-6 py-sm-8 py-md-10">
      <v-sheet class="hero-panel pa-5 pa-sm-6 pa-md-8 mb-6" rounded="xl">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">Guilherme Barbershop</p>
            <h1 class="hero-title">A tua barbearia, agora também online.</h1>
            <p class="hero-subtitle">Marcações, serviços e fidelidade num só lugar.</p>

            <div class="hero-actions">
              <v-btn class="hero-primary-btn" color="primary" href="#mvp" size="large">
                Abrir app
              </v-btn>
              <v-btn color="primary" href="#servicos" size="large" variant="outlined">
                Ver serviços
              </v-btn>
            </div>
          </div>

          <div class="hero-side">
            <v-sheet class="profile-card" rounded="xl">
              <img
                :src="guilhermePhoto"
                alt="Guilherme Araujo"
                class="profile-image"
              >

              <div class="profile-copy pa-5">
                <p class="profile-kicker">Barbeiro em destaque</p>
                <p class="profile-name">Guilherme Araujo</p>
                <p class="profile-text">
                  O primeiro rosto do MVP já aparece aqui como referência para os testes e para a identidade da barbearia.
                </p>
              </div>
            </v-sheet>

            <v-sheet class="qr-panel pa-5 pa-sm-6" rounded="xl">
              <div class="qr-placeholder">QR</div>
              <p class="qr-title">QR Code em breve</p>
              <p class="qr-text">Aqui ficará o acesso rápido para clientes entrarem na app no salão.</p>
            </v-sheet>
          </div>
        </div>
      </v-sheet>

      <v-row id="mvp" class="mb-6" dense>
        <v-col
          v-for="card in futureCards"
          :key="card.title"
          cols="12"
          md="4"
        >
          <v-card class="feature-card h-100" flat>
            <v-card-text class="pa-5">
              <p class="feature-title">{{ card.title }}</p>
              <p class="feature-text">{{ card.text }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <section id="servicos" class="services-section">
        <div class="section-header">
          <div>
            <p class="eyebrow">Serviços</p>
            <h2 class="section-title">Serviços iniciais para o MVP</h2>
          </div>
          <p class="section-text">
            O cliente vê apenas nome, descrição e preço. O tempo fica guardado nos dados para a futura lógica da agenda.
          </p>
        </div>

        <v-row dense>
          <v-col
            v-for="service in services"
            :key="service.id"
            cols="12"
            sm="6"
            lg="4"
          >
            <ServiceCard :service="service" />
          </v-col>
        </v-row>
      </section>
    </v-container>

    <footer class="footer">&copy; Guilherme Barbershop</footer>
  </section>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
}

.hero-panel {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),
    rgba(18, 18, 18, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.35);
}

.hero-grid {
  display: grid;
  gap: 1.5rem;
}

.hero-side {
  display: grid;
  gap: 1rem;
}

.eyebrow {
  margin: 0 0 0.75rem;
  color: #b3b3b3;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero-title,
.section-title {
  margin: 0;
  font-family: "Palatino Linotype", "Book Antiqua", serif;
  font-size: clamp(2.4rem, 7vw, 4.4rem);
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.hero-subtitle {
  max-width: 34rem;
  margin: 1rem 0 0;
  color: #d6d6d6;
  font-size: 1rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.hero-primary-btn {
  color: #080808 !important;
  font-weight: 700;
}

.profile-card,
.qr-panel,
.feature-card {
  background: rgba(8, 8, 8, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.profile-card {
  overflow: hidden;
}

.profile-image {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center;
}

.profile-copy {
  display: grid;
  gap: 0.45rem;
}

.profile-kicker {
  margin: 0;
  color: #b3b3b3;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.profile-name {
  margin: 0;
  font-family: "Palatino Linotype", "Book Antiqua", serif;
  font-size: 1.8rem;
  line-height: 1;
}

.profile-text,
.qr-text,
.feature-text,
.section-text {
  margin: 0;
  color: #bdbdbd;
  line-height: 1.6;
}

.qr-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
}

.qr-placeholder {
  display: grid;
  width: 104px;
  height: 104px;
  place-items: center;
  border: 1px dashed rgba(255, 255, 255, 0.28);
  border-radius: 1.5rem;
  color: #f5f5f5;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.qr-title,
.feature-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
}

.services-section {
  margin-top: 2rem;
}

.section-header {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: clamp(1.8rem, 5vw, 2.8rem);
}

.footer {
  padding: 0 1.5rem 2rem;
  color: #8d8d8d;
  text-align: center;
}

@media (min-width: 960px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
    align-items: start;
  }

  .section-header {
    grid-template-columns: minmax(0, 1fr) minmax(280px, 380px);
    align-items: end;
  }
}
</style>
