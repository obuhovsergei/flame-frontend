import { baseActionTypes } from "@/store/shared/base/types";
import stateManipulationMixinTypes from "@/store/shared/stateManipulation/types";

export const namespace = "people-detail";
export const relativeNamespace = "people-detail";

export const getterTypes = {
	formattedItems: "formattedItems"
};

export const actionTypes = {
	...baseActionTypes,
	...stateManipulationMixinTypes.actionTypes,
	initializeFavorites: "initializeFavorites",
	checkFavorites: "checkFavorites",
	updateFavorites: "updateFavorites",
	deleteFavorite: "deleteFavorite"
};

export const mutationTypes = {
	...stateManipulationMixinTypes.mutationTypes,
	SET_IS_LOADING_STATE: "SET_IS_LOADING_STATE",
	SET_FAVORITE_LIST: "SET_FAVORITE_LIST",
	SET_PERSON_STATE: "SET_PERSON_STATE",
	SET_IS_SHOW_REMOVE_FAVORITE: "SET_IS_SHOW_REMOVE_FAVORITE",
	SET_IS_SHOW_ADD_FAVORITE: "SET_IS_SHOW_ADD_FAVORITE"
};