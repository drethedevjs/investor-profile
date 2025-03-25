<script setup lang="ts">
import { ShieldX } from "lucide-vue-next";
import { provide, ref } from "vue";
import { RouterView } from "vue-router";
import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";

let showError = ref<boolean>(false);
let toastErrorMsg = ref<string>("");

const showErrorToast = (msg: string) => {
  toastErrorMsg.value = msg;
  showError.value = true;
};

provide("showErrorToast", showErrorToast);
</script>

<template>
  <TheHeader />
  <div
    role="alert"
    class="alert alert-error absolute end-10 drop-shadow-lg mt-8 animate-bounce"
    v-show="showError"
  >
    <ShieldX />
    <span class="font-semibold text-xl">{{ toastErrorMsg }}</span>
  </div>
  <main>
    <RouterView />
  </main>
  <TheFooter />
</template>
