<template>
  <main>
    <span>{{ products }}</span>
    <div class="row justify-content-start prodview-main"  style="margin: 3rem;">
      <div class="col-lg-4">
        <div class="row">
          <img
            :src="products.productIconUrl"
            alt=""
            style="max-height: 250px; max-width: 250px;"
          />
        </div>
      </div>
      <div
        class="col-lg-8">
        <div class="row"><h2 style="color: black;">{{ products.name }}</h2></div> 
        <div class="row">
          <h3>Kainos nuo  <span style="color: #2F79C6">{{ products.shops[0].priceHistory[0] }}€</span></h3>
        </div>
      </div>
    </div>
    <div  style="float: left; width: 100%;">
    <ProductViewCards :prod="item"/>
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
  data() {
    return {
      products: []
    };
  },
  components: {
    ProductViewCards
  },
  created() {
    fetch(BACKEND_URL + "/product/" + this.$route.params.id)
      .then((res) => res.json())
      .then((data) => (this.products = data))
      .catch((err) => console.log(err.message));
  },
};

</script>