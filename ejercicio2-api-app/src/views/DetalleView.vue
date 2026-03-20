<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const post = ref(null)

onMounted(async () => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${route.params.id}`
    )
    post.value = res.data
  } catch (error) {
    console.error(error)
  }
})
</script>