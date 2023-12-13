<script setup lang="ts">
import CartItemList from './CartItemList.vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['closeDrawer'])
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-10">
    <div class="bg-white fixed top-0 right-0 h-full w-96 z-20 p-8 flex flex-col justify-between">
      <div class="flex gap-5">
        <h2 class="text-2xl font-bold flex items-center gap-5">
          <svg
            @click="emit('closeDrawer')"
            class="rotate-180 hover:-translate-x-1 opacity-30 hover:opacity-100 transition cursor-pointer"
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7H14.7143"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.71436 1L14.7144 7L8.71436 13"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Cart
        </h2>
      </div>
      <CartItemList />
      <div class="flex flex-col gap-2 my-7">
        <div class="flex gap-2">
          <span class="text-slate-400">Total:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>500 euros</b>
        </div>
        <div class="flex gap-2 mt-4">
          <span class="text-slate-400">Tax 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>25 euros</b>
        </div>
        <button
          disabled="true"
          class="bg-lime-500 text-white w-full py-4 rounded-xl mt-4 disabled:bg-slate-400 transition hover:bg-lime-600 active:bg-lime-700"
        >
          Create Order
        </button>
      </div>
    </div>
  </div>
</template>
