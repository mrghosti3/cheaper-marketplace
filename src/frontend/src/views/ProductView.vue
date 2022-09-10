<template>
  <main>
    <div class="row justify-content-start prodview-main"  style="margin: 3rem;">
      <div class="col-lg-4">
        <div class="row">
          <img
            src="https://www.maxima.lt/uploads/sale/2022/sales_page/07/04//malta-kava-lavazza-9768.png"
            alt=""
            style="max-height: 250px; max-width: 250px;"
          />
        </div>
      </div>
      <div class="col-lg-8">
        <div class="row"><h3>{{ products }}</h3></div>
        <div class="row"><h4>Kaina</h4></div>
        <div class="row">
          <p>Įtraukti į mėgstamiausių sarašą</p>
        </div>
      </div>
    </div>
    <div style="float: left; width: 100%;">
    <ProductViewCards />
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
  props: {
    products: []
  },
  components: {
    ProductViewCards
  },
  mounted() {
    fetch(BACKEND_URL + "/product/" + this.$route.params.id)
      .then((res) => res.json())
      .then((data) => (this.products = data))
      .catch((err) => console.log(err.message));
    console.log(this.$route.params.id);
  },
};

</script>