import { createRouter, createWebHistory } from 'vue-router'
import BookingPage from '../pages/BookingPage.vue'
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import { isAuthenticated } from '../utils/auth'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: HomePage,
  },
  {
    path: '/app',
    name: 'app-entry',
    redirect: () => (isAuthenticated() ? { name: 'booking' } : { name: 'login' }),
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      guestOnly: true,
    },
  },
  {
    path: '/agendamento',
    name: 'booking',
    component: BookingPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'login' }
  }

  if (to.meta.guestOnly && isAuthenticated()) {
    return { name: 'booking' }
  }

  return true
})

export default router
