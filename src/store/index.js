import { createStore } from "vuex";
import queue from "./modules/queue";

export default createStore({
  modules: {
    queue
  }
});