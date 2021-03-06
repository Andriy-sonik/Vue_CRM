import firebase from "firebase/app";
export default {
  state: {
    info: {}
  },
  mutations: {
    SET_INFO(state, info) {
      state.info = info;
    },
    CLEAR_INFO(state) {
      state.info = {};
    }
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const info = (
          await firebase
            .database()
            .ref(`/users/${uid}/info`)
            .once("value")
        ).val();
        commit("SET_INFO", info);
      } catch (e) {
        commit("SET_ERROR", e);
        throw e;
      }
    },
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUid");
        const updateDate = { ...getters.info, ...toUpdate };
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .update(updateDate);
        commit("SET_INFO", updateDate);
      } catch (e) {
        commit("SET_ERROR", e);
        throw e;
      }
    }
  },
  getters: {
    info: state => state.info
  }
};
