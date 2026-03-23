<!-- EJERCICIO 2: Detalle -->
<template>
  <v-container class="d-flex justify-center align-center" style="min-height: 80vh;">

    <v-card width="600" elevation="6" rounded="xl" class="pa-6">

      <!-- TÍTULO -->
      <v-card-title class="text-h6 font-weight-bold text-center">
        {{ post?.title }}
      </v-card-title>

      <!-- TEXTO -->
      <v-card-text class="text-body-1 text-grey-darken-1 text-center mt-4">
        {{ post?.body }}
      </v-card-text>

      <!-- BOTÓN -->
      <div class="d-flex justify-center mt-6">
        <router-link to="/">
          <v-btn color="primary" variant="elevated">
            Volver
          </v-btn>
        </router-link>
      </div>

    </v-card>

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const post = ref(null)

onMounted(async () => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${route.params.id}`
  )
  post.value = res.data
})
</script>