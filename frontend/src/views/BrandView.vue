<script setup lang="ts">
import brandColorsData from "@/data/colors";
import type IBrandColor from "@/interfaces/IBrandColor";
import { Copy } from "lucide-vue-next";
import { ref } from "vue";

const brandColors = ref(brandColorsData);

const copyHexValue = (color: IBrandColor) => {
  toggleCopy(color);
  navigator.clipboard.writeText(color.hexValue);
  setTimeout(() => {
    toggleCopy(color);
  }, 3000);
};

const toggleCopy = (color: IBrandColor) => (color.copied = !color.copied);
</script>

<template>
  <div class="m-20">
    <h1>Brand</h1>
    <div class="mt-10">
      <h2>Colors</h2>
      <div
        class="brand-color font-semibold text-xl"
        :class="[color.bgClassName, color.textColor]"
        @click="() => copyHexValue(color)"
        v-for="color in brandColors"
      >
        {{ color.name }}: {{ color.hexValue }}
        <Copy v-show="!color.copied" />
        <p class="animate-bounce" v-show="color.copied">Copied!</p>
      </div>
    </div>
    <div class="mt-10">
      <h2>Logos</h2>
      <h3>Fonts</h3>
      <ul class="ml-10 mb-5">
        <li>"Eleventh" is Baskerville font.</li>
        <li>"& Pemberton" is Avenir Next font.</li>
      </ul>
      <div id="transparent-bg">
        <h3>Transparent Backgrounds</h3>
        <div class="grid gap-5 grid-cols-1 xl:grid-cols-3">
          <img
            src="/images/logos/logo-blue-txt.png"
            class="logo h-96"
            alt="EP logo with blue text and transparent background."
          />
          <div>
            <img
              src="/images/logos/logo-wht-txt.png"
              class="logo h-96 bg-gray-200"
              alt="EP logo with blue text and transparent background."
            />
            <small><i>Gray background here to show white text.</i></small>
          </div>
          <div>
            <img
              src="/images/logos/logo-wht-txt-clipped.png"
              class="logo h-20 bg-gray-200"
              alt="EP logo with blue text and transparent background."
            />
            <small><i>Gray background here to show white text.</i></small>
          </div>
          <img
            src="/images/logos/logo-blue-txt-clipped.png"
            class="logo h-20"
            alt="EP logo with blue text and transparent background."
          />
        </div>
      </div>
      <hr class="my-10" />
      <div id="solid-bg" class="">
        <h3>Solid Backgrounds</h3>
        <div class="grid gap-5 grid-cols-1 xl:grid-cols-2">
          <img
            src="/images/logos/logo-blue-txt-wht-bg.jpg"
            class="logo h-96"
            alt="EP logo with blue text and transparent background."
          />
          <img
            src="/images/logos/logo-blue-bg-wht-txt.jpg"
            class="logo h-96"
            alt="EP logo with blue text and transparent background."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  @apply rounded-md border-2 border-accent cursor-pointer object-contain;
}

.brand-color {
  @apply rounded-lg flex justify-between p-4 mb-2 cursor-pointer;
}

li {
  @apply list-disc inset-3 text-2xl;
}
</style>
