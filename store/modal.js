export const state = () =>({
	isActive: false,
});

export const mutations = {
	SHOW(state) {
		state.isActive = true
	},
	HIDE(state) {
		state.isActive = false
	},
};

export const actions = {
	show({ commit }) {
		commit('SHOW')
	},
	hide({ commit }) {
		commit('HIDE')
	},
};

export const getters = {
	isActive: state => state.isActive,
};
