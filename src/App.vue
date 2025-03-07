<script setup lang="ts">
import AboutPane from "./components/AboutPane.vue";
import ContactPane from "./components/ContactPane.vue";
import InvestmentCriteria from "./components/InvestmentCriteria.vue";
import OurProcessPane from "./components/OurProcessPane.vue";
import TheFooter from "./components/TheFooter.vue";
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
        class="h-full w-full object-cover"
      />
      <div class="overlay flex md:hidden"></div>
      <div id="hero-txt">
        <h1>Investing in Your Legacy</h1>
        <p id="tagline">We buy and invest in small businesses</p>
      </div>
    </div>

    <div class="container-pane">
      <AboutPane />
    </div>

    <div class="bg-primary text-accent py-20">
      <InvestmentCriteria />
    </div>

    <div id="business-types" class="container-pane md:my-20 my-10">
      <div class="lg:w-2/3 mx-auto text-center">
        <h2 class="text-secondary">Types of Businesses</h2>
        <p class="">
          We specialize in investing in businesses that have strong growth potential, committed
          leadership, and a clear vision for the future. We focus on industries that align with our
          values and where we can make a lasting impact. Below are the types of businesses we are
          particularly interested in.
        </p>
      </div>
      <!-- mobile list -->
      <div class="mt-10 grid gap-5 grid-cols-1 md:grid-cols-3">
        <div
          v-for="bt in businessTypes"
          :key="bt.name"
          class="md:hidden flex gap-5 border-2 border-accent rounded-lg"
        >
          <div class="overflow-hidden h-20 w-20">
            <img :src="bt.imageSrc" :alt="bt.alt" class="rounded-t-md w-full h-full object-cover" />
          </div>

          <div class="place-content-center">
            <p class="text-primary tracking-widest uppercase m-0">{{ bt.name }}</p>
          </div>
        </div>
      </div>

      <!-- desktop list -->
      <div class="mt-10 md:grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 hidden">
        <div
          v-for="bt in businessTypes"
          :key="bt.name"
          class="card w-full md:w-80 h-52 shadow-sm border-2 border-accent"
        >
          <div class="overflow-hidden h-60">
            <img :src="bt.imageSrc" :alt="bt.alt" class="rounded-t-md w-full h-full object-cover" />
          </div>
          <div class="text-center p-0">
            <p class="text-primary tracking-widest uppercase m-0 text-xl">{{ bt.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <OurProcessPane />

    <ContactPane />
  </main>
  <TheFooter />
</template>

<style scoped>
.overlay {
  @apply absolute inset-0 bg-black opacity-25;
}

#hero-txt {
  @apply absolute inset-0 object-none place-content-center text-center;
}

#tagline {
  @apply md:text-5xl text-xl tracking-widest text-accent drop-shadow-lg mt-4 uppercase;
}
</style>
