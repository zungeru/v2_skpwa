const state = {
  userData: null
}

const mutations = {
  'SET_USER_DATA' (state, userData) {
    state.userData = userData
  },
  'CLEAR_AUTH_DATA' (state) {
    state.userData = null
  }
}

// const actions = {
//
// };

const getters = {
  userData (state) {
    return state.userData
  },
  isAuthenticated (state) {
    return state.userData !== null
  }
}

export default {
  state,
  mutations,
  // actions,
  getters
}
