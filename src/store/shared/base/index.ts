import { baseActionTypes } from "./types";
import stateManipulationMixinTypes from "../stateManipulation/types";
import IPageState from "@/store/shared/base/types/pageState";
import {ActionTree} from "vuex";

export default class BaseMixinBuilder {
	constructor() {
	}

	build() {
		return {
			actions: <ActionTree<IPageState, any>>{
				[baseActionTypes.initialize]() {
				},
				[baseActionTypes.destroy]({ dispatch }) {
					dispatch(stateManipulationMixinTypes.actionTypes.resetState);
				}
			}
		};
	}
}
