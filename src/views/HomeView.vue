<!-- EJERCICIO 2: API + filtros + paginación -->
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
        variant="elevated"
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
        <v-card
          elevation="6"
          rounded="xl"
          class="pa-4 d-flex flex-column justify-space-between"
          height="100%"
        >

          <!-- TÍTULO -->
          <v-card-title class="text-subtitle-1 font-weight-bold">
            {{ post.title }}
          </v-card-title>

          <!-- TEXTO -->
          <v-card-text class="text-body-2 text-grey-darken-1">
            {{ post.body.substring(0, 100) }}...
          </v-card-text>

          <!-- BOTÓN -->
          <router-link :to="`/detalle/${post.id}`">
            <v-btn
              color="primary"
              variant="tonal"
              block
              class="mt-4"
            >
              Ver detalle
            </v-btn>
          </router-link>

        </v-card>
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
import axios from 'axios'

const posts = ref([])
const busqueda = ref('')
const pagina = ref(1)
const porPagina = 9

const cargarPosts = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
  posts.value = res.data
}

// FILTRO
const postsFiltrados = computed(() =>
  posts.value.filter(p =>
    p.title.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)

// TOTAL PÁGINAS
const totalPaginas = computed(() =>
  Math.ceil(postsFiltrados.value.length / porPagina)
)

// PAGINACIÓN
const postsPaginados = computed(() => {
  const inicio = (pagina.value - 1) * porPagina
  return postsFiltrados.value.slice(inicio, inicio + porPagina)
})

// RESET BUSCADOR
watch(busqueda, () => {
  pagina.value = 1
})
</script>