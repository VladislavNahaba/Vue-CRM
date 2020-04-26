import firebase from "firebase/app";

export default {
  state: {
    currency: []
  },
  mutations: {
    setCurrency(state, currency) {
      state.currency = currency;
    }
  },
  actions: {
    async fetchCurrency() {
      try {
        const currency = (await firebase.database().ref(`/currency`).orderByKey().once('value')).val();
        const timeStampDiff = Number(process.env.VUE_APP_MAX_TIMESTAMP_FIXER) * 1000;
        if (currency && ((Date.now() - getObjectLastKey(currency).timestamp * 1000) < timeStampDiff)) {
          return getObjectLastKey(currency);
        } else {
          const key = process.env.VUE_APP_FIXER;
          const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB,MDL`);
          const parsedRes = await res.json();
          firebase.database().ref('/currency').push().set(parsedRes);
          return parsedRes;
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    currency: s => s.currency
  }
}

function getObjectLastKey(object) {
  return object[Object.keys(object)[Object.keys(object).length - 1]];
}
