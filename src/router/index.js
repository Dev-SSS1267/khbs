import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Schedule from "@/views/Schedule.vue";
import Notices from "@/views/Notices.vue";
import Issue from "@/views/Issue.vue";
import Admin from "@/views/Admin.vue";
import Login from "@/views/Login.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/schedule", name: "Schedule", component: Schedule },
  { path: "/notices", name: "Notices", component: Notices },
  { path: "/issue", name: "Issue", component: Issue },
  { path: "/admin", name: "Admin", component: Admin },
  { path: "/login", name: "Login", component: Login },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  // 관리자 페이지 접근 제한
  if (to.name === "Admin" && !isAuthenticated) {
    next({ name: "Login" });
  } else if (to.name === "Login" && isAuthenticated) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
