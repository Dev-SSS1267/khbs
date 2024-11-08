import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 라우터 추가
import "./assets/tailwind.css";
import 'bootstrap-icons/font/bootstrap-icons.css'


createApp(App).use(router).mount("#app");
