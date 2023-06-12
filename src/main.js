import Vue from "vue";
import App from "./App";
import Vuex from 'vuex';
import Cookies from "js-cookie"; 

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userData: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.userData = userData;
    }
  },
  actions: {
    setUserData({ commit }, userData) {
      commit('SET_USER_DATA', userData);
    }
  }
});

// router setup
import router from "./routes/routes"; // <-- Aquí cambiamos la importación

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

Vue.prototype.$Chartist = Chartist;

Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
  store,
  el: "#app",
  render: (h) => h(App),
  router, // <-- Aquí ya no se necesita crear una nueva instancia de VueRouter
  data: {
    Chartist: Chartist,
  },
});

window.addEventListener('beforeunload', function() {
  Cookies.remove('userLogged');
});