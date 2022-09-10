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
          <div style="margin-top: 1rem;">
            <CardList />
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

export default {
    components: {
    CardList

}
};
</script>