<script setup lang="ts">
import { Mail, Phone } from "lucide-vue-next";
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
      <div class="md:w-2/3 mx-auto text-center">
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
      <div class="mt-10 md:grid gap-5 grid-cols-1 md:grid-cols-3 hidden">
        <div
          v-for="bt in businessTypes"
          :key="bt.name"
          class="card w-full md:w-96 shadow-sm border-2 border-accent"
        >
          <div class="overflow-hidden h-60">
            <img :src="bt.imageSrc" :alt="bt.alt" class="rounded-t-md w-full h-full object-cover" />
          </div>
          <div class="text-center p-0">
            <p class="text-primary tracking-widest uppercase m-0">{{ bt.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <OurProcessPane />

    <div id="contact" class="container-pane text-center my-20">
      <h2>Contact Us</h2>
      <p>
        Have a business opportunity or questions about our investment process? We'd love to hear
        from you! Whether you're looking to sell, partner, or simply learn more about what we do,
        reach out, and let's start the conversation.
      </p>

      <div class="flex place-content-center gap-10 scale-150 mt-20">
        <div>
          <a
            href="mailto:info@eleventhandpemberton.com"
            class="flex flex-col items-center text-center"
          >
            <Mail class="scale-150 mb-5 hover:text-neutral" />
            <p class="tracking-wide">info@eleventhandpemberton.com</p>
          </a>
        </div>
        <div>
          <a href="tel:7064263022" class="flex flex-col items-center text-center">
            <Phone class="scale-150 mb-5 hover:text-neutral" />
            <p class="tracking-wide">760-426-3022</p>
          </a>
        </div>
      </div>

      <form>
        <div class="flex gap-5">
          <input type="text" placeholder="First and Last Name" class="" />
          <input type="tel" placeholder="Phone" class="" />
        </div>
        <div class="flex gap-5">
          <input type="email" placeholder="Email" class="" />
          <input type="text" placeholder="Business Name" class="" />
        </div>

        <input type="url" placeholder="Business Website" />
        <textarea
          placeholder="Tell us about you and your business"
          class="w-1/2 rounded-lg p-3"
          rows="6"
        ></textarea>

        <button class="ep-btn">Send</button>
      </form>
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
  @apply md:text-5xl text-xl tracking-widest text-accent drop-shadow-lg mt-4 uppercase;
}

.container-pane {
  @apply container md:px-20 px-10 mx-auto;
}

@layer {
  .ep-btn {
    @apply bg-accent px-20 py-4 font-bold text-2xl rounded-md hover:bg-cream transition-colors;
  }
}

form {
  @apply flex flex-col gap-5 place-items-center mt-16 border-2 py-10 bg-primary rounded-3xl;
}

input {
  @apply w-96 h-16 p-3 rounded-md;
}
</style>
