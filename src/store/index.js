import { createStore } from "vuex";
import passport from "./modules/passport";
import president from "./modules/president";
import check from "./modules/check";

export default createStore({
  modules: {
    passport,
    president,
    check,
  }
});