<template>
  <div >
    <div class="card pb-3">
      <div class="popup-store-img">
        <img :src=prod.shop_icon_url alt="">
      </div>
      <div class="popup-prod-name">
        <span>{{name}}</span>
      </div>
      <div class="popup-prod-price"><span>{{prod.price}}€</span></div>
      <div class="popup-store-btn">
        <button href="#">GO TO STORE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['prod', 'name']
};
</script>