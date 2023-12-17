<script setup lang="ts">
import { defineEmits } from 'vue'
import { type Card as CardType } from './types/types'

const emit = defineEmits(['onRemoveFromCart'])

defineProps<CardType>()
</script>

<template>
  <div class="flex items-center justify-start border border-slate-200 p-4 rounded-2xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" alt="title" />
    <div class="flex flex-col w-full">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <b>{{ price }}</b>
        <img
          @click="emit('onRemoveFromCart')"
          class="cursor-pointer opacity-40 hover:opacity-100 transition"
          src="/close.svg"
          alt="Close"
        />
      </div>
    </div>
  </div>
</template>
