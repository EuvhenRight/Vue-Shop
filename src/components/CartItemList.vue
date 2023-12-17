<script setup lang="ts">
import CartItem from './CartItem.vue'
import { inject } from 'vue'
import type { Card as CardType } from './types/types'

const { cart, onRemoveFromCart }: { cart: CardType[]; onRemoveFromCart: (item: CardType) => void } =
  inject('cart', {
    cart: [],
    onRemoveFromCart: () => {}
  })
</script>

<template>
  <div class="flex flex-col gap-2" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :item="item"
      @on-remove-from-cart="() => onRemoveFromCart(item)"
    />
  </div>
</template>
