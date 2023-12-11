<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'

import { FetchFiltersParams } from '@/components/types/types'
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
import axios from 'axios'

const items = ref([])

//state to store filters
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event: Event) => {
  const selectElement = event.target as HTMLSelectElement
  filters.sortBy = selectElement.value
}

const onChangeSearch = (event: Event) => {
  const searchInput = event.target as HTMLSelectElement
  filters.searchQuery = searchInput.value
}

const fetchFilters = async () => {
  try {
    const params: FetchFiltersParams = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      //* * - specific search
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://0c4caff991af5fa7.mokky.dev/items', {
      params
    })
    if (!data) {
      throw new Error('No data')
    }
    items.value = data
  } catch (e) {
    console.error(e)
  }
}
// componentDidMount the first time
onMounted(fetchFilters)

// watch for changes
watch(filters, fetchFilters)
</script>

<template>
  <!-- <Drawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl my-14">
    <Header />

    <div class="p-10 flex justify-between">
      <h2 class="text-3xl font-bold mb-8">All Sneakers</h2>
      <div class="flex gap-4 items-center">
        <select
          @change="onChangeSelect"
          class="border rounded-xl py-2 pr-8 outline-none focus:border-gray-400"
        >
          <option value="name">Name</option>
          <option value="price">Price - Low to High</option>
          <option value="-price">Price - High to Low</option>
        </select>
        <div class="relative">
          <img class="absolute top-3 left-4" src="/search.svg" alt="Search" />
          <input
            @input="onChangeSearch"
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
