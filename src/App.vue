<template>
  <v-app>

    <!-- MENÚ PRINCIPAL -->
    <v-app-bar color="primary">
      <v-btn to="/" variant="text">API (Ejercicio 2)</v-btn>
      <v-btn to="/artistas" variant="text">Artistas (Ejercicio 1)</v-btn>
      <v-btn to="/discos" variant="text">Discos (Ejercicio 1)</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>