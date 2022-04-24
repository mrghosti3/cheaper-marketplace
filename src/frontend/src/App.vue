<script setup>
import NavBar from "./components/NavBar.vue";
// import PopupCard from "./components/PopupCard.vue";
</script>

<template>
  <main>
    <NavBar />
    <div class="container-fluid" >
      <!-- <div v-for='item in products' :key= 'item.pid'>
        <PopupCard
          :prod="item"
        />
      </div> -->
      <!-- Front page product listings -->
      <div class="row justify-content-center">
        <div class="col-md-12 d-flex justify-content-center mt-5 mb-5">
          <h3>Recently updated prices</h3>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md d-block mb-4" v-for='item in products' :key= 'item.pid'>
          <ProductCard
            :prod="item"
            />
        </div>
      </div>
    </div>
  </main>
</template>

<style>
@import "./assets/styles.css";
</style>

<script>
import ProductCard from "./components/ProductCard.vue";
export default {
  data(){
    return{
      products: []
    }
  },
  components: {
    ProductCard
  },
  mounted(){
    fetch('http://localhost:8081/product')
      .then(res => res.json())
      .then(data => this.products = data)
      .catch(err => console.log(err.message))
  }
};
</script>