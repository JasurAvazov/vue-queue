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
	passportNumber: 1,
	items: [],
	branchReports: {},
};

const mutations = {
	updateBranchReport(state, title) {
		if (!state.branchReports[title]) {
			state.branchReports[title] = [];
		}
		state.branchReports[title].push(state.passportNumber - 1);
	},
	setPassportNumber(state, number) {
		state.passportNumber = number;
		localStorage.setItem("passportNumber", state.passportNumber);
	},
	setItems(state, items) {
		state.items = items;
	},
	incrementPassportNumber(state) {
		state.passportNumber = (state.passportNumber % 99) + 1;
		localStorage.setItem("passportNumber", state.passportNumber);
	},
};

const actions = {
	async fetchItems({ commit }) {
		const q = query(collection(db, "passport"), orderBy("created_at","desc"));
		const querySnapshot = await getDocs(q);
		const items = querySnapshot.docs.map((doc) => {
			return { id: doc.id, ...doc.data() };
		});
		commit("setItems", items);
	},

	async fetchPassportNumber({ commit }) {
		const docRef = doc(db, "settings", "passportNumber");
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			commit("setPassportNumber", docSnap.data().value);
		}
	},

	async updatePassportNumber({ state }) {
		const docRef = doc(db, "settings", "passportNumber");
		await setDoc(docRef, { value: state.passportNumber });
	},

	async addItem({ commit, state, dispatch }, branch) {
		if (state.addingItem) {
			return null;
		}
		state.addingItem = true;
	
		let newItemNumber = null;
	
		try {
			await dispatch("fetchPassportNumber");
			const newItem = {
				number: state.passportNumber,
				created_at: new Date().toISOString(),
				branch: branch,
			};
	
			const newNumber = (state.passportNumber % 99) + 1;
			const docRef = await addDoc(collection(db, "passport"), newItem);
			newItemNumber = newNumber-1;

			if (newNumber === 1) {
				newItemNumber = 99;
			}
	
			await setDoc(doc(db, "settings", "passportNumber"), { value: newNumber });
	
			commit("setPassportNumber", newNumber);
			await dispatch("fetchItems");
			
		} finally {
			state.addingItem = false;
		}
	
		return newItemNumber;
	},

	async deleteItem({ dispatch }, itemId) {
		try {
			await deleteDoc(doc(db, "passport", itemId));
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
