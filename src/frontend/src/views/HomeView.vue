<template>
  <main>
    <div class="row justify-content-center">
      <div class="col-md-12 d-flex justify-content-center mt-5 mb-4">
        <h3>Recently updated prices</h3>
      </div>
    </div>
    <div class="row justify-content-center">
      <div
        class="col-md d-block mb-4 mt-5"
        v-for="item in products"
        :key="item.pid"
        s>
        <router-link :to="{ name: 'product', params: { id: item.pid }}">
        <ProductCard :prod="item" />
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md d-block mb-5 mt-5">
        <button class="load-more" v-on:click="loadNext">Load more</button>
      </div>
    </div>
    <!-- <div>
      <button
        type="button"
        class="report-btn"
        data-bs-toggle="modal"
        :data-bs-target="'#report'"
        data-keyboard="false"
        data-backdrop="static">
        <ReportPopup />
        <i class="fa fa-bug"></i>
      </button>
    </div> -->
  </main>
</template>

<style>
@import "../assets/styles.css";
</style>

<script>
import { BACKEND_URL } from "../constants";
import ProductCard from "../components/ProductCard.vue";
import ReportPopup from "../components/ReportPopup.vue";
export default {
  data() {
    return {
      products: [],
      page: 0
    };
  },
  components: {
    ProductCard,
    ReportPopup,
  },
  methods: {
    loadNext() {
      this.page += 1;
      const url = BACKEND_URL + "/products?limit=20&page=" + this.page;
      console.log(url);
      fetch(url)
        .then((res) => res.json())
        .then((data) => this.products.push(...data))
        .catch((err) => console.log(err.message));
      console.log(this.products.length);
    }
  },
  mounted() {
    fetch(BACKEND_URL + "/products?limit=20")
      .then((res) => res.json())
      .then((data) => (this.products = data))
      .catch((err) => console.log(err.message));
    console.log(this.products.length);
  },
};
</script>
