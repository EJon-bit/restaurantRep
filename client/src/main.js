
import 'buefy/dist/buefy.css';

import Buefy from 'buefy'
import Vue from 'vue'
import Vuetify from 'vuetify';
import VueSwal from 'vue-swal';  
import App from './App.vue'
import router from './router'  
import { CardPlugin } from 'bootstrap-vue'
import Vuelidate from "vuelidate";



Vue.use(CardPlugin)    
// PS:REMEMBER TO npm install all of these
Vue.use(Buefy)
//Vue.use(BootstrapVue) 
Vue.use(Vuetify)
Vue.use(VueSwal)

Vue.use(Vuelidate);




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
