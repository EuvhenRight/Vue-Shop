<template>
  <header class="flex justify-between border-b border-slate-300 px-10 py-8">
    <div class="flex items-center gap-4 cursor-pointer">
      <img class="w-10" src="/logo.png" alt="logo" />
      <div>
        <h2 class="text-xl uppercase font-bold">Vue Snickers</h2>
        <p class="text-slate-400">The best shop in the world</p>
      </div>
    </div>
    <ul class="flex items-center gap-10">
      <li class="flex items-center gap-3 cursor-pointer hover:text-black">
        <img src="/cart.svg" alt="Cart" />
        <b>500 euros</b>
      </li>
      <li class="flex items-center gap-3 text-slate-400 cursor-pointer hover:text-black">
        <img src="/heart.svg" alt="Wishlist" />
        <span>Wishlist</span>
      </li>
      <li class="flex items-center gap-3 text-slate-400 cursor-pointer hover:text-black">
        <img src="/profile.svg" alt="Profile" />
        <span>Profile</span>
      </li>
    </ul>
  </header>
</template>
