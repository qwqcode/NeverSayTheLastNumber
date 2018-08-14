// Common CSS
import './css/vue-animate.css'
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css'
import './css/app.scss'

// Common JS
import lodash from 'lodash'
window._ = lodash

import jquery from 'jquery'
window.$ = jquery

import Vue from 'vue'
import router from './router'
import filter from './filter'
import store from './store'

// Components
import App from './App.vue'

// Vue Init
window.app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
