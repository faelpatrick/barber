<script setup>
defineProps({
  service: {
    type: Object,
    required: true,
  },
})

const formatPrice = (price) =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
</script>

<template>
  <v-card class="service-card h-100" flat>
    <v-card-text class="service-content pa-5">
      <div>
        <p class="service-name">{{ service.name }}</p>
        <p class="service-description">{{ service.description }}</p>
      </div>

      <div class="service-footer">
        <span class="service-price">{{ formatPrice(service.price) }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.service-card {
  background: rgba(16, 16, 16, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.service-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.18);
}

.service-content {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}

.service-name {
  margin: 0 0 0.5rem;
  font-family: "Palatino Linotype", "Book Antiqua", serif;
  font-size: 1.35rem;
  line-height: 1.1;
}

.service-description {
  margin: 0;
  color: #bdbdbd;
  line-height: 1.55;
}

.service-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.service-price {
  font-size: 1.15rem;
  font-weight: 700;
}
</style>
