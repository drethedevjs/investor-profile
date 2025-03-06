<script lang="ts" setup>
import process from "@/data/process";
</script>
<template>
  <div id="our-process" class="bg-cream text-primary py-20">
    <div class="md:w-2/3 px-5 mx-auto text-center">
      <h2 class="text-secondary">Our Investment Process</h2>
      <p>
        We believe in making the investment process straightforward and transparent. Whether you're
        looking to sell your business or seeking investment to grow, we guide you through each step
        with clarity and confidence. From the initial conversation to closing the deal, our process
        ensures a smooth transition and long-term success.
      </p>

      <table class="table md:mt-20 mt-10">
        <tbody>
          <tr v-for="p in process" :key="p.step">
            <td>
              <p class="step">Step {{ p.step }}</p>
            </td>
            <td>
              <p class="answer-header">{{ p.header }}</p>
              <p class="answer">
                {{ p.answer }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.answer-header {
  @apply md:text-5xl text-3xl text-secondary;
}

.step {
  @apply md:text-7xl text-2xl;
}
</style>
