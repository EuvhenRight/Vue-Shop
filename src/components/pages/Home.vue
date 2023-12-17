<script setup lang="ts">
import type { FetchFiltersParams, CardFavorite, Card as CardType } from '../types/types'
import CardList from '../CardList.vue'
import axios from 'axios'
import { ref, reactive, onMounted, watch, provide, inject } from 'vue'
import type { Ref } from 'vue'
const {
  cart,
  onAddToCart,
  onRemoveFromCart
}: {
  onAddToCart: (item: CardType) => void
  onRemoveFromCart: (item: CardType) => void
  cart: CardType[]
} = inject('cart', {
  cart: [],
  onAddToCart: () => {},
  onRemoveFromCart: () => {}
})

const items: Ref<CardType[]> = inject('items')

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

const addOnFavorite = async (item: CardType) => {
  try {
    if (!item.isFavorite) {
      const params: CardFavorite = {
        item_id: item.id
      }

      item.isFavorite = true
      const { data } = await axios.post('https://0c4caff991af5fa7.mokky.dev/favorites', params)
      item.favoritesId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://0c4caff991af5fa7.mokky.dev/favorites/${item.favoritesId}`)
    }
  } catch (e) {
    console.error(e)
  }
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
    items.value = data.map((obj: CardType) => ({
      ...obj,
      isFavorite: false,
      isAddedToCart: false
    }))
  } catch (e) {
    console.error(e)
  }
}

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get('https://0c4caff991af5fa7.mokky.dev/favorites')
    if (!data) {
      throw new Error('No data')
    }
    items.value = items.value.map((item: CardType) => {
      const favorite: CardFavorite | undefined = data.find(
        (favorite: CardFavorite) => favorite.item_id === item.id
      )

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoritesId: favorite.id
      }
    })
  } catch (e) {
    console.error(e)
  }
}

const onClickPlusCard = (item: CardType) => {
  if (!item.isAddedToCart) {
    onAddToCart(item)
  } else {
    onRemoveFromCart(item)
  }
}

// componentDidMount the first time
onMounted(async () => {
  await fetchFilters(), await fetchFavorites()
})

// watch for changes
watch(filters, fetchFilters)

watch(cart, () => {
  items.value = items.value.map((items: CardType) => ({
    ...items,
    isAddedToCart: false
  }))
})
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-bold mb-8">All Sneakers</h2>
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
  <CardList :items="items" @add-on-favorite="addOnFavorite" @on-click-plus-card="onClickPlusCard" />
</template>
