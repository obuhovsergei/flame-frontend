import RouterView from "@/components/common/RouterView.vue";
import Home from "@/views/home/Home.vue"
import Favorites from "@/views/favorites/Favorites.vue"
import Peoples from "@/views/peoples/Peoples.vue"
import PeopleDetail from "@/views/peopleDetail/PeopleDetail.vue"
import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/views/layouts/Layout.vue";
import { RouteNames } from "@/router/routes";

const routes = [
	{
		path: "/",
		component: Layout,
		name: RouteNames.ROOT,
		redirect: { name: RouteNames.HOME },
		children: [
			{
				path: "home",
				name: RouteNames.HOME,
				component: Home
			},
			{
				path: "peoples",
				name: RouteNames.PEOPLES,
				component: RouterView,
				redirect: { name: RouteNames.PEOPLES_LIST },
				children: [
					{
						path: "",
						name: RouteNames.PEOPLES_LIST,
						component: Peoples
					},
					{
						path: ":id",
						name: RouteNames.PEOPLES_DETAIL,
						component: PeopleDetail
					}
				]
			},
			{
				path: "favorites",
				name: RouteNames.FAVORITES,
				component: Favorites
			},
		]
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router;
