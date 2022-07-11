<template>
  <main>
    <div class="row justify-content-center">
      <div class="col-md-12 d-flex justify-content-center mt-5 mb-4">
        <h3>Recently updated prices</h3>
      </div>
      <div id="filters" class="col-md d-block dropdown justify-content-center">
        <button
          class="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Order by
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="#">Name ASC</a></li>
          <li><a class="dropdown-item" href="#">Name DEC</a></li>
          <li><a class="dropdown-item" href="#">Cheapest</a></li>
          <li><a class="dropdown-item" href="#">Most expensive</a></li>
        </ul>
      </div>
    </div>
    <div class="row justify-content-center">
      <div
        class="col-md d-block mb-4 mt-5"
        v-for="item in products"
        :key="item.pid"
      >
        <ProductCard :prod="item" />
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
      const url = BACKEND_URL + "/product?limit=20&page=" + this.page;
      console.log(url);
      fetch(url)
        .then((res) => res.json())
        .then((data) => this.products.push(...data))
        .catch((err) => console.log(err.message));
      console.log(this.products.length);
    }
  },
  mounted() {
    fetch(BACKEND_URL + "/product?limit=20")
      .then((res) => res.json())
      .then((data) => (this.products = data))
      .catch((err) => console.log(err.message));
    console.log(this.products.length);
  },
};
</script>
