import Vue from 'vue'
import App from './App'
import moment from 'moment'
import vuelidate from 'vuelidate'

import './assets/css/sk.css'

import store from './store/store'
import router from './router/router'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(vuelidate)

Vue.filter('fromDate', function (value) {
  return moment(value).fromNow()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
