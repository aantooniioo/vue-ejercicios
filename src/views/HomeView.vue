<!-- EJERCICIO 2: API con Pinia + componente reutilizable -->
<template>
  <v-container style="max-width: 1100px;" class="py-8">

    <!-- TÍTULO -->
    <h1 class="text-center mb-8 text-h4 font-weight-bold">
      Listado de Posts
    </h1>

    <!-- BOTÓN API -->
    <div class="d-flex justify-center mb-6">
      <v-btn
        color="primary"
        size="large"
        @click="cargarPosts"
        :disabled="posts.length > 0"
      >
        {{ posts.length === 0 ? 'Cargar datos' : 'Datos cargados' }}
      </v-btn>
    </div>

    <!-- BUSCADOR -->
    <v-text-field
      v-model="busqueda"
      label="Buscar por título..."
      variant="outlined"
      clearable
      class="mb-8"
    />

    <!-- SIN RESULTADOS -->
    <v-alert
      v-if="postsFiltrados.length === 0 && posts.length > 0"
      type="info"
      class="mb-6"
    >
      No hay resultados para la búsqueda
    </v-alert>

    <!-- GRID -->
    <v-row>
      <v-col
        v-for="post in postsPaginados"
        :key="post.id"
        cols="12"
        sm="6"
        md="4"
      >
        <PostCard :post="post" />
      </v-col>
    </v-row>

    <!-- PAGINACIÓN -->
    <div class="mt-8 d-flex justify-center">
      <v-btn
        variant="outlined"
        @click="pagina--"
        :disabled="pagina <= 1"
        class="mr-3"
      >
        Anterior
      </v-btn>

      <v-btn
        variant="outlined"
        @click="pagina++"
        :disabled="pagina >= totalPaginas"
      >
        Siguiente
      </v-btn>
    </div>

  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { usePostsStore } from '../stores/postsStore'
import PostCard from '../components/PostCard.vue'

// Store
const store = usePostsStore()

// Estado local
const busqueda = ref('')
const pagina = ref(1)
const porPagina = 9

// Posts desde Pinia
const posts = computed(() => store.posts)

// Cargar datos
const cargarPosts = () => {
  store.cargarPosts()
}

// Filtro
const postsFiltrados = computed(() =>
  posts.value.filter(p =>
    p.title.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)

// Total páginas
const totalPaginas = computed(() =>
  Math.ceil(postsFiltrados.value.length / porPagina)
)

// Paginación
const postsPaginados = computed(() => {
  const inicio = (pagina.value - 1) * porPagina
  return postsFiltrados.value.slice(inicio, inicio + porPagina)
})

// Reset al buscar
watch(busqueda, () => {
  pagina.value = 1
})
</script>