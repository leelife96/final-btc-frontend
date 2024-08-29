import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/user",
    name: "ListView",

    component: () =>
      import(/* webpackChunkName: "user" */ "../views/ListView.vue"),
  },
  {
    path: "/user/findById",
    name: "SelectView",

    component: () =>
      import(/* webpackChunkName: "user" */ "../views/SelectView"),
  },
  {
    path: "/user/editById",
    name: "UpdateView",

    component: () =>
      import(/* webpackChunkName: "user" */ "../views/UpdateView"),
  },
  {
    path: "/user/save",
    name: "CreateView",

    component: () =>
      import(/* webpackChunkName: "user" */ "../views/CreateView"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/SignupView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
