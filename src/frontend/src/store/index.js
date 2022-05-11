import { createStore } from "vuex";

export default createStore({
  state: {
    search: "",
  },
  getters: {
    getSearch(state) {
      return state.search;
    },
  },
  mutations: {
    setSearch(state, s) {
      state.search = s;
    },
  },
});
