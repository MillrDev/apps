import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import "./style.css";
import Home from "./components/pages/Home.vue";
import Pump from "./components/pages/Pump.vue";
import MySpace from "./components/pages/MySpace.vue";
import pumpIcon from "./assets/pump/pump-favicon.svg";
import myspaceIcon from "./assets/myspace/myspace-favicon.png";

const router = createRouter({
  history: createWebHashHistory("/apps/"),

  routes: [
    {
      path: "/",
      component: Home,
      meta: { title: "Apps", icon: "/favicon.svg" },
    },
    {
      path: "/pump-rock",
      component: Pump,
      meta: { title: "Pump Rock", icon: pumpIcon },
    },
    {
      path: "/myspace",
      component: MySpace,
      meta: {
        title: "Vincent's MySpace",
        icon: myspaceIcon,
      },
    },
  ],
});

function setIcon(href) {
  document.querySelectorAll("link[rel*='icon']").forEach((l) => l.remove());

  if (href) {
    const link = document.createElement("link");
    link.rel = "icon";
    if (href.endsWith(".svg")) {
      link.type = "image/svg+xml";
    } else if (href.endsWith(".png")) {
      link.type = "image/png";
    }
    link.href = href;
    document.head.appendChild(link);
  }
}

router.afterEach((to) => {
  document.title = to.meta.title || "Apps";
  setIcon(to.meta.icon);
});

createApp(App).use(router).mount("#app");
