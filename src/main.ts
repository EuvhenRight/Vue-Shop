import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/pages/Home.vue')
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: () => import('@/components/pages/Favorites.vue')
    }
  ]
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
