import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import {
  VApp,
  VBtn,
  VCard,
  VCardText,
  VCol,
  VContainer,
  VMain,
  VRow,
  VSheet,
} from 'vuetify/components'
import { Ripple } from 'vuetify/directives'
import 'vuetify/styles'
import App from './App.vue'
import './assets/main.css'

const vuetify = createVuetify({
  components: {
    VApp,
    VBtn,
    VCard,
    VCardText,
    VCol,
    VContainer,
    VMain,
    VRow,
    VSheet,
  },
  directives: {
    Ripple,
  },
  theme: {
    defaultTheme: 'barbershop',
    themes: {
      barbershop: {
        dark: true,
        colors: {
          background: '#080808',
          surface: '#121212',
          primary: '#f5f5f5',
          secondary: '#8d8d8d',
          accent: '#d4d4d4',
          success: '#16a34a',
          warning: '#f59e0b',
          error: '#ef4444',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      height: 48,
    },
    VCard: {
      rounded: 'xl',
    },
  },
})

createApp(App).use(vuetify).mount('#app')
