<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  matchesUserCredentials,
  saveUser,
  setAuthenticated,
} from '../utils/auth'

const router = useRouter()
const mode = ref('login')
const generalError = ref('')

const loginForm = ref({
  phone: '',
  birthDate: '',
})

const registerForm = ref({
  fullName: '',
  phone: '',
  birthDate: '',
  acceptedPrivacy: false,
})

const loginErrors = ref({
  phone: '',
  birthDate: '',
})

const registerErrors = ref({
  fullName: '',
  phone: '',
  birthDate: '',
  acceptedPrivacy: '',
})

const isLoginMode = computed(() => mode.value === 'login')
const screenTitle = computed(() => (isLoginMode.value ? 'Entrar' : 'Criar conta'))

const clearMessages = () => {
  generalError.value = ''
  loginErrors.value = {
    phone: '',
    birthDate: '',
  }
  registerErrors.value = {
    fullName: '',
    phone: '',
    birthDate: '',
    acceptedPrivacy: '',
  }
}

const switchMode = (nextMode) => {
  mode.value = nextMode
  clearMessages()
}

const validateLogin = () => {
  loginErrors.value = {
    phone: '',
    birthDate: '',
  }

  if (!loginForm.value.phone.trim()) {
    loginErrors.value.phone = 'Telefone obrigatorio'
  }

  if (!loginForm.value.birthDate) {
    loginErrors.value.birthDate = 'Data de nascimento obrigatoria'
  }

  return !loginErrors.value.phone && !loginErrors.value.birthDate
}

const validateRegister = () => {
  registerErrors.value = {
    fullName: '',
    phone: '',
    birthDate: '',
    acceptedPrivacy: '',
  }

  if (!registerForm.value.fullName.trim()) {
    registerErrors.value.fullName = 'Nome obrigatorio'
  }

  if (!registerForm.value.phone.trim()) {
    registerErrors.value.phone = 'Telefone obrigatorio'
  }

  if (!registerForm.value.birthDate) {
    registerErrors.value.birthDate = 'Data de nascimento obrigatoria'
  }

  if (!registerForm.value.acceptedPrivacy) {
    registerErrors.value.acceptedPrivacy = 'Aceite a Politica de Privacidade'
  }

  return (
    !registerErrors.value.fullName &&
    !registerErrors.value.phone &&
    !registerErrors.value.birthDate &&
    !registerErrors.value.acceptedPrivacy
  )
}

const handleLogin = () => {
  clearMessages()

  if (!validateLogin()) {
    return
  }

  const hasMatchingUser = matchesUserCredentials({
    phone: loginForm.value.phone,
    birthDate: loginForm.value.birthDate,
  })

  if (!hasMatchingUser) {
    generalError.value = 'Dados nao encontrados. Verifique o telefone ou crie uma conta.'
    return
  }

  setAuthenticated()
  router.push('/agendamento')
}

const handleRegister = () => {
  clearMessages()

  if (!validateRegister()) {
    return
  }

  saveUser({
    fullName: registerForm.value.fullName,
    phone: registerForm.value.phone,
    birthDate: registerForm.value.birthDate,
  })

  setAuthenticated()
  router.push('/agendamento')
}
</script>

<template>
  <section class="screen-page">
    <v-container class="screen-wrap px-4 py-8 py-sm-10">
      <v-sheet class="screen-card pa-6 pa-sm-8" rounded="xl">
        <div class="screen-header">
          <p class="screen-kicker">Guilherme Barbershop</p>
          <h1 class="screen-title">{{ screenTitle }}</h1>
        </div>

        <div class="mode-switch">
          <v-btn
            :variant="isLoginMode ? 'flat' : 'outlined'"
            color="primary"
            type="button"
            @click="switchMode('login')"
          >
            Entrar
          </v-btn>
          <v-btn
            :variant="isLoginMode ? 'outlined' : 'flat'"
            color="primary"
            type="button"
            @click="switchMode('register')"
          >
            Criar conta
          </v-btn>
        </div>

        <form
          v-if="isLoginMode"
          class="screen-form"
          @submit.prevent="handleLogin"
        >
          <v-text-field
            v-model="loginForm.phone"
            label="Telefone"
            variant="outlined"
            density="comfortable"
            type="tel"
            :error-messages="loginErrors.phone"
          />

          <v-text-field
            v-model="loginForm.birthDate"
            label="Data de nascimento"
            variant="outlined"
            density="comfortable"
            type="date"
            :error-messages="loginErrors.birthDate"
          />

          <p v-if="generalError" class="form-feedback form-feedback--error">
            {{ generalError }}
          </p>

          <v-btn color="primary" size="large" type="submit">
            Continuar
          </v-btn>
        </form>

        <form
          v-else
          class="screen-form"
          @submit.prevent="handleRegister"
        >
          <v-text-field
            v-model="registerForm.fullName"
            label="Nome completo"
            variant="outlined"
            density="comfortable"
            :error-messages="registerErrors.fullName"
          />

          <v-text-field
            v-model="registerForm.phone"
            label="Telefone"
            variant="outlined"
            density="comfortable"
            type="tel"
            :error-messages="registerErrors.phone"
          />

          <v-text-field
            v-model="registerForm.birthDate"
            label="Data de nascimento"
            variant="outlined"
            density="comfortable"
            type="date"
            :error-messages="registerErrors.birthDate"
          />
          
          <label class="privacy-check">
  <input
    v-model="registerForm.acceptedPrivacy"
    type="checkbox"
  >
  <span class="privacy-box">
    <span v-if="registerForm.acceptedPrivacy">✓</span>
  </span>
  <span>Aceito a Política de Privacidade</span>
</label>

<p
  v-if="registerErrors.acceptedPrivacy"
  class="form-feedback form-feedback--error"
>
  {{ registerErrors.acceptedPrivacy }}
</p>

          <v-btn color="primary" size="large" type="submit">
            Criar conta
          </v-btn>
        </form>
      </v-sheet>
    </v-container>
  </section>
</template>

<style scoped>
.screen-page {
  min-height: 100vh;
}

.screen-wrap {
  display: flex;
  min-height: 100vh;
  align-items: center;
}

.screen-card {
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
  background: rgba(10, 10, 10, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.screen-header,
.screen-form {
  display: grid;
  gap: 1rem;
}

.screen-kicker {
  margin: 0;
  color: #a7a7a7;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.screen-title {
  margin: 0;
  font-family: "Palatino Linotype", "Book Antiqua", serif;
  font-size: clamp(2rem, 6vw, 2.6rem);
  line-height: 1;
}

.mode-switch {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.form-feedback {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
}

.form-feedback--error {
  color: #ff8c8c;
}

.privacy-check {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  color: #fff;
  font-weight: 700;
}

.privacy-check input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.privacy-box {
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  flex: 0 0 26px;
  border: 2px solid #fff;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1;
  color: #000;
  background: transparent;
}

.privacy-check input:checked + .privacy-box {
  background: #fff;
}
</style>