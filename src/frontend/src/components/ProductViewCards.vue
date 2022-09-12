<template>
  <main>
    <div class="row justify-content-center prodview-items">
      <ul class="nav nav-tabs center-screen" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="prices-tab"
            data-bs-toggle="tab"
            data-bs-target="#prices"
            type="button"
            role="tab"
            aria-controls="prices"
            aria-selected="true"
          >
            Kiti produktai
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="history-tab"
            data-bs-toggle="tab"
            data-bs-target="#history"
            type="button"
            role="tab"
            aria-controls="history"
            aria-selected="false"
          >
            Kainos istorija
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="prices" role="tabpanel" aria-labelledby="prices-tab">
          <div
            style="margin-top: 1rem"
            v-for="item in prod.shops"
            :key="item.name"
          >
            <a :href="item.productUrl">
              <div class="center-screen">
                <div class="carder">
                  <div class="additional">
                    <div class="user-card">
                      <svg
                        width="100"
                        height="100"
                        viewBox="0 0 250 250"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-labelledby="title desc"
                        class="center"
                      ></svg>
                      <img
                        :src="item.shopIconUrl"
                        alt=""
                        class="center shop-logo"
                      />
                    </div>
                    <img
                      src="../assets/img/click.png"
                      alt=""
                      style="
                        max-width: 50px;
                        max-height: 50px;
                        float: right;
                        margin-top: 0.75rem;
                        margin-right: 1rem;
                      "
                    />
                    <h5 class="" style="margin-top: 1.25rem">Į parduotuvę</h5>
                  </div>
                  <div>
                    <div
                      style="margin-left: 10rem; margin-bottom: 1rem;"
                    >
                      <span v-show="item.name.length > 36" class="strong-span">{{ item.name.substring(0,36)+"..." }}</span>
                      <span v-show="item.name.length <= 36" class="strong-span">{{ item.name.length }}</span>
                      <!-- <h6>
                        {{ item.name }}
                      </h6> -->

                      <h6>
                        {{ item.priceHistory[0] }}€
                      </h6>
                      <p style="font-size: 0.8rem">
                        Kaina atnaujinta: {{ item.scanHistory[0] }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="history"
          role="tabpanel"
          aria-labelledby="history-tab"
        >

         <line-chart :data="data"></line-chart>

        </div>
      </div>
    </div>
  </main>
</template>

<style>
@import "../assets/styles.css";
</style>

<script>
export default {
  props: ["prod"],
  data() {
    return {
      data: null
    }
  },
  created() {
    this.chartHistory()
  },
  methods: {
    chartHistory(){
      const res = {};
      const list = this.prod;
      list.shops.forEach(d => d.scanHistory.forEach((s, i) => res[s] = d.priceHistory[i]));
      this.data = res;
      console.log(this.data);
    }
  }
};
</script>