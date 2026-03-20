import { createRouter, createWebHistory } from 'vue-router'
import ArtistasView from '@/views/ArtistasView.vue'
import DiscosView from '@/views/DiscosView.vue'

const routes = [
  { path: '/', component: ArtistasView },
  { path: '/discos', component: DiscosView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router