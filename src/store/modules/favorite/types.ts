import { baseActionTypes } from "@/store/shared/base/types";
import stateManipulationMixinTypes from "@/store/shared/stateManipulation/types";

export const namespace = "favorite-list";
export const relativeNamespace = "favorite-list";

export const actionTypes = {
	...baseActionTypes,
	...stateManipulationMixinTypes.actionTypes,
	initializeFavorites: "initializeFavorites",
	deleteFavorite: "deleteFavorite"
};

export const mutationTypes = {
	...stateManipulationMixinTypes.mutationTypes,
	SET_IS_LOADING_STATE: "SET_IS_LOADING_STATE",
	SET_FAVORITE_LIST: "SET_FAVORITE_LIST"
};
