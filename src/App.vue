<script setup lang="ts">
import AboutPane from "./components/AboutPane.vue";
import InvestmentCriteria from "./components/InvestmentCriteria.vue";
import OurProcessPane from "./components/OurProcessPane.vue";
import TheHeader from "./components/TheHeader.vue";
import businessTypes from "./data/businessTypes";
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

    <div class="bg-primary text-accent py-20">
      <InvestmentCriteria />
    </div>

    <div id="business-types" class="container px-20 mx-auto my-20">
      <div class="w-2/3 mx-auto text-center">
        <h2 class="text-secondary">Types of Businesses</h2>
        <p class="">
          We specialize in investing in businesses that have strong growth potential, committed
          leadership, and a clear vision for the future. We focus on industries that align with our
          values and where we can make a lasting impact. Below are the types of businesses we are
          particularly interested in.
        </p>
      </div>
      <div class="mt-10 grid gap-5 grid-cols-2 md:grid-cols-3">
        <div
          v-for="bt in businessTypes"
          :key="bt.name"
          class="card w-96 shadow-sm border-2 border-accent"
        >
          <div class="overflow-hidden h-60">
            <img :src="bt.imageSrc" :alt="bt.alt" class="rounded-t-md w-full h-full object-cover" />
          </div>
          <div class="text-center p-0">
            <p class="text-primary tracking-widest uppercase">{{ bt.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <OurProcessPane />
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
