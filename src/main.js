import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
const app = createApp(App);
app.config.globalProperties.axios = axios;
createApp(App).use(router).mount("#app");
