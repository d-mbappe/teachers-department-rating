import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/views/Auth.vue'
import Profile from '@/views/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/auth", component: Auth },
    { path: "/profile", component: Profile },
  ]
})

export default router
