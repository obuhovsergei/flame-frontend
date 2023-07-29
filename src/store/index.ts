import { createStore } from "vuex";
import peopleModule from "./modules/people";
import personModule from "./modules/peopleDetails";
import favoriteModule from "./modules/favorite";

const store = createStore({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		[peopleModule.namespace]: {
			...peopleModule
		},
		[personModule.namespace]: {
			...personModule
		},
		[favoriteModule.namespace]: {
			...favoriteModule
		}
	}
});

export default store;
