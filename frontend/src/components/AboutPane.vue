<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <section id="about-pane">
    <div class="container-pane">
      <div class="lg:w-1/3">
        <div class="flex flex-col">
          <img
            src="/images/ep-holdings-president.jpeg"
            alt="Head shot of company president."
            class="rounded-lg"
          />

          <div class="text-center mt-5">
            <p class="font-bold mb-0 text-primary drop-shadow-sm">Andre Thomas</p>
            <small class="italic text-xl">President</small>
          </div>
        </div>
      </div>
      <div class="lg:w-2/3">
        <h2>About Us</h2>
        <p>
          At Eleventh & Pemberton, we believe in investing in your legacy. We're not just about
          financial growth—we're about building something lasting, something meaningful. Our passion
          lies in helping small businesses thrive by providing the capital, resources, and guidance
          they need to flourish.
        </p>
        <p>
          We buy and invest in small businesses with a focus on fostering long-term success. Whether
          it's helping an established brand scale or empowering a startup to reach its full
          potential, we're here to support growth at every stage.
        </p>
        <p>
          We're driven by a simple but powerful mission: to invest in people, ideas, and dreams that
          create lasting impact. By partnering with us, you're not just securing financial backing;
          you're investing in your future and building the foundation for a legacy that will endure.
          Let's grow together.
        </p>
        <RouterLink to="/profile">
          <button class="ep-btn">Investor Profile</button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
#about-pane {
  @apply my-20 flex lg:flex-row flex-col md:gap-20 gap-10;
}
</style>
