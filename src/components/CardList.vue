<script setup lang="ts">
import Card from './Card.vue'
import { defineProps, defineEmits } from 'vue'

import { Card as CardType } from '@/components/types/types'

const props = defineProps<{
  items: CardType[]
}>()

const emit = defineEmits(['addOnFavorite'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5 p-5">
    <Card
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :isAddedToCart="false"
      :isFavorite="item.isFavorite"
      :onClickFavorite="() => emit('addOnFavorite', item)"
    />
  </div>
</template>
