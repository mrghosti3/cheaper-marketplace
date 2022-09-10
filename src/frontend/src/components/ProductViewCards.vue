<template>
  <main>
    <div class="row justify-content-center prodview-items">
      <ul class="nav nav-tabs center-screen" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="prices-tab" data-bs-toggle="tab" data-bs-target="#prices" type="button"
            role="tab" aria-controls="prices" aria-selected="true">
            Kiti produktai
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button"
            role="tab" aria-controls="history" aria-selected="false">
            Kainos istorija
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="prices" role="tabpanel" aria-labelledby="prices-tab">
          <div style="margin-top: 1rem;" v-for="item in products.shops" :key="item.sid">
            <!-- <CardList :prod="item"/> -->
            <a :href="item.productUrl">
              <div class="center-screen">
                <div class="carder">
                  <div class="additional">
                    <div class="user-card">
                      <svg width="100" height="100" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" role="img"
                        aria-labelledby="title desc" class="center">
                      </svg>
                      <img :src="item.shopIconUrl" alt="" class="center shop-logo">
                    </div>
                    <img src="../assets/img/click.png" alt=""
                      style="max-width: 50px; max-height:50px; float: right; margin-top: 0.75rem; margin-right: 1rem;">
                    <h5 class="" style="margin-top: 1.25rem;">Į parduotuvę</h5>
                  </div>

                  <div class="general">
                    <div class="center" style="margin-left: 5rem; margin-bottom: 1rem;">
                      <h5 style="color: black; margin-top: 1rem;">{{ item.name }}</h5>
                      <h6 style="margin-top: -0.5rem">{{ item.priceHistory[0] }}€</h6>
                      <p style="font-size: 12px;">Kaina atnaujinta: {{ item.scanHistory[0] }}</p>
                    </div>
                  </div>
                </div>

              </div>
            </a>
          </div>
        </div>
        <div class="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
          History
        </div>
      </div>
    </div>
  </main>
</template>

<style>
@import "../assets/styles.css";
</style>

<script>
import CardList from './CardList.vue';
import { BACKEND_URL } from "../constants";

export default {
  data() {
    return {
      products: []
    };
  },
  components: {
    CardList
  },
  created() {
    fetch(BACKEND_URL + "/product/" + this.$route.params.id)
      .then((res) => res.json())
      .then((data) => (this.products = data))
      .catch((err) => console.log(err.message));
    console.log(this.$route.params.id);
  },
};
</script>