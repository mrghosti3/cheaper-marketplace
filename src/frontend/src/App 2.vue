<script setup>
import NavBar from "./components/NavBar.vue";
import ProductCard from "./components/ProductCard.vue"
import PopupCard from "./components/PopupCard.vue"
</script>

<template>
  <main>
    <NavBar />
    <div class="container-fluid">
      <PopupCard />
      <!-- Front page product listings -->
      <div class="row justify-content-center">
        <div class="col-md-12 d-flex justify-content-center mt-5 mb-5">
          <h3>Recently updated prices</h3>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md d-block mb-4" v-for='index in 10' :key= 'index'>
          <ProductCard />
        </div>
      </div>
    </div>
  </main>
</template>

<style>
@import "./assets/styles.css";
</style>
