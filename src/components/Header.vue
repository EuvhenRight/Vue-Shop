<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['openDrawer'])

defineProps({
  totalPrice: Number
})
</script>

<template>
  <header class="flex justify-between border-b border-slate-300 px-10 py-8">
    <div class="flex items-center gap-4">
      <router-link to="/">
        <img class="w-10" src="/logo.png" alt="logo" />
        <div>
          <h2 class="text-xl uppercase font-bold">Vue Snickers</h2>
          <p class="text-slate-400">The best shop in the world</p>
        </div>
      </router-link>
    </div>
    <ul class="flex items-center gap-10">
      <li
        @click="emit('openDrawer')"
        class="flex items-center gap-3 cursor-pointer hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} $</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 text-slate-400 cursor-pointer hover:text-black">
          <img src="/heart.svg" alt="Favorites" />
          <span>favorites</span>
        </li>
      </router-link>
      <li class="flex items-center gap-3 text-slate-400 cursor-pointer hover:text-black">
        <img src="/profile.svg" alt="Profile" />
        <span>Profile</span>
      </li>
    </ul>
  </header>
</template>
