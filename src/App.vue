<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'

import { Card as CardType } from '@/components/types/types'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import axios from 'axios'

const items = ref<CardType[]>([])
const cart = ref<CardType[]>([])
const isCreatingOrders = ref<boolean>(false)

const drawerStatus = ref<boolean>(false)

const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => total + item.price, 0)
})

const vatPrice = computed(() => {
  return Math.round(totalPrice.value * 0.05)
})

const cardButtonDisabled = computed(() => {
  return cart.value.length === 0 || isCreatingOrders.value ? true : false
})

const createOrder = async () => {
  try {
    isCreatingOrders.value = true
    const { data } = await axios.post('https://0c4caff991af5fa7.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value
    })

    cart.value = []

    return data
  } catch (e) {
    console.error(e)
  } finally {
    isCreatingOrders.value = false
  }
}

const openDrawer = () => {
  drawerStatus.value = true
}

const closeDrawer = () => {
  drawerStatus.value = false
}

const onAddToCart = (item: CardType) => {
  cart.value.push(item)
  item.isAddedToCart = true
}

const onRemoveFromCart = (item: CardType) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAddedToCart = false
}

provide('cart', {
  cart,
  onAddToCart,
  onRemoveFromCart
})

provide('items', items)
</script>

<template>
  <Drawer
    v-if="drawerStatus"
    @close-drawer="closeDrawer"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    @create-order="createOrder"
    :card-button-disabled="cardButtonDisabled"
  />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl my-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
