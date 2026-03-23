<!-- EJERCICIO 1: CRUD de discos -->
<template>
  <v-container>

    <h1 class="mb-4">Discos</h1>

    <v-text-field
      v-model="titulo"
      label="Título disco"
      class="mb-2"
    />

    <v-select
      v-model="artistaSeleccionado"
      :items="store.artistas.map(a => a.nombre)"
      label="Selecciona artista"
      class="mb-2"
    />

    <v-btn color="primary" class="mb-4" @click="crearDisco">
      Añadir Disco
    </v-btn>

    <v-alert v-if="store.discos.length === 0" type="info" class="mb-3">
      No hay discos
    </v-alert>

    <v-list>
      <v-list-item
        v-for="(disco, i) in store.discos"
        :key="i"
        class="mb-2"
      >
        <v-text-field v-model="disco.titulo" class="mr-2" />

        <v-select
          v-model="disco.artista"
          :items="store.artistas.map(a => a.nombre)"
          class="mr-2"
        />

        <v-btn color="error" @click="eliminarDisco(i)">
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

const titulo = ref('')
const artistaSeleccionado = ref('')

const crearDisco = () => {
  if (titulo.value.trim() === '' || artistaSeleccionado.value === '') return

  store.addDisco({
    titulo: titulo.value,
    artista: artistaSeleccionado.value
  })

  titulo.value = ''
  artistaSeleccionado.value = ''
}

const eliminarDisco = (i) => {
  store.discos.splice(i, 1)
}
</script>