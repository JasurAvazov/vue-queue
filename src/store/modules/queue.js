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
  currentNumber: 1,
  items: [],
  branchReports: {},
};

const mutations = {
  updateBranchReport(state, title) {
    if (!state.branchReports[title]) {
      state.branchReports[title] = [];
    }
    state.branchReports[title].push(state.currentNumber - 1);
  },
  setCurrentNumber(state, number) {
    state.currentNumber = number;
    localStorage.setItem("currentNumber", state.currentNumber);
  },
  setItems(state, items) {
    state.items = items;
  },
};

const actions = {
  async fetchItems({ commit }) {
    const q = query(collection(db, "queue"), orderBy("created_at"));
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    commit("setItems", items);
  },

  async fetchCurrentNumber({ commit }) {
    const docRef = doc(db, "settings", "currentNumber");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      commit("setCurrentNumber", docSnap.data().value);
    }
  },

  async updateCurrentNumber({ state }) {
    const docRef = doc(db, "settings", "currentNumber");
    await setDoc(docRef, { value: state.currentNumber });
  },

  async addItem({ dispatch, state }, title) {
    await dispatch("fetchCurrentNumber");
    const newItem = {
      number: state.currentNumber,
      created_at: new Date().toISOString(),
      branch: title,
    };
    await addDoc(collection(db, "queue"), newItem);
    state.currentNumber++;
    await dispatch("updateCurrentNumber");
    await dispatch("fetchItems");
  },

  async deleteItem({ dispatch }, itemId) {
    try {
      await deleteDoc(doc(db, "queue", itemId));
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