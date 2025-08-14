<script lang="ts" setup>
import { Mail, Phone } from "lucide-vue-next";
import HamburgerIcon from "./HamburgerIcon.vue";
</script>
<template>
  <header>
    <div class="navbar bg-primary text-white h-20 shadow-sm">
      <div class="navbar-start">
        <div class="dropdown">
          <HamburgerIcon />
          <ul
            tabindex="0"
            class="text-xl menu menu-sm dropdown-content bg-accent rounded-box z-1 mt-3 p-2 shadow text-primary"
          >
            <li><a href="#about-pane">About</a></li>
            <li><a href="#investment-criteria">Our Criteria</a></li>
            <li><a href="#business-types">Investment Types</a></li>
            <li><a href="#our-process">Our Process</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="navbar-center ml-3 mt-3">
        <a class="flex flex-col text-center" href="/">
          <!-- Eleventh & Pemberton -->
          <img src="/public/images/logos/logo-wht-txt-clipped.png" class="md:h-10 h-5" />
          <p class="tracking-widest uppercase font-thin md:text-base text-sm">holdings</p>
        </a>
      </div>
      <div class="navbar-end">
        <div class="xl:pr-40 pr-10 gap-10 md:flex hidden">
          <a
            href="mailto:info@eleventhandpemberton.com"
            class="contact-link"
            data-tip="info@eleventhandpemberton.com"
          >
            <Mail class="size-8" />
          </a>
          <a href="tel:7064263022" class="contact-link" data-tip="706-426-3022">
            <Phone class="size-8" />
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
li > a {
  @apply text-3xl px-10 py-5;
}

a.contact-link {
  @apply tooltip tooltip-bottom tooltip-accent;
}
</style>
