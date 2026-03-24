<template>
  <v-container>

    <h1 class="mb-4">Artistas</h1>

    <v-text-field
      v-model="nombre"
      label="Nombre artista"
      variant="outlined"
      rounded="lg"
      density="comfortable"
      class="mb-3"
    />

    <v-btn color="primary" variant="elevated" rounded="lg" class="mb-4" @click="crearArtista">
      Añadir
    </v-btn>

    <v-alert v-if="store.artistas.length === 0" type="info" class="mb-3">
      No hay artistas
    </v-alert>

    <v-list>
      <v-list-item v-for="(artista, i) in store.artistas" :key="i" class="mb-3">

        <v-text-field
          v-model="artista.nombre"
          variant="outlined"
          rounded="lg"
          density="comfortable"
          class="mr-3"
        />

        <v-btn color="error" variant="elevated" rounded="lg" @click="abrirDialogo(i)">
          Eliminar
        </v-btn>

      </v-list-item>
    </v-list>

    <!-- DIALOGO -->
    <v-dialog v-model="dialogo" max-width="400">
      <v-card>
        <v-card-title>Confirmar eliminación</v-card-title>
        <v-card-text>¿Seguro que quieres eliminar este artista?</v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="dialogo = false">Cancelar</v-btn>
          <v-btn color="error" variant="elevated" @click="confirmarEliminar">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 🔥 SNACKBAR -->
    <v-snackbar v-model="snackbar" timeout="3000" color="error">
      {{ mensaje }}
    </v-snackbar>

  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useMusicStore } from '../stores/musicStore'

const store = useMusicStore()
const nombre = ref('')

const dialogo = ref(false)
const artistaIndex = ref(null)

// snackbar
const snackbar = ref(false)
const mensaje = ref('')

const crearArtista = () => {
  if (nombre.value.trim() === '') return
  store.addArtista({ nombre: nombre.value })
  nombre.value = ''
}

const abrirDialogo = (i) => {
  artistaIndex.value = i
  dialogo.value = true
}

const confirmarEliminar = () => {
  const artista = store.artistas[artistaIndex.value]

  const tieneDiscos = store.discos.some(d => d.artista === artista.nombre)

  if (tieneDiscos) {
    mensaje.value = 'No se puede borrar este artista porque tiene discos'
    snackbar.value = true
    dialogo.value = false
    return
  }

  store.artistas.splice(artistaIndex.value, 1)
  dialogo.value = false
}
</script>