import {PeopleController} from "@/api/people";
import PersonStateModel from "@/store/modules/peopleDetails/models/personStateModel";
import {getterTypes, actionTypes, mutationTypes, namespace, relativeNamespace} from "@/store/modules/peopleDetails/types";
import BaseMixinBuilder from "@/store/shared/base";
import StateManipulationMixinBuilder from "@/store/shared/stateManipulation";
import {ActionTree, GetterTree, MutationTree} from "vuex";
import People from "@/store/modules/people/models/people";
import {convertIsoToNumber, dateTimeFormat, formatDate} from "@/utils/dates";

const localStorageName: string = "favorites";
const baseMixin = (new BaseMixinBuilder()).build();
const peopleController = new PeopleController();

class DefaultStateBuilder {
	constructor() {
	}

	build() {
		new PersonStateModel({
			isLoading: false,
			person: new People(),
			isShowAddFavorite: false,
			isShowRemoveFavorite: false
		});
	}
}

const stateManipulationMixin = (new StateManipulationMixinBuilder({
	defaultStateBuilder: new DefaultStateBuilder()
})).build();

const state = () => (new DefaultStateBuilder()).build();

const getters = <GetterTree<PersonStateModel, any>>{
	[getterTypes.formattedItems]: state => {
		return state.person && Object.entries(state.person).map(x => {
			if(x[0] === 'created' || x[0] === 'edited')
				x[1] = formatDate(convertIsoToNumber(x[1]), dateTimeFormat)
			return {
				key: x[0],
				value: x[1]
			}
		});
	}
};

const actions = <ActionTree<PersonStateModel, any>>{
	...baseMixin.actions,
	...stateManipulationMixin.actions,
	async [actionTypes.initialize]({ commit, dispatch }, { id }) {
		commit(mutationTypes.SET_IS_LOADING_STATE, true);
		try {
			await dispatch(actionTypes.initializeFavorites)

			const data = await peopleController.getPerson(id);
			commit(mutationTypes.SET_PERSON_STATE, data);

			await dispatch(actionTypes.checkFavorites)
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
	async [actionTypes.checkFavorites]({commit, state}) {
		try {
			const isFindFav: boolean = state.favorites.includes(state.person.name)
			commit(mutationTypes.SET_IS_SHOW_ADD_FAVORITE, !isFindFav);
			commit(mutationTypes.SET_IS_SHOW_REMOVE_FAVORITE, isFindFav)
		} catch (e) {
			console.error(e);
		}
	},
	async [actionTypes.updateFavorites]({ dispatch, state}) {
		try {
			if(state.person.name && !state.favorites.includes(state.person.name))
				localStorage.setItem(localStorageName, [...state.favorites, state.person.name].join(','))
			else
				localStorage.setItem(localStorageName, state.person.name);
			await dispatch(actionTypes.initializeFavorites)
			await dispatch(actionTypes.checkFavorites)
		} catch (e) {
			console.error(e);
		}
	},
	async [actionTypes.deleteFavorite]({ state, dispatch}) {
		try {
			const favArrFiltered = state.favorites.filter(x => x !== state.person.name)
			localStorage.setItem(localStorageName, favArrFiltered.join(','))

			await dispatch(actionTypes.initializeFavorites)
			await dispatch(actionTypes.checkFavorites)
		} catch (e) {
			console.error(e);
		}
	}
};

const mutations = <MutationTree<PersonStateModel>>{
	...stateManipulationMixin.mutations,
	[mutationTypes.SET_IS_LOADING_STATE](state, value) {
		state.isLoading = value;
	},
	[mutationTypes.SET_FAVORITE_LIST](state, values) {
		state.favorites = values;
	},
	[mutationTypes.SET_PERSON_STATE](state, value) {
		state.person = value;
	},
	[mutationTypes.SET_IS_SHOW_ADD_FAVORITE](state, value) {
		state.isShowAddFavorite = value;
	},
	[mutationTypes.SET_IS_SHOW_REMOVE_FAVORITE](state, value) {
		state.isShowRemoveFavorite = value;
	}
};

export {
	namespace, state, getters, actions, mutations, relativeNamespace
};

const personModule = {
	namespace, state, getters, actions, mutations, namespaced: true, relativeNamespace
};

export default personModule;
