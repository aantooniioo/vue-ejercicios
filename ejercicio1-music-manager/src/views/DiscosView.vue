<template>
  <h1>Discos</h1>

  <input v-model="titulo" placeholder="Título disco" />

  <select v-model="artistaSeleccionado">
    <option disabled value="">Selecciona artista</option>
    <option 
      v-for="(artista, index) in store.artistas" 
      :key="index"
      :value="artista.nombre"
    >
      {{ artista.nombre }}
    </option>
  </select>

  <button @click="crearDisco">Añadir Disco</button>

  <p v-if="store.discos.length === 0">No hay discos</p>

  <ul>
    <li v-for="(disco, index) in store.discos" :key="index">
      <input v-model="disco.titulo" />

      <select v-model="disco.artista">
        <option 
          v-for="(artista, i) in store.artistas" 
          :key="i"
          :value="artista.nombre"
        >
          {{ artista.nombre }}
        </option>
      </select>

      <button @click="eliminarDisco(index)">Eliminar</button>
    </li>
  </ul>
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
const eliminarDisco = (index) => {
  store.discos.splice(index, 1)
}
</script>