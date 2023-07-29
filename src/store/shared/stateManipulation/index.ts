import { actionTypes, mutationTypes } from "@/store/shared/stateManipulation/types";
import { MutationTree, ActionTree } from "vuex";

export default class StateManipulationMixinBuilder {
	defaultStateBuilder: any;

	constructor({ defaultStateBuilder }: { defaultStateBuilder: any }) {
		this.defaultStateBuilder = defaultStateBuilder;
	}

	build() {
		const defaultStateBuilder = this.defaultStateBuilder;

		return {
			mutations: <MutationTree<any>>{
				[mutationTypes.SET_STATE](state, value) {
					Object.assign(state, value);
				}
			},
			actions: <ActionTree<any, any>>{
				[actionTypes.resetState]({ commit }) {
					commit(mutationTypes.SET_STATE, defaultStateBuilder.build());
				}
			}
		};
	}
}
