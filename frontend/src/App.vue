<script setup lang="ts">
import { CheckCircle, ShieldX } from "lucide-vue-next";
import { provide, ref } from "vue";
import { RouterView } from "vue-router";
import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";

const showError = ref<boolean>(false);
const toastErrorMsg = ref<string>("");

const showErrorToast = (msg: string) => {
  toastErrorMsg.value = msg;
  showError.value = true;
};

const showSuccess = ref<boolean>(false);
const toastSuccessMsg = ref<string>("");

const showSuccessToast = (msg: string) => {
  toastSuccessMsg.value = msg;
  showSuccess.value = true;

  setTimeout(() => {
    showSuccess.value = false;
  }, 5000);
};

provide("showErrorToast", showErrorToast);
provide("showSuccessToast", showSuccessToast);
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
  <div
    role="alert"
    class="alert alert-success absolute end-10 drop-shadow-lg mt-8 animate-bounce"
    v-show="showSuccess"
  >
    <CheckCircle />
    <span class="font-semibold text-xl">{{ toastSuccessMsg }}</span>
  </div>
  <main>
    <RouterView />
  </main>
  <TheFooter />
</template>
