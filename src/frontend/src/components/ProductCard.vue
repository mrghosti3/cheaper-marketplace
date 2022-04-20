<template>
  <div class="card pb-3">
    <div class="store-img">
      <img src="../assets/img/Lidl_logo.png" alt="" />
    </div>
    <div class="prod-img">
      <img
        src="../assets/img/product.jpg"
        alt=""
        data-bs-toggle="modal"
        data-bs-target="#popup"
      />
    </div>
    <div class="prod-name"><span>{{prodName}}</span></div>
    <div class="prod-price">
      <span v-show="prodOldPrice !== null" class="prod-old-price">{{prodOldPrice}}€</span>
      <span class="prod-current-price">{{prodPrice}}€</span>
    </div>
    <div class="price-date"><span>Price updated: {{priceDate}}</span></div>
  </div>
</template>

<script>
export default {
  props: ['prodName', 'prodOldPrice', 'prodPrice', 'priceDate'],
};
</script>
