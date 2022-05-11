<template>
  <main>
    <Search :query="query"/>
  </main>
</template>

<script>
import Search from "../components/Search.vue";
export default {
  props: ['query'],
  components: {
    Search
  }
}
</script>
