<template>
  <main>
    <div class="row justify-content-start prodview-main">
      <div class="col-lg-4">
        <div class="row">
          <img
            src="https://www.maxima.lt/uploads/sale/2022/sales_page/07/04//malta-kava-lavazza-9768.png"
            alt=""
          />
        </div>
      </div>
      <div class="col-lg-8">
        <div class="row"><h3>Title</h3></div>
        <div class="row"><h4>Price</h4></div>
        <div class="row">
          <i>icon</i>
          <p>Add to favorites</p>
        </div>
      </div>
    </div>
    <div>
      <ProductViewCards />
    </div>
  </main>
</template>

<style>
@import "../assets/styles.css";
</style>

<script>
import ProductViewCards from "../components/ProductViewCards.vue";
export default {
  // props: ["popProd"],
};
</script>