<script setup lang="ts">
import CartItemList from './CartItemList.vue'
import { computed, inject, ref, defineProps } from 'vue'
import InfoBlock from './InfoBlock.vue'
import axios from 'axios'
import type { Card as CardType } from './types/types'
import type { Ref } from 'vue'

const isCreatingOrders = ref<boolean>(false)
const isOrderId = ref<number>()

const { cart, closeDrawer }: { cart: Ref<CardType[]>; closeDrawer: () => void } = inject('cart', {
  cart: ref([]),
  closeDrawer: () => {}
})

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const cardButtonDisabled = computed(() => {
  return cart.value.length === 0 || isCreatingOrders.value ? true : false
})

const createOrder = async () => {
  try {
    isCreatingOrders.value = true
    const { data } = await axios.post('https://0c4caff991af5fa7.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice
    })

    cart.value = []

    isOrderId.value = data.id
  } catch (e) {
    console.error(e)
  } finally {
    isCreatingOrders.value = false
  }
}
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-10">
    <div class="bg-white fixed top-0 right-0 h-full w-96 z-20 p-8">
      <div class="flex gap-5">
        <h2 class="text-2xl font-bold flex items-center gap-5">
          <svg
            @click="closeDrawer"
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

      <div v-if="!totalPrice && isOrderId" class="flex flex-col h-full items-center justify-center">
        <InfoBlock
          v-if="!totalPrice && !isOrderId"
          title="Cart empty"
          description="Add items to your cart"
          imageUrl="/package-icon.png"
        />
        <InfoBlock
          v-if="isOrderId"
          title="Order created"
          :description="`Your order №${isOrderId} will be processed soon`"
          imageUrl="/order-success-icon.png"
        />
      </div>
      <div v-else="totalPrice" class="flex flex-col h-full justify-between">
        <CartItemList />
        <div class="flex flex-col gap-2 my-7">
          <div class="flex gap-2">
            <span class="text-slate-400">Total:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ totalPrice }} $</b>
          </div>
          <div class="flex gap-2 mt-4">
            <span class="text-slate-400">Tax 5%:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ vatPrice }} $</b>
          </div>
          <button
            @click="createOrder"
            :disabled="cardButtonDisabled"
            class="bg-lime-500 text-white w-full py-4 rounded-xl mt-4 disabled:bg-slate-400 transition hover:bg-lime-600 active:bg-lime-700"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
