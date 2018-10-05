import Vue from 'vue'
import Vuex from 'vuex'

import stylefeed from './modules/stylefeed'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    stylefeed
  }
})
