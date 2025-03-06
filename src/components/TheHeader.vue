<script lang="ts" setup>
import HamburgerIcon from './HamburgerIcon.vue'
</script>
<template>
  <header>
    <div class="navbar bg-primary text-white h-32 shadow-sm">
      <div class="navbar-start">
        <div class="dropdown">
          <HamburgerIcon />
          <ul
            tabindex="0"
            class="text-xl menu menu-sm dropdown-content bg-accent rounded-box z-1 mt-3 p-2 shadow text-primary"
          >
            <li><a>Home</a></li>
            <li><a href="#about-pane">About</a></li>
            <li><a>Portfolio</a></li>
          </ul>
        </div>
      </div>
      <div class="navbar-center flex flex-col">
        <a class="btn btn-ghost text-8xl">Eleventh & Pemberton</a>
        <p class="tracking-widest uppercase font-thin">holdings</p>
      </div>
      <div class="navbar-end"></div>
    </div>
  </header>
</template>

<style scoped>
a {
  @apply text-3xl px-10 py-5;
}
</style>
