import { db } from "../../firebase.js";
import {
	collection,
	addDoc,
	deleteDoc,
	getDocs,
	query,
	orderBy,
	doc,
	getDoc,
	setDoc,
} from "firebase/firestore";

const state = {
	checkNumber: 1,
	items: [],
	branchReports: {},
};

const mutations = {
	updateBranchReport(state, title) {
		if (!state.branchReports[title]) {
			state.branchReports[title] = [];
		}
		state.branchReports[title].push(state.checkNumber - 1);
	},
	setCheckNumber(state, number) {
		state.checkNumber = number;
		localStorage.setItem("checkNumber", state.checkNumber);
	},
	setItems(state, items) {
		state.items = items;
	},
	incrementCheckNumber(state) {
		state.checkNumber = (state.checkNumber % 99) + 1;
		localStorage.setItem("checkNumber", state.checkNumber);
	},
};

const actions = {
	async fetchItems({ commit }) {
		const q = query(collection(db, "check"), orderBy("created_at","desc"));
		const querySnapshot = await getDocs(q);
		const items = querySnapshot.docs.map((doc) => {
			return { id: doc.id, ...doc.data() };
		});
		commit("setItems", items);
	},

	async fetchCheckNumber({ commit }) {
		const docRef = doc(db, "settings", "checkNumber");
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			commit("setCheckNumber", docSnap.data().value);
		}
	},

	async updateCheckNumber({ state }) {
		const docRef = doc(db, "settings", "checkNumber");
		await setDoc(docRef, { value: state.checkNumber });
	},

	async addItem({ commit, state, dispatch }, branch) {
		if (state.addingItem) {
			return null;
		}
		state.addingItem = true;
	
		let newItemNumber = null;
	
		try {
			await dispatch("fetchCheckNumber");
			const newItem = {
				number: state.checkNumber,
				created_at: new Date().toISOString(),
				branch: branch,
			};
	
			const newNumber = (state.checkNumber % 99) + 1;
			const docRef = await addDoc(collection(db, "check"), newItem);
			newItemNumber = newNumber-1;

			if (newNumber === 1) {
				newItemNumber = 99;
			}
	
			await setDoc(doc(db, "settings", "checkNumber"), { value: newNumber });
	
			commit("setCheckNumber", newNumber);
			await dispatch("fetchItems");
			
		} finally {
			state.addingItem = false;
		}
	
		return newItemNumber;
	},

	async deleteItem({ dispatch }, itemId) {
		try {
			await deleteDoc(doc(db, "check", itemId));
			await dispatch("fetchItems");
		} catch (error) {
			console.error("Error deleting item:", error);
		}
	},
};

const getters = {
	getItems: (state) => state.items,
	getBranchReports: (state) => state.branchReports,
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
