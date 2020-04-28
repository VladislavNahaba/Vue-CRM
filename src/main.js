import Vue from "vue";
import Vuelidate from "vuelidate/src";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Paginate from "vuejs-paginate";
import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currency.filter";
import localizeFilter from "./filters/localize.filter";
import tooltipDirective from "./directives/tooltip.directive";
import messagePlugin from "./utils/message.plugin"
import Loader from "./components/app/Loader";
import "./registerServiceWorker";
import 'materialize-css/dist/js/materialize.min';

import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('paginate', Paginate);
Vue.component('Loader', Loader);

const firebaseConfig = {
  apiKey: "AIzaSyBMH6wAAtcTAsQRQCIwkI2cxQ9Xq1qsCu4",
  authDomain: "vue-crm-454d9.firebaseapp.com",
  databaseURL: "https://vue-crm-454d9.firebaseio.com",
  projectId: "vue-crm-454d9",
  storageBucket: "vue-crm-454d9.appspot.com",
  messagingSenderId: "1021188233901",
  appId: "1:1021188233901:web:8eeab0cefe82541c224424"
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
