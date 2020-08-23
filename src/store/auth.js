import firebase from "firebase/app";
export default {
  state: {},
  mutations: {},
  actions: {
    async login({ commit }, payload) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
      } catch (e) {
        commit("SET_ERROR", e);
        throw e;
      }
    },
    async register({ dispatch, commit }, payload) {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            bill: 100,
            name: payload.name
          });
      } catch (e) {
        console.log(e);
        commit("SET_ERROR", e);
        throw e;
      }
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout() {
      await firebase.auth().signOut();
    }
  }
};
