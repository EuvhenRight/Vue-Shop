<script setup lang="ts">
import Card from './Card.vue'
import { defineEmits, defineProps } from 'vue'

import type { Card as CardType } from '@/components/types/types'

defineProps<{ items: CardType[] }>()

const emit = defineEmits(['addOnFavorite', 'onClickPlusCard'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5 p-5" v-auto-animate>
    <Card
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :isAddedToCart="item.isAddedToCart"
      :isFavorite="item.isFavorite"
      :on-click-favorite="() => emit('addOnFavorite', item)"
      :on-click-plus-card="() => emit('onClickPlusCard', item)"
    />
  </div>
</template>
