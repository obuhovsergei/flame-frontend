import {PeopleController} from "@/api/people";
import PeoplesStateModel from "@/store/modules/people/models/peoplesStateModel";
import {actionTypes, mutationTypes, namespace, relativeNamespace} from "./types";
import BaseMixinBuilder from "@/store/shared/base";
import StateManipulationMixinBuilder from "@/store/shared/stateManipulation";
import {ActionTree, MutationTree} from "vuex";
import Search from "@/store/modules/people/models/search";

const localStorageName: string = "favorites";
const baseMixin = (new BaseMixinBuilder()).build();
const peopleController = new PeopleController();

class DefaultStateBuilder {
	constructor() {
	}

	build() {
		new PeoplesStateModel({
			isLoading: false,
			peoples: [],
			count: 0,
			next: null,
			previous: null
		});
	}
}

const stateManipulationMixin = (new StateManipulationMixinBuilder({
	defaultStateBuilder: new DefaultStateBuilder()
})).build();

const state = () => (new DefaultStateBuilder()).build();


const actions = <ActionTree<PeoplesStateModel, any>>{
	...baseMixin.actions,
	...stateManipulationMixin.actions,
	async [actionTypes.initialize]({ commit, dispatch }) {
		commit(mutationTypes.SET_IS_LOADING_STATE, true);
		try {
			await dispatch(actionTypes.initializeFavorites)

			const data = await peopleController.getPeoplesList();
			commit(mutationTypes.SET_LIST_STATE, data?.results);
			commit(mutationTypes.SET_SEARCH_STATE, new Search("", false, []));
		} catch (e) {
			console.error(e);
		} finally {
			commit(mutationTypes.SET_IS_LOADING_STATE, false);
		}
	},
	async [actionTypes.updateSearch]({commit}, name) {
		commit(mutationTypes.SET_IS_LOADING_SEARCH_STATE, true);
		try {
			if(name) {
				const data = await peopleController.getPeoplesListBySearch(name);
				commit(mutationTypes.SET_SEARCH_LIST_STATE, data?.results);
				commit(mutationTypes.SET_SEARCH_QUERY_STATE, name);
			}
		} catch (e) {
			console.error(e);
		} finally {
			commit(mutationTypes.SET_IS_LOADING_SEARCH_STATE, false);
		}
	},
	async [actionTypes.initializeFavorites]({commit}) {
		try {
			const existingFavorites: string | null = localStorage.getItem(localStorageName);
			if(existingFavorites === null) {
				localStorage.setItem(localStorageName, "");
				commit(mutationTypes.SET_FAVORITE_LIST, [])
			}
			else
				commit(mutationTypes.SET_FAVORITE_LIST, existingFavorites.split(',').filter(x => x))

		} catch (e) {
			console.error(e);
		}
	},
	async [actionTypes.updateFavorites]({ commit, dispatch}, favorite) {
		try {
			const existingFavorites: string | null = localStorage.getItem(localStorageName);
			if(existingFavorites === null) {
				localStorage.setItem(localStorageName, "");
				return
			}
			if(favorite && !existingFavorites.includes(favorite))
				localStorage.setItem(localStorageName, `${existingFavorites},${favorite}`)
			else
				localStorage.setItem(localStorageName, favorite);
			await dispatch(actionTypes.initializeFavorites)

		} catch (e) {
			console.error(e);
		}
	},
	async [actionTypes.deleteFavorite]({ commit, dispatch}, favorite) {
		try {
			const existingFavorites: string | null = localStorage.getItem(localStorageName);
			if(existingFavorites === null || !favorite) return

			if(favorite && existingFavorites.includes(favorite)) {
				const favArr = existingFavorites.split(',').filter(x => x !== favorite)
				localStorage.setItem(localStorageName, favArr.join(','))
			}

			await dispatch(actionTypes.initializeFavorites)

		} catch (e) {
			console.error(e);
		}
	}
};

const mutations = <MutationTree<PeoplesStateModel>>{
	...stateManipulationMixin.mutations,
	[mutationTypes.SET_IS_LOADING_STATE](state, value) {
		state.isLoading = value;
	},
	[mutationTypes.SET_LIST_STATE](state, values) {
		state.peoples = values;
	},
	[mutationTypes.SET_NEXT_URL_STATE](state, value) {
		state.next = value;
	},
	[mutationTypes.SET_PREVIOUS_URL_STATE](state, value) {
		state.previous = value;
	},
	[mutationTypes.SET_SEARCH_LIST_STATE](state, values) {
		state.search.items = values;
	},
	[mutationTypes.SET_SEARCH_QUERY_STATE](state, value) {
		state.search.query = value;
	},
	[mutationTypes.SET_IS_LOADING_SEARCH_STATE](state, value) {
		state.search.isLoading = value;
	},
	[mutationTypes.SET_SEARCH_STATE](state, value) {
		state.search = value;
	},
	[mutationTypes.SET_FAVORITE_LIST](state, values) {
		state.favorites = values;
	}
};

export {
	namespace, state, actions, mutations, relativeNamespace
};

const peopleModule = {
	namespace, state, actions, mutations, namespaced: true, relativeNamespace
};

export default peopleModule;
