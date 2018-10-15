import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import stylefeed from './modules/stylefeed'
import userprofile from './modules/userprofile'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    auth,
    stylefeed,
    userprofile
  }
})
