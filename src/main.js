/* import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8787";
const app = createApp(App);
app.config.globalProperties.axios = axios;
createApp(App).use(router).mount("#app");
 */

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";
import store from "./store";

// Axios 기본 URL 설정
axios.defaults.baseURL = "http://localhost:8787";

// 애플리케이션 인스턴스 생성
const app = createApp(App);

// Axios를 전역 속성으로 설정
app.config.globalProperties.$axios = axios;

// Vue Router와 Axios를 애플리케이션에 추가
app.use(router);

app.use(store);

// 애플리케이션을 DOM에 마운트
app.mount("#app");
