import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch((error) => error)
}
const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
		redirect: "/home/config",
		children: [
			{
				path: "/home/config",
				name: "config",
				component: () => import("../views/Config.vue"),
			},
		],
	},

	{
		path: "/login",
		name: "login",
		component: () => import("../views/Login.vue"),
	},
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
})

export default router
