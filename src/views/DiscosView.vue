<template>
  <v-container>

    <h1 class="mb-4">Discos</h1>

    <v-text-field
      v-model="titulo"
      label="Título disco"
      variant="outlined"
      rounded="lg"
      density="comfortable"
      class="mb-3"
    />

    <v-select
      v-model="artistaSeleccionado"
      :items="store.artistas.map(a => a.nombre)"
      label="Selecciona artista"
      variant="outlined"
      rounded="lg"
      class="mb-3"
    />

    <v-btn color="primary" variant="elevated" rounded="lg" class="mb-4" @click="crearDisco">
      Añadir Disco
    </v-btn>

    <v-alert v-if="store.discos.length === 0" type="info" class="mb-3">
      No hay discos
    </v-alert>

    <v-list>
      <v-list-item v-for="(disco, i) in store.discos" :key="i" class="mb-3">

        <v-text-field
          v-model="disco.titulo"
          variant="outlined"
          rounded="lg"
          class="mr-3"
        />

        <v-select
          v-model="disco.artista"
          :items="store.artistas.map(a => a.nombre)"
          variant="outlined"
          rounded="lg"
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
        <v-card-text>¿Seguro que quieres eliminar este disco?</v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="dialogo = false">Cancelar</v-btn>
          <v-btn color="error" variant="elevated" @click="confirmarEliminar">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 🔥 SNACKBAR -->
    <v-snackbar v-model="snackbar" timeout="3000" color="primary">
      {{ mensaje }}
    </v-snackbar>

  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useMusicStore } from '../stores/musicStore'

const store = useMusicStore()

const titulo = ref('')
const artistaSeleccionado = ref('')

const dialogo = ref(false)
const discoIndex = ref(null)

// snackbar
const snackbar = ref(false)
const mensaje = ref('')

const crearDisco = () => {
  if (titulo.value.trim() === '' || artistaSeleccionado.value === '') return

  store.addDisco({
    titulo: titulo.value,
    artista: artistaSeleccionado.value
  })

  titulo.value = ''
  artistaSeleccionado.value = ''
}

const abrirDialogo = (i) => {
  discoIndex.value = i
  dialogo.value = true
}

const confirmarEliminar = () => {
  store.discos.splice(discoIndex.value, 1)
  mensaje.value = 'Disco eliminado correctamente'
  snackbar.value = true
  dialogo.value = false
}
</script>