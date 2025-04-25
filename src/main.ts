import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import Page from "./pages/Page.vue";
import "./style.css";

const routes = [
  { path: "/", component: Home },
  { path: "/page/:id", component: Page },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
