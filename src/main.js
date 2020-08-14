import Vue from 'vue'
import App from './App'
import store from './store/store'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
