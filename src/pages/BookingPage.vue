<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { serviceCategories, services } from '../data/services'
import { clearAuthenticated } from '../utils/auth'

const router = useRouter()
const selectedServiceIds = ref([])
const selectedCategoryId = ref(
  serviceCategories.find((category) => category.active)?.id ?? null,
)
const showNextStepHint = ref(false)

const formatPrice = (price) =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

const activeCategories = computed(() =>
  serviceCategories.filter((category) => category.active),
)

const categoryById = computed(() =>
  Object.fromEntries(activeCategories.value.map((category) => [category.id, category])),
)

const filteredServices = computed(() =>
  services.filter(
    (service) =>
      service.active &&
      service.categoryId === selectedCategoryId.value &&
      categoryById.value[service.categoryId],
  ),
)

const selectedServices = computed(() =>
  services.filter((service) => selectedServiceIds.value.includes(service.id)),
)

const total = computed(() =>
  selectedServices.value.reduce((sum, service) => sum + service.price, 0),
)

const selectedCount = computed(() => selectedServices.value.length)

const selectCategory = (categoryId) => {
  selectedCategoryId.value = categoryId
}

const isSelected = (serviceId) => selectedServiceIds.value.includes(serviceId)

const getCategory = (categoryId) => categoryById.value[categoryId]

const getCategoryStyle = (categoryId) => {
  const category = getCategory(categoryId)
  return {
    '--category-color': category?.color ?? '#3a3a3a',
  }
}

const toggleService = (serviceId) => {
  showNextStepHint.value = false

  if (isSelected(serviceId)) {
    selectedServiceIds.value = selectedServiceIds.value.filter((id) => id !== serviceId)
    return
  }

  selectedServiceIds.value = [...selectedServiceIds.value, serviceId]
}

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
    <v-container class="booking-container px-4 py-6 py-sm-8">
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

        <div class="category-strip" role="tablist" aria-label="Categorias de servicos">
          <button
            v-for="category in activeCategories"
            :key="category.id"
            class="category-chip"
            :class="{ 'category-chip--active': selectedCategoryId === category.id }"
            :style="getCategoryStyle(category.id)"
            type="button"
            @click="selectCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>

        <div class="category-caption" :style="getCategoryStyle(selectedCategoryId)">
          <span class="category-caption__dot"></span>
          <span>
            {{
              activeCategories.find((category) => category.id === selectedCategoryId)?.name
            }}
          </span>
        </div>

        <v-row dense>
          <v-col
            v-for="service in filteredServices"
            :key="service.id"
            cols="12"
          >
            <v-card
              class="service-option"
              :class="{ 'service-option--selected': isSelected(service.id) }"
              :style="getCategoryStyle(service.categoryId)"
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
      </div>

      <v-sheet id="resumo-reserva" class="summary-card pa-4 pa-sm-5" rounded="xl">
        <div class="summary-top">
          <div>
            <p class="summary-label">Servicos selecionados</p>
            <strong class="summary-count">{{ selectedCount }}</strong>
          </div>

          <div class="summary-total">
            <span class="summary-label">Total</span>
            <strong class="summary-value">{{ formatPrice(total) }}</strong>
          </div>
        </div>

        <p
          v-if="!selectedCount"
          class="summary-message"
        >
          Escolha pelo menos um servico
        </p>
        <p
          v-else
          class="summary-message"
        >
          {{ selectedServices.map((service) => service.name).join(', ') }}
        </p>

        <v-btn
          color="primary"
          size="large"
          block
          :disabled="!selectedCount"
          @click="handleContinue"
        >
          Continuar
        </v-btn>

        <p v-if="showNextStepHint" class="summary-hint">
          Proxima etapa: escolher data e hora.
        </p>
      </v-sheet>
    </v-container>
  </section>
</template>

<style scoped>
.booking-page {
  min-height: 100vh;
}

.booking-container {
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding-bottom: 9.5rem;
}

.booking-shell {
  display: grid;
  gap: 1rem;
}

.booking-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
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

.category-strip {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: none;
}

.category-strip::-webkit-scrollbar {
  display: none;
}

.category-chip {
  flex: 0 0 auto;
  min-height: 2.7rem;
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: color-mix(in srgb, var(--category-color) 42%, rgba(255, 255, 255, 0.03));
  color: #efefef;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.category-chip--active {
  border-color: color-mix(in srgb, var(--category-color) 82%, white 18%);
  background: color-mix(in srgb, var(--category-color) 70%, rgba(255, 255, 255, 0.06));
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
}

.category-caption {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: #bdbdbd;
  font-size: 0.92rem;
}

.category-caption__dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 999px;
  background: var(--category-color);
}

.service-option,
.summary-card {
  background: rgba(10, 10, 10, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.service-option {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
}

.service-option::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 0.38rem;
  background: var(--category-color);
}

.service-option:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.16);
}

.service-option--selected {
  background: color-mix(in srgb, var(--category-color) 22%, rgba(255, 255, 255, 0.03));
  border-color: color-mix(in srgb, var(--category-color) 55%, rgba(255, 255, 255, 0.14));
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
  position: sticky;
  bottom: 1rem;
  z-index: 10;
  display: grid;
  gap: 0.9rem;
  margin-top: 1rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.38);
}

.summary-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.summary-label {
  display: block;
  margin: 0;
  color: #bfbfbf;
  font-size: 0.84rem;
}

.summary-count,
.summary-value {
  display: block;
  margin-top: 0.2rem;
  font-size: 1.3rem;
}

.summary-total {
  text-align: right;
}

.summary-message,
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

  .summary-top {
    align-items: center;
  }
}

/* resumo-reserva fixo no rodape */
#resumo-reserva {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
