const state = {
	loggedIn: false,
};

const mutations = {
	setLoggedIn(state, value) {
		state.loggedIn = value;
	},
};

const actions = {
	login({ commit }) {
		commit("setLoggedIn", true);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};