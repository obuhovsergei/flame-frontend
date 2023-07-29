import {PeopleController} from "@/api/people";
import FavoriteStateModel from "@/store/modules/favorite/models/favoriteStateModel";
import {actionTypes, mutationTypes, namespace, relativeNamespace} from "./types";
import BaseMixinBuilder from "@/store/shared/base";
import StateManipulationMixinBuilder from "@/store/shared/stateManipulation";
import {ActionTree, MutationTree} from "vuex";
import People from "@/store/modules/people/models/people";

const localStorageName: string = "favorites";
const baseMixin = (new BaseMixinBuilder()).build();
const peopleController = new PeopleController();

class DefaultStateBuilder {
	constructor() {
	}

	build() {
		new FavoriteStateModel({
			isLoading: false,
			favorites: []
		});
	}
}

const stateManipulationMixin = (new StateManipulationMixinBuilder({
	defaultStateBuilder: new DefaultStateBuilder()
})).build();

const state = () => (new DefaultStateBuilder()).build();


const actions = <ActionTree<FavoriteStateModel, any>>{
	...baseMixin.actions,
	...stateManipulationMixin.actions,
	async [actionTypes.initialize]({ commit, dispatch, state }) {
		commit(mutationTypes.SET_IS_LOADING_STATE, true);
		try {
			await dispatch(actionTypes.initializeFavorites)

			const data = await peopleController.getPeoplesList();
			//@ts-ignore
			const results: Array<People> = await data?.results;
			//@ts-ignore
			commit(mutationTypes.SET_FAVORITE_LIST, results.filter(x => x.name && state.favorites.includes(x.name)));
		} catch (e) {
			console.error(e);
		} finally {
			commit(mutationTypes.SET_IS_LOADING_STATE, false);
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
	async [actionTypes.deleteFavorite]({ commit, dispatch}, favorite) {
		try {
			const existingFavorites: string | null = localStorage.getItem(localStorageName);
			if(existingFavorites === null || !favorite) return

			if(favorite && existingFavorites.includes(favorite)) {
				const favArr = existingFavorites.split(',').filter(x => x !== favorite)
				localStorage.setItem(localStorageName, favArr.join(','))
			}

			await dispatch(actionTypes.initialize)

		} catch (e) {
			console.error(e);
		}
	}
};

const mutations = <MutationTree<FavoriteStateModel>>{
	...stateManipulationMixin.mutations,
	[mutationTypes.SET_IS_LOADING_STATE](state, value) {
		state.isLoading = value;
	},
	[mutationTypes.SET_FAVORITE_LIST](state, values) {
		state.favorites = values;
	}
};

export {
	namespace, state, actions, mutations, relativeNamespace
};

const favoriteModule = {
	namespace, state, actions, mutations, namespaced: true, relativeNamespace
};

export default favoriteModule;
