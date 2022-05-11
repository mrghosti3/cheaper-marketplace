<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">CHEAPER</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation">
      <i class="fa fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <div class="container">
          <div class="d-flex justify-content-center">
            <form class="searchbar" @submit.prevent="onSubmit">
              <input
                v-model="search"
                class="search_input"
                type="text"
                placeholder="Enter product name..."
                maxlength="50" />
              <a @click.prevent="onSubmit" class="search_icon" type="submit">
                <i class="fa fa-search"></i>
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    }
  },
  methods: {
    onSubmit() {
      if (this.search !== "") {
        console.log(this.search);
        this.$router.push({ name: "search", query: { q: this.search } });
      }
    },
  },
};
</script>
