import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import info from "./info";
import category from "./category";
import record from "./record";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    }
  },
  actions: {
    async fetchCurrency() {
      const res = await fetch(
        ` https://api.exchangerate-api.com/v4/latest/EUR`
      );
      return await res.json();
    }
  },
  getters: {
    error: state => state.error
  },
  modules: { auth, info, category, record }
});
