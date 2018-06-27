import Vue from 'vue';
import vuex from 'vuex';
import user from './modules/user.js';
import detail from './modules/detail.js';
import clientData from './modules/common';
import getters from './getter';
Vue.use(vuex);

export default new vuex.Store({
 modules: {
   user,
   detail,
   clientData
 },
  getters
});
