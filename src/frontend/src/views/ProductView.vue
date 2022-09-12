<template>
  <main>
    <div class="row justify-content-start prodview-main" style="margin: 3rem">
      <div class="col-lg-4">
        <div class="row">
          <img
            :src="products[0].productIconUrl"
            alt=""
            style="max-height: 250px; max-width: 250px;"
          />
        </div>
      </div>
      <div class="col-lg-8">
        <div class="row">
          <h2 style="color: black">{{ products[0].name }}</h2>
        </div>
        <div class="row">
          <h4>
            Kainos nuo
            <span style="color: #2f79c6">{{ products[0].shops[0].priceHistory[products[0].shops[0].priceHistory.length-1] }}€</span>
          </h4>
        </div>
      </div>
    </div>
    <div>
      <ProductViewCards :prod="products[0]" />
    </div>
  </main>
</template>

<style>
@import "../assets/styles.css";
</style>

<script>
import ProductViewCards from "@/components/ProductViewCards.vue";
import { BACKEND_URL } from "../constants";

export default {
  name: "shops",
  data() {
    return {
      products: [],
    };
  },
  components: {
    ProductViewCards,
  },
  beforeCreate() {
    fetch(BACKEND_URL + "/product/" + this.$route.params.id)
      .then((res) => res.json())
      .then((data) => (this.products = data))
      .catch((err) => console.log(err.message));
  },
};
</script>