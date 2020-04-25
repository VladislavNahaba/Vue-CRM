import firebase from "firebase/app";

export default {
  actions: {
    async login({commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async logout() {
      await firebase.auth().signOut();
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUId');
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 0,
          name
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    getUId() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    }
  }
}
