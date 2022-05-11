<template>
  <div id="app">
    <NavBar />
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<style>
@import "./assets/styles.css";
</style>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    NavBar
  }
};
</script>
