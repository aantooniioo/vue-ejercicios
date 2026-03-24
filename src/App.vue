<template>
  <v-app>

    <v-app-bar color="primary" elevation="3">
      <v-container class="d-flex justify-space-between align-center">

        <!-- IZQUIERDA -->
        <div class="d-flex align-center">

          <!-- SOLO FUNCIONA CUANDO NO ESTAMOS EN HOME -->
          <v-btn
            v-if="route.path !== '/'"
            icon
            variant="text"
            class="mr-2"
            @click="volver"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <!-- NOMBRE APP -->
          <span class="text-h6 font-weight-bold">
            Vue Ejercicios
          </span>

        </div>

        <!-- DERECHA -->
        <div>
          <v-btn to="/" variant="text" class="mr-2">API</v-btn>
          <v-btn to="/artistas" variant="text" class="mr-2">Artistas</v-btn>
          <v-btn to="/discos" variant="text">Discos</v-btn>
        </div>

      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Navega a la vista anterior usando el historial
const volver = () => {
  router.back()
}
</script>