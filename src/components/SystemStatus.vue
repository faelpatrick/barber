<script setup>
import { computed, onMounted, ref } from 'vue'
import { getApiHealth, getDatabaseStatus } from '../services/api'

const apiStatus = ref('checking')
const databaseStatus = ref('checking')

const environment = computed(() => {
  if (typeof window === 'undefined') {
    return 'Local'
  }

  const hostname = window.location.hostname
  const isLocalHost =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1'

  return isLocalHost ? 'Local' : 'Producao'
})

const statusLabel = (status, positiveLabel, negativeLabel) => {
  if (status === 'online' || status === 'connected') {
    return positiveLabel
  }

  if (status === 'offline' || status === 'error') {
    return negativeLabel
  }

  return 'A verificar'
}

const apiLabel = computed(() => statusLabel(apiStatus.value, 'Online', 'Offline'))
const databaseLabel = computed(() => statusLabel(databaseStatus.value, 'Ligada', 'Desligada'))

const apiTone = computed(() => ({
  'status-item__dot--online': apiStatus.value === 'online',
  'status-item__dot--offline': apiStatus.value === 'offline',
}))

const databaseTone = computed(() => ({
  'status-item__dot--online': databaseStatus.value === 'connected',
  'status-item__dot--offline': databaseStatus.value === 'error',
}))

onMounted(async () => {
  const [healthResult, dbResult] = await Promise.allSettled([
    getApiHealth(),
    getDatabaseStatus(),
  ])

  apiStatus.value =
    healthResult.status === 'fulfilled' && healthResult.value?.status === 'ok'
      ? 'online'
      : 'offline'

  databaseStatus.value =
    dbResult.status === 'fulfilled' &&
    dbResult.value?.success === true &&
    dbResult.value?.database === 'connected'
      ? 'connected'
      : 'error'
})
</script>

<template>
  <v-sheet class="system-status pa-4" rounded="xl">
    <p class="system-status__title">Estado do Sistema</p>

    <div class="status-item">
      <span class="status-item__label">Ambiente</span>
      <span class="status-item__value">{{ environment }}</span>
    </div>

    <div class="status-item">
      <span class="status-item__label">API</span>
      <span class="status-item__value">
        <span class="status-item__dot" :class="apiTone"></span>
        {{ apiLabel }}
      </span>
    </div>

    <div class="status-item">
      <span class="status-item__label">Base de Dados</span>
      <span class="status-item__value">
        <span class="status-item__dot" :class="databaseTone"></span>
        {{ databaseLabel }}
      </span>
    </div>
  </v-sheet>
</template>

<style scoped>
.system-status {
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  background: rgba(10, 10, 10, 0.84);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
  font-size: 0.88rem;
}

.system-status__title {
  margin: 0 0 0.9rem;
  color: #d8d8d8;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.status-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.status-item + .status-item {
  margin-top: 0.55rem;
}

.status-item__label {
  color: #8f8f8f;
}

.status-item__value {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #f2f2f2;
  font-weight: 700;
}

.status-item__dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: #7d7d7d;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.04);
}

.status-item__dot--online {
  background: #33b16a;
}

.status-item__dot--offline {
  background: #d15a5a;
}
</style>
