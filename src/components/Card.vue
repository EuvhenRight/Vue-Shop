<script setup lang="ts">
import { defineProps } from 'vue'
import { Card as CardType } from '@/components/types/types'

const props = defineProps<CardType>()
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition"
  >
    <img class="absolute top-8 left-8" :src="isLiked ? '/like-2.svg' : '/like-1.svg'" alt="Like" />
    <img :src="imageUrl" alt="Sneakers" />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Price:</span>
        <b>{{ price }} euros</b>
      </div>
      <img :src="isAddedToCart ? '/checked.svg' : '/plus.svg'" alt="Add" />
    </div>
  </div>
</template>
