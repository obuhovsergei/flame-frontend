export const mutationTypes = {
	SET_STATE: "SET_STATE"
};

export const actionTypes = {
	resetState: "resetState"
};

const stateManipulationMixinTypes = {
	actionTypes,
	mutationTypes
};

export default stateManipulationMixinTypes;
