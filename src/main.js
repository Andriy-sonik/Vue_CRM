import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Loader from "./components/app/Loader";
import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currency.filter";
import messagePlugin from "./utils/message.plugin";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.component("Loader", Loader);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);

firebase.initializeApp({
  apiKey: "AIzaSyDAwyXd1Esyu2G1tWsfg1wWb0FyzvVN7Vo",
  authDomain: "vue-minin-test.firebaseapp.com",
  databaseURL: "https://vue-minin-test.firebaseio.com",
  projectId: "vue-minin-test",
  storageBucket: "vue-minin-test.appspot.com",
  messagingSenderId: "93815107597",
  appId: "1:93815107597:web:073a54b4a8de9041712544"
});

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
