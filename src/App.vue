<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
import axios from 'axios'

const items = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://0c4caff991af5fa7.mokky.dev/items')
    if (!data) {
      throw new Error('No data')
    }
    items.value = data
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <!-- <Drawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl my-14">
    <Header />

    <div class="p-10 flex justify-between">
      <h2 class="text-3xl font-bold mb-8">All Sneakers</h2>
      <div class="flex gap-4 items-center">
        <select class="border rounded-xl py-2 px-8 outline-none focus:border-gray-400">
          <option>FILTER</option>
          <option>Price</option>
          <option>Popularity</option>
        </select>
        <div class="relative">
          <img class="absolute top-3 left-4" src="/search.svg" alt="Search" />
          <input
            class="border rounded-xl py-2 pl-11 pr-4 outline-none focus:border-gray-400"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
    <CardList :items="items" />
  </div>
</template>

<style scoped></style>
