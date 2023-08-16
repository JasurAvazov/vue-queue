const state = {
	loggedIn: false, // Добавляем loggedIn в состояние
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