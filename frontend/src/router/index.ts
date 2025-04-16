import BrandView from "@/views/BrandView.vue";
import DealView from "@/views/DealView.vue";
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/deals",
      name: "deals",
      component: DealView,
    },
    {
      path: "/brand",
      name: "brand",
      component: BrandView,
    },
  ],
});

export default router;
