<template>
  <div>
    <div class="card pb-3">
      <div class="popup-store-img">
        <img :src="prod.shop_icon_url" alt="" />
      </div>
      <div class="popup-prod-name">
        <span v-show="name.length > 20">{{ name.substring(0,20)+"..." }}</span>
        <span v-show="name.length <= 20">{{ name }}</span>
      </div>
      <div class="popup-prod-price">
        <span>{{ prod.price }}€</span>
      </div>
      <div class="popup-store-btn">
        <button>
          <a
            :href="prod.product_url"
            target="_blank"
            rel="noopener noreferrer"
            >Go to store</a
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["prod", "name"],
};
</script>