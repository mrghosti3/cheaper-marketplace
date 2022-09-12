
<template>
  <div class="card pb-3" >
    <div class="store-img">
      <img :src="prod.shops[0].shopIconUrl" alt=""/>
    </div>
    <div class="prod-img">
      <img :src="prod.productIconUrl" alt="" />
    </div>
    <div class="prod-name">
      <span v-show="prod.name.length > 36">{{ prod.name.substring(0,36)+"..." }}</span>
      <span v-show="prod.name.length <= 36">{{ prod.name }}</span>
    </div>
    <div class="prod-price">
      <span class="prod-current-price">{{ prod.shops[0].priceHistory[prod.shops[0].priceHistory.length-1] }}€</span>
    </div>
    <div class="price-date">
      <span>{{ prod.shops[0].scanHistory[prod.shops[0].scanHistory.length-1].substring(0,10) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['prod'],
};
</script>

<style>
 a, a:hover, a:focus, a:active {
      text-decoration: none;
      color: inherit;
 }
</style>
