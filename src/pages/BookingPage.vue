<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { services } from '../data/services'
import { clearAuthenticated } from '../utils/auth'

const router = useRouter()
const selectedServiceIds = ref([])
const showNextStepHint = ref(false)

const formatPrice = (price) =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

const isSelected = (serviceId) => selectedServiceIds.value.includes(serviceId)

const toggleService = (serviceId) => {
  showNextStepHint.value = false

  if (isSelected(serviceId)) {
    selectedServiceIds.value = selectedServiceIds.value.filter((id) => id !== serviceId)
    return
  }

  selectedServiceIds.value = [...selectedServiceIds.value, serviceId]
}

const selectedServices = computed(() =>
  services.filter((service) => selectedServiceIds.value.includes(service.id)),
)

const total = computed(() =>
  selectedServices.value.reduce((sum, service) => sum + service.price, 0),
)

const handleContinue = () => {
  if (!selectedServiceIds.value.length) {
    return
  }

  showNextStepHint.value = true
}

const handleLogout = () => {
  clearAuthenticated()
  router.replace('/login')
}
</script>

<template>
  <section class="booking-page">
    <v-container class="px-4 py-6 py-sm-8">
      <div class="booking-shell">
        <div class="booking-header">
          <div>
            <p class="booking-kicker">Barbeiro padrao</p>
            <h1 class="booking-title">Marcar horario</h1>
            <p class="booking-barber">Guilherme Araujo</p>
          </div>

          <v-btn variant="outlined" color="primary" @click="handleLogout">
            Sair
          </v-btn>
        </div>

        <v-row dense>
          <v-col
            v-for="service in services"
            :key="service.id"
            cols="12"
          >
            <v-card
              class="service-option"
              :class="{ 'service-option--selected': isSelected(service.id) }"
              flat
              @click="toggleService(service.id)"
            >
              <v-card-text class="service-option__content pa-4">
                <div>
                  <p class="service-option__name">{{ service.name }}</p>
                  <p class="service-option__meta">
                    {{ isSelected(service.id) ? 'Selecionado' : 'Toque para selecionar' }}
                  </p>
                </div>

                <p class="service-option__price">{{ formatPrice(service.price) }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-sheet class="summary-card pa-5" rounded="xl">
          <div class="summary-row">
            <span class="summary-label">Total</span>
            <strong class="summary-value">{{ formatPrice(total) }}</strong>
          </div>

          <v-btn
            color="primary"
            size="large"
            block
            :disabled="!selectedServiceIds.length"
            @click="handleContinue"
          >
            Continuar
          </v-btn>

          <p v-if="showNextStepHint" class="summary-hint">
            Proxima etapa: escolher data e hora.
          </p>
        </v-sheet>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.booking-page {
  min-height: 100vh;
}

.booking-shell {
  width: 100%;
  max-width: 42rem;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
}

.booking-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.booking-kicker {
  margin: 0 0 0.5rem;
  color: #a7a7a7;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.booking-title {
  margin: 0;
  font-family: "Palatino Linotype", "Book Antiqua", serif;
  font-size: clamp(2rem, 6vw, 2.8rem);
  line-height: 1;
}

.booking-barber {
  margin: 0.65rem 0 0;
  color: #d0d0d0;
  font-size: 1rem;
}

.service-option,
.summary-card {
  background: rgba(10, 10, 10, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.service-option {
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
}

.service-option:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.16);
}

.service-option--selected {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.22);
}

.service-option__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.service-option__name,
.service-option__price {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}

.service-option__meta {
  margin: 0.35rem 0 0;
  color: #9a9a9a;
  font-size: 0.88rem;
}

.summary-card {
  display: grid;
  gap: 1rem;
  margin-top: 0.5rem;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.summary-label {
  color: #bfbfbf;
}

.summary-value {
  font-size: 1.3rem;
}

.summary-hint {
  margin: 0;
  color: #bdbdbd;
  font-size: 0.92rem;
  line-height: 1.5;
}

@media (max-width: 599px) {
  .booking-header {
    flex-direction: column;
  }
}
</style>
