import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
import ProductView from "../views/ProductView.vue";

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: HomeView,
    },
    {
      name: 'search',
      path: '/search',
      component: SearchView,
      props: (route) => ({ query: route.query.q }),
    },
    {
      name: 'product',
      path: '/product/:id',
      component: ProductView,
      props: true
    },
  ],
});
