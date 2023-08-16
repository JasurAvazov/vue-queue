import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ManagementView from "../views/ManagementView.vue";
import store from "../store";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/management",
		name: "management",
		component: ManagementView,
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const loggedIn = store.state.log.loggedIn; // Используйте правильное свойство loggedIn

  if (requiresAuth && !loggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;