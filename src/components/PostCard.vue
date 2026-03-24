<template>
  <v-card
    elevation="6"
    rounded="xl"
    class="pa-4 card-hover d-flex flex-column justify-space-between"
    height="100%"
  >

    <div>
      <v-card-title class="font-weight-bold text-subtitle-1">
        {{ post.title }}
      </v-card-title>

      <v-card-text class="text-body-2 text-grey-darken-1">
        {{ post.body.substring(0, 100) }}...
      </v-card-text>
    </div>

    <router-link :to="`/detalle/${post.id}`">
      <v-btn color="primary" block variant="tonal" class="mt-4">
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

<style scoped>
.card-hover {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
</style>