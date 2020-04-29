/* eslint-disable */
import './css/buefyEdited.css';

import Buefy from 'buefy'
import Vue from 'vue'
import VueSwal from 'vue-swal';  
import App from './App.vue'
import router from './router'  
import { CardPlugin } from 'bootstrap-vue'
import {store} from './store/store'


Vue.use(CardPlugin)
Vue.use(Buefy)
Vue.use(VueSwal)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({

  store:store,//uses store plugin as a data store

  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
