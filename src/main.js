import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Home from "./../pages/Home.vue";
import Pump from "./../pages/Pump.vue";

const router = createRouter({
  history: createWebHashHistory("/apps/"),

  routes: [
    { path: "/", component: Home, meta: { title: "Apps" } },
    { path: "/pump-rock", component: Pump, meta: { title: "Pump Rock" } },
  ],
});

router.afterEach((to) => {
  document.title = to.meta.title || "Apps";
});

createApp(App).use(router).mount("#app");
