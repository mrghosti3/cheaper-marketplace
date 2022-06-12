<script setup>
import PopupProduct from "./PopupProduct.vue";
</script>

<template>
  <!-- Product price comparison popup -->
  <div :id="`popup${popProd.pid}`" class="modal fade justify-content-center" data-backdrop="static" data-keyboard="false">
    <div id="popup-dialog" class="modal-dialog d-block">
      <div id="popup-content" class="modal-content">
        <!-- Header -->
        <div id="popup-header" class="modal-header">
          <h4 class="modal-title ps-5" v-show="popProd.name.length > 50">{{ popProd.name.substring(0,50)+"..." }}</h4>
          <h4 class="modal-title ps-5" v-show="popProd.name.length <= 50">{{ popProd.name }}</h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <!-- Body -->
        <div id="popup-body" class="modal-body">
          <div class="row">
            <div class="col-md-12 d-flex justify-content-start mt-5 mb-2 ms-5">
              <h5>This product is available in:</h5>
            </div>
          </div>
          <div class="row justify-content-center mb-5 mt-5 ms-5 me-5">
            <div class="col-md d-block mb-4">
              <div class="card best-price pb-3">
                <div class="popup-store-img">
                  <img :src=popProd.shops[0].shopIconUrl alt="">
                </div>
                <div class="popup-prod-name">
                  <span v-show="popProd.name.length > 36">{{ popProd.name.substring(0,36)+"..." }}</span>
                  <span v-show="popProd.name.length <= 36">{{ popProd.name }}</span>
                </div>
                <div class="popup-prod-price"><span>{{popProd.shops[0].price}}€</span></div>
                <div class="popup-store-btn">
                  <button><a :href=popProd.shops[0].productUrl target="_blank" rel="noopener noreferrer">Go to store</a></button>
                </div>
              </div>
            </div>
            <div class="other-products col-md d-block mb-4" v-for='item in popProd.shops.slice(1)' :key= 'item'>
              <PopupProduct
                :prod='item'
                :name='popProd.name'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['popProd']
};
</script>