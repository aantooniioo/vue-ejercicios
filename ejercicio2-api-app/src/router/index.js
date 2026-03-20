import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetalleView from '../views/DetalleView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/detalle/:id', name: 'detalle', component: DetalleView },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
