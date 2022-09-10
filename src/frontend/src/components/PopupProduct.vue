<template>
  <div>
    <div class="card pb-3">
      <div class="popup-store-img">
        <img :src="prod.shopIconUrl" alt="" />
      </div>
      <div class="popup-prod-name">
        <span v-show="name.length > 36">{{ name.substring(0,36)+"..." }}</span>
        <span v-show="name.length <= 36">{{ name }}</span>
      </div>
      <!-- <span v-show="item.name.length > 36">{{ item.name.substring(0,36)+"..." }}</span>
                      <span v-show="item.name.length <= 36">{{ item.name }}</span> -->
      <div class="popup-prod-price">
        <span>{{ prod.price }}€</span>
      </div>
      <div class="popup-store-btn">
        <button>
          <a
            :href="prod.productUrl"
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