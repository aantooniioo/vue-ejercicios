// RUTAS (Ejercicio 1 + Ejercicio 2)

import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import DetalleView from '../views/DetalleView.vue'
import ArtistasView from '../views/ArtistasView.vue'
import DiscosView from '../views/DiscosView.vue'

const routes = [
  { path: '/', component: HomeView },                  // Ejercicio 2
  { path: '/detalle/:id', component: DetalleView },    // Ejercicio 2
  { path: '/artistas', component: ArtistasView },      // Ejercicio 1
  { path: '/discos', component: DiscosView },          // Ejercicio 1
]

export default createRouter({
  history: createWebHistory(),
  routes
})