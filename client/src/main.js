// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//imports files required to run App.vue file

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-vue/dist/bootstrap-vue.css'; 
import 'buefy/dist/buefy.css';

import BootstrapVue from 'bootstrap-vue';
import Buefy from 'buefy'
import Vue from 'vue'
import Vuetify from 'vuetify';
import VueSwal from 'vue-swal';  
import App from './App.vue'
import router from './router'  
    
// PS:REMEMBER TO npm install all of these
Vue.use(Buefy)
Vue.use(BootstrapVue) 
Vue.use(Vuetify)
Vue.use(VueSwal)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
