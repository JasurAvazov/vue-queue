import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import Login from "../views/LoginView.vue";
// import { auth } from "../firebase";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/management",
		name: "management",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/ManagementView.vue"),
	},
	// {
	// 	path: "/login",
	// 	name: "login",
	// 	component: Login,
	// },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

// router.beforeEach(async (to, from, next) => {
// 	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
// 	const isAuthenticated = auth.currentUser;

// 	if (requiresAuth && !isAuthenticated) {
// 		next("/login");
// 	} else {
// 		next();
// 	}
// });

export default router;
