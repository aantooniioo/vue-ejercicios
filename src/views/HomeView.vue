<!-- EJERCICIO 2: API + animaciones -->
<template>
  <v-container style="max-width: 1100px;" class="py-8">

    <h1 class="text-center mb-8 text-h4 font-weight-bold">
      Listado de Posts
    </h1>

    <!-- BOTÓN -->
    <div class="d-flex justify-center mb-6">
      <v-btn
        color="primary"
        size="large"
        variant="elevated"
        @click="togglePosts"
      >
        {{ posts.length === 0 ? 'Cargar datos' : 'Ocultar datos' }}
      </v-btn>
    </div>

    <!-- LOADING -->
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
      class="mb-4"
    />

    <!-- TRANSICIÓN -->
    <transition name="fade">

      <div v-if="posts.length > 0">

        <!-- BUSCADOR -->
        <v-text-field
          v-model="busqueda"
          label="Buscar por título..."
          variant="outlined"
          rounded="lg"
          clearable
          class="mb-8"
        />

        <!-- SIN RESULTADOS -->
        <v-alert
          v-if="postsFiltrados.length === 0"
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

      </div>

    </transition>

  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { usePostsStore } from '../stores/postsStore'
import PostCard from '../components/PostCard.vue'

const store = usePostsStore()

const busqueda = ref('')
const pagina = ref(1)
const porPagina = 9
const loading = ref(false)

const posts = computed(() => store.posts)

const togglePosts = async () => {
  if (posts.value.length > 0) {
    store.posts = []
    busqueda.value = ''
    pagina.value = 1
  } else {
    loading.value = true
    await store.cargarPosts()
    loading.value = false
  }
}

const postsFiltrados = computed(() =>
  posts.value.filter(p =>
    p.title.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)

const totalPaginas = computed(() =>
  Math.ceil(postsFiltrados.value.length / porPagina)
)

const postsPaginados = computed(() => {
  const inicio = (pagina.value - 1) * porPagina
  return postsFiltrados.value.slice(inicio, inicio + porPagina)
})

watch(busqueda, () => {
  pagina.value = 1
})
</script>

<style scoped>
/* ANIMACIÓN FADE */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>