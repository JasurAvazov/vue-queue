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
  presidentNumber: 1,
  items: [],
  branchReports: {},
  addingItem: false,
};

const mutations = {
  updateBranchReport(state, title) {
    if (!state.branchReports[title]) {
      state.branchReports[title] = [];
    }
    state.branchReports[title].push(state.presidentNumber - 1);
  },
  setPresidentNumber(state, number) {
    state.presidentNumber = number;
    localStorage.setItem("presidentNumber", state.presidentNumber);
  },
  setItems(state, items) {
    state.items = items;
  },
  incrementPresidentNumber(state) {
    state.presidentNumber = (state.presidentNumber % 99) + 1;
    localStorage.setItem("presidentNumber", state.presidentNumber);
  },
};

const actions = {
  async fetchItems({ commit }) {
    const q = query(collection(db, "president"), orderBy("created_at","desc"));
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    commit("setItems", items);
  },

  async fetchPresidentNumber({ commit }) {
    const docRef = doc(db, "settings", "presidentNumber");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      commit("setPresidentNumber", docSnap.data().value);
    }
  },

  async updatePresidentNumber({ state }) {
    const docRef = doc(db, "settings", "presidentNumber");
    await setDoc(docRef, { value: state.presidentNumber });
  },

  async addItem({ commit, state, dispatch }, branch) {
		if (state.addingItem) {
			return null;
		}
		state.addingItem = true;
	
		let newItemNumber = null;
	
		try {
			await dispatch("fetchPresidentNumber");
			const newItem = {
				number: state.presidentNumber,
				created_at: new Date().toISOString(),
				branch: branch,
			};
	
			const newNumber = (state.presidentNumber % 99) + 1;
			const docRef = await addDoc(collection(db, "president"), newItem);
			newItemNumber = newNumber-1;

			if (newNumber === 1) {
				newItemNumber = 99;
			}
	
			await setDoc(doc(db, "settings", "presidentNumber"), { value: newNumber });
	
			commit("setPresidentNumber", newNumber);
			await dispatch("fetchItems");
			
		} finally {
			state.addingItem = false;
		}
	
		return newItemNumber;
	},

  async deleteItem({ dispatch }, itemId) {
    try {
      await deleteDoc(doc(db, "president", itemId));
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