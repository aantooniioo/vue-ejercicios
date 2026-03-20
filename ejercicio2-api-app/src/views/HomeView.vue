<template>
  <h1>Listado</h1>

  <!-- Buscador -->
  <input v-model="busqueda" placeholder="Buscar..." />

  <!-- Mensaje sin resultados -->
  <p v-if="postsFiltrados.length === 0">No hay resultados</p>

  <!-- Cards -->
  <div class="grid">
    <div v-for="post in postsPaginados" :key="post.id" class="card">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body.substring(0, 80) }}...</p>

      <router-link :to="`/detalle/${post.id}`">
        Ver detalle
      </router-link>
    </div>
  </div>

  <!-- Paginación -->
  <div class="paginacion">
    <button 
      @click="pagina--" 
      :disabled="pagina <= 1"
    >
      Anterior
    </button>

    <button 
      @click="pagina++" 
      :disabled="pagina >= totalPaginas"
    >
      Siguiente
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'

const posts = ref([])
const busqueda = ref('')
const pagina = ref(1)
const porPagina = 9

// Cargar datos
onMounted(async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    posts.value = res.data
  } catch (error) {
    console.error(error)
  }
})

// Filtro
const postsFiltrados = computed(() => {
  return posts.value.filter(post =>
    post.title.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

// Total páginas
const totalPaginas = computed(() => {
  return Math.ceil(postsFiltrados.value.length / porPagina)
})

// Paginación
const postsPaginados = computed(() => {
  const inicio = (pagina.value - 1) * porPagina
  return postsFiltrados.value.slice(inicio, inicio + porPagina)
})

// Resetear página al buscar
watch(busqueda, () => {
  pagina.value = 1
})
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
}

.paginacion {
  margin-top: 20px;
}
</style>