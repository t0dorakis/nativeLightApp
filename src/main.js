import Vue from 'nativescript-vue';

import router from './router';

import store from './store';

import axios from 'axios';

import './styles.scss';

// Uncomment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

new Vue({
    router,
    store,
    axios
}).$start();
