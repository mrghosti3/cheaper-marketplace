import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VueChartkick);

app.mount("#app");
