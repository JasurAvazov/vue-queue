import { ref, onMounted } from "vue";
import { db } from "../../firebase.js";
import { collection, addDoc, deleteDoc, getDocs, query, orderBy } from "firebase/firestore";

const state = {
  currentNumber: 1,
  items: []
};

const mutations = {
  incrementNumber(state) {
    state.currentNumber = (state.currentNumber % 99) + 1;
  },
  setItems(state, items) {
    state.items = items;
  }
};

const actions = {
  async fetchItems({ commit }) {
    const q = query(collection(db, "queue"), orderBy("created_at"));
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map((doc) => doc.data());
    commit("setItems", items);
  },
  async addItem({ commit, state }) {
    const newItem = {
      number: state.currentNumber,
      created_at: new Date().toISOString()
    };
    await addDoc(collection(db, "queue"), newItem);
    commit("incrementNumber");
  },
  async deleteItem({ commit }, itemId) {
    await deleteDoc(doc(db, "queue", itemId));
    commit("fetchItems");
  }
};

const getters = {
  getItems: (state) => state.items
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};