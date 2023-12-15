<script setup lang="ts">
import CardList from '../CardList.vue'
import { Card as CardType, CardListProps } from '@/components/types/types'
import axios from 'axios'
import { ref, onMounted, inject } from 'vue'

const favorites = ref<CardType[]>([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://0c4caff991af5fa7.mokky.dev/favorites?_relations=items'
    )
    favorites.value = data.map((favorite: CardFavorite) => favorite.item)
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <h1 class="text-2xl font-bold mb-8">Favorites</h1>

  <CardList :items="favorites" />
</template>
