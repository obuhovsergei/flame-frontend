import { baseActionTypes } from "@/store/shared/base/types";
import stateManipulationMixinTypes from "@/store/shared/stateManipulation/types";

export const namespace = "people-list";
export const relativeNamespace = "people-list";

export const actionTypes = {
	...baseActionTypes,
	...stateManipulationMixinTypes.actionTypes,
	updateSearch: "updateSearch",
	initializeFavorites: "initializeFavorites",
	updateFavorites: "updateFavorites",
	deleteFavorite: "deleteFavorite"
};

export const mutationTypes = {
	...stateManipulationMixinTypes.mutationTypes,
	SET_IS_LOADING_STATE: "SET_IS_LOADING_STATE",
	SET_NEXT_URL_STATE: "SET_NEXT_URL_STATE",
	SET_PREVIOUS_URL_STATE: "SET_PREVIOUS_URL_STATE",
	SET_LIST_STATE: "SET_LIST_STATE",
	SET_SEARCH_STATE: "SET_SEARCH_STATE",
	SET_SEARCH_LIST_STATE: "SET_SEARCH_LIST_STATE",
	SET_SEARCH_QUERY_STATE: "SET_SEARCH_QUERY_STATE",
	SET_IS_LOADING_SEARCH_STATE: "SET_IS_LOADING_SEARCH_STATE",
	SET_FAVORITE_LIST: "SET_FAVORITE_LIST"
};
