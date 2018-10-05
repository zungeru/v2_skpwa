import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import moment from 'moment'
import vuelidate from 'vuelidate'

import { routes } from './routes'
import store from './store/store'

Vue.config.productionTip = false

Vue.use(vuelidate)
Vue.use(VueRouter)

Vue.filter('fromDate', function (value) {
  return moment(value).fromNow()
})

const router = new VueRouter({
  //  routes: es6 shortcut where key-value is the same
  routes,
  mode: 'history'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
