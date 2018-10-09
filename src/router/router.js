import Vue from 'vue'
import VueRouter from 'vue-router'

import { routes } from './routes'

Vue.use(VueRouter)

export default new VueRouter({
  //  routes: es6 shortcut where key-value is the same
  routes,
  mode: 'history'
})
