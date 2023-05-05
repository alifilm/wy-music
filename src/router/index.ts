import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/home/home.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/login.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/search/search.vue"),
    },
    {
      path: "/songSheet/:id",
      name: "songSheet",
      component: () => import("../views/songSheet/songSheet.vue"),
    },
    {
      path: "/list/:id",
      name: "list",
      component: () => import("../views/list/list.vue"),
    },
    // iconmenu
    {
      path: "/dayRecommend",
      name: "dayRecommend",
      component: () => import("../views/iconMenu/dayRecommend.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/weibo",
      name: "weibo",
      component: () => import("../views/weibo/weibo.vue"),
    },
  ],
});

export default router;
