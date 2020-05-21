/* eslint-disable */
import 'buefy/dist/buefy.css'
import './css/personalized.css'
import Buefy from 'buefy'
import Vue from 'vue'
import VueSwal from 'vue-swal'  
import App from './App.vue'
import router from './router'  
import { CardPlugin } from 'bootstrap-vue'
import {store} from './store/store'

import { library } from '@fortawesome/fontawesome-svg-core'
import {faCookieBite, faSeedling, faDrumstickBite, faGlassCheers, faIceCream, faBreadSlice} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(
  faCookieBite,
  faSeedling,
  faDrumstickBite,
  faGlassCheers,
  faIceCream,
  faBreadSlice,
  
)

Vue.component('font-awesome-icon', FontAwesomeIcon)



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
