import { createStore } from "vuex";
import passport from "./modules/passport";
import president from "./modules/president";
import check from "./modules/check";
import log from "./modules/log";

export default createStore({
  modules: {
    passport,
    president,
    check,
    log,
  }
});