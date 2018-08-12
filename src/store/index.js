import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import hueApi from './modules/hueApi';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    hueApi,
  },
  strict: debug,
});

Vue.prototype.$store = store;

module.exports = store;