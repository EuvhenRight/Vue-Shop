<script setup lang="ts">
import { Card as CardType, CardActionType } from '@/components/types/types'

defineProps<CardType & CardActionType>()
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition"
  >
    <img
      v-if="onClickFavorite"
      class="absolute top-8 left-8"
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
      @click="onClickFavorite"
      alt="Like"
    />
    <img :src="imageUrl" alt="Sneakers" />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Price:</span>
        <b>{{ price }} euros</b>
      </div>
      <img
        v-if="onClickPlusCard"
        @click="onClickPlusCard"
        class="cursor-pointer"
        :src="isAddedToCart ? '/checked.svg' : '/plus.svg'"
        alt="Add"
      />
    </div>
  </div>
</template>
