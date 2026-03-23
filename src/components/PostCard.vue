<template>
  <v-card elevation="6" rounded="xl" class="pa-4">

    <v-card-title class="font-weight-bold">
      {{ post.title }}
    </v-card-title>

    <v-card-text class="text-grey-darken-1">
      {{ post.body.substring(0, 100) }}...
    </v-card-text>

    <router-link :to="`/detalle/${post.id}`">
      <v-btn color="primary" block variant="tonal">
        Ver detalle
      </v-btn>
    </router-link>

  </v-card>
</template>

<script setup>
defineProps({
  post: Object
})
</script>