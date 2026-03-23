<!-- EJERCICIO 1: CRUD de artistas -->
<template>
  <v-container>

    <h1 class="mb-4">Artistas</h1>

    <v-text-field
      v-model="nombre"
      label="Nombre artista"
      class="mb-2"
    />

    <v-btn color="primary" class="mb-4" @click="crearArtista">
      Añadir
    </v-btn>

    <v-alert v-if="store.artistas.length === 0" type="info" class="mb-3">
      No hay artistas
    </v-alert>

    <v-list>
      <v-list-item
        v-for="(artista, i) in store.artistas"
        :key="i"
        class="mb-2"
      >
        <v-text-field v-model="artista.nombre" class="mr-2" />

        <v-btn color="error" @click="eliminarArtista(i)">
          Eliminar
        </v-btn>
      </v-list-item>
    </v-list>

  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useMusicStore } from '../stores/musicStore'

const store = useMusicStore()
const nombre = ref('')

const crearArtista = () => {
  if (nombre.value.trim() === '') return
  store.addArtista({ nombre: nombre.value })
  nombre.value = ''
}

const eliminarArtista = (i) => {
  const artista = store.artistas[i]

  const tieneDiscos = store.discos.some(
    d => d.artista === artista.nombre
  )

  if (tieneDiscos) {
    alert('No se puede borrar este artista porque tiene discos')
    return
  }

  store.artistas.splice(i, 1)
}
</script>