import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.js";

const state = {
	items: [],
};

const mutations = {
	setItems(state, items) {
		state.items = items;
	},
	removeItem(state, itemId) {
		state.items = state.items.filter((item) => item.id !== itemId);
	},
};

const actions = {
	async fetchItems({ commit }) {
		const queueC = await getDocs(collection(db, "queue"));
		const items = queueC.docs.map((el) => ({ ...el.data(), id: el.id }));
		commit("setItems", items);
	},
	async deleteItem({ commit }, itemId) {
		try {
			await deleteDoc(doc(db, "queue", itemId));
			commit("removeItem", itemId);
		} catch (error) {
			console.error("Error deleting item:", error);
		}
	},
};

const getters = {
	getItems: (state) => state.items,
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
