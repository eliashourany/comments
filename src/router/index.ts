import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Comments from "@/views/CommentsView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Comments,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
