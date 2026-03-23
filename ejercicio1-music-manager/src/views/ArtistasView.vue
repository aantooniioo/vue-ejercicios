<template>
  <h1>Artistas</h1>

  <input v-model="nombre" placeholder="Nombre artista" />
  <button @click="crearArtista">Añadir</button>

  <p v-if="store.artistas.length === 0">No hay artistas</p>

  <ul>
    <li v-for="(artista, index) in store.artistas" :key="index">
      <input v-model="artista.nombre" />

      <button @click="eliminarArtista(index)">
        Eliminar
      </button>
    </li>
  </ul>
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

const eliminarArtista = (index) => {
  const artista = store.artistas[index]

  const tieneDiscos = store.discos.some(
    (disco) => disco.artista === artista.nombre
  )

  if (tieneDiscos) {
    alert('No se puede borrar este artista porque tiene discos')
    return
  }

  store.artistas.splice(index, 1)
}
</script>