export const state = () =>({
	isActive: false
});

export const mutations = {
	SHOW_LOADING(state) {
		state.isActive = true;
	},
	
	HIDE_LOADING(state) {
		state.isActive = false;
	}
};

export const actions = {

};

