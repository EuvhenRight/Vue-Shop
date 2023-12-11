<script setup lang="ts">
import Card from './Card.vue'
import { defineProps } from 'vue'

import { Card as CardType } from '@/components/types/types'

const props = defineProps<{
  items: CardType[]
}>()
</script>

<template>
  <div class="grid grid-cols-4 gap-5 p-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :isAddedToCart="false"
      :isLiked="false"
    />
  </div>
</template>
