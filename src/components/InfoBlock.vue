<script setup lang="ts">
defineProps({
  imageUrl: String,
  title: String,
  description: String
})
</script>

<template>
  <img class="w-36 h-36" :src="imageUrl" :alt="title" />
  <h2 class="mt-4 text-2xl font-bold">{{ title }}</h2>
  <p class="text-slate-400">{{ description }}</p>
</template>
