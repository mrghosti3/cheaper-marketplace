<template>
  <main>
    <div class="row justify-content-center">
      <div class="col-md-12 d-flex justify-content-center mt-5 mb-4">
        <h3>All products related to: {{ query }}</h3>
      </div>
    </div>
    <div class="row justify-content-center">
      <div
        class="col-md d-block mb-4 mt-5"
        v-for="item in products"
        :key="item.pid"
        s
      >
        <router-link :to="{ name: 'product', params: { id: item.pid } }">
          <ProductCard :prod="item" />
        </router-link>
      </div>
    </div>
  </main>
</template>

<style>
@import "../assets/styles.css";
</style>

<script>
import { BACKEND_URL } from "../constants";
import ProductCard from "../components/ProductCard.vue";
export default {
  props: ["query"],
  data() {
    return {
      products: [],
      page: 0,
    };
  },
  components: {
    ProductCard,
  },
  mounted() {
    fetch(BACKEND_URL + "/search?t=" + this.query)
      .then((res) => res.json())
      .then((data) => (this.products = data))
      .catch((err) => console.log(err.message));
  },
  updated() {
    fetch(BACKEND_URL + "/search?t=" + this.query)
      .then((res) => res.json())
      .then((data) => (this.products = data))
      .catch((err) => console.log(err.message));
  },
};
</script>
