<script setup lang="ts">
import AboutPane from './components/AboutPane.vue'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <TheHeader />
  <main>
    <div class="w-full h-screen relative overflow-hidden drop-shadow-2xl">
      <img
        src="/images/csra-investment-company-hero.jpg"
        alt="a woman standing in a meeting addressing the attendees"
      />
      <div class="overlay"></div>
      <div id="hero-txt">
        <h1>Investing in Your Legacy</h1>
        <p id="tagline">We buy and invest in small businesses</p>
      </div>
    </div>

    <div class="container px-20 mx-auto">
      <AboutPane />
    </div>
  </main>
</template>

<style scoped>
.overlay {
  @apply absolute inset-0 bg-black opacity-25;
}

#hero-txt {
  @apply absolute inset-0 object-none place-content-center text-center;
}

#tagline {
  @apply text-5xl tracking-widest text-accent drop-shadow-lg mt-4 uppercase;
}
</style>
