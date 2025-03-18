<template>
  <footer>
    <p>Copyright © 2023 - {{ new Date().getFullYear() }} Eleventh & Pemberton</p>
    <p>
      Powered by
      <a
        href="https://csra-web-services.vercel.app/"
        target="_blank"
        class="text-secondary font-medium hover:text-primary"
      >
        CSRA Web Services
      </a>
    </p>
  </footer>
</template>

<style scoped>
footer {
  @apply h-24 flex flex-col items-center justify-center mt-5;
}

p {
  @apply text-primary text-base ml-5 mb-3;
}
</style>
