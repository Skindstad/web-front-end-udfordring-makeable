import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/easy",
    name: "easyView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/easy.vue"),
  },
  {
    path: "/medium",
    name: "mediumView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/medium.vue"),
  },
  {
    path: "/hard",
    name: "hardView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/hard.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
