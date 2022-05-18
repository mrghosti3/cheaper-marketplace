<script setup>
import PopupCard from "./PopupCard.vue";
</script>

<template>
  <div class="card pb-3">
    <div class="store-img">
      <img :src="prod.shops[0].shopIconUrl" alt="" />
    </div>
    <div class="prod-img">
      <img :src="prod.productIconUrl" alt="" />
    </div>
    <div class="prod-name">
      <span v-show="prod.name.length > 36">{{ prod.name.substring(0,36)+"..." }}</span>
      <span v-show="prod.name.length <= 36">{{ prod.name }}</span>
    </div>
    <div class="prod-price">
      <span v-show="prod.shops[0].old_price != null" class="prod-old-price">{{ prod.shops[0].old_price }}€</span>
      <span class="prod-current-price">{{ prod.shops[0].price }}€</span>
    </div>
    <div class="price-date">
      <span>{{ prod.shops[0].lastScan.substring(0,10) }}</span>
    </div>
    <div class="prod-btn">
      <button class="to-store">
        <a
          :href="prod.shops[0].productUrl"
          target="_blank"
          rel="noopener noreferrer">Go to store</a>
      </button>
      <button class="to-popup" data-bs-toggle="modal" :data-bs-target="'#popup'+prod.pid">
        <PopupCard 
          :popProd='prod'
        />
        Other stores
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['prod'],
};
</script>
