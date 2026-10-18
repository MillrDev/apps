import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import "./style.css";
import Home from "./components/pages/Home.vue";
import Pump from "./components/pages/Pump.vue";
import MySpace from "./components/pages/MySpace.vue";

const router = createRouter({
  history: createWebHashHistory("/apps/"),

  routes: [
    { path: "/", component: Home, meta: { title: "Apps" } },
    {
      path: "/pump-rock",
      component: Pump,
      meta: { title: "Pump Rock", icon: "assets/pump/pump-favicon.svg" },
    },
    {
      path: "/myspace",
      component: MySpace,
      meta: {
        title: "Vincent's MySpace",
        icon: "assets/myspace/myspace-favicon.png",
      },
    },
  ],
});

const icon = document.querySelector("link[rel='icon']");
const defaultIcon = {
  href: icon?.getAttribute("href"),
  type: icon?.getAttribute("type"),
};

router.afterEach((to) => {
  document.title = to.meta.title || "Apps";
  if (!icon) return;

  if (to.meta.icon) {
    icon.removeAttribute("type");
    icon.href = import.meta.env.BASE_URL + to.meta.icon;
  } else {
    icon.href = defaultIcon.href;
    if (defaultIcon.type) icon.type = defaultIcon.type;
  }
});

createApp(App).use(router).mount("#app");
