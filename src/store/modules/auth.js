const state = {
  token: null,
  userData: null
}

const mutations = {
  'SET_TOKEN' (state, token) {
    state.token = token
  },
  'SET_USER_DATA' (state, userData) {
    state.userData = userData
  },
  'CLEAR_AUTH_DATA' (state) {
    state.token = null
    state.userData = null
  }
}

// const actions = {
//
// };

const getters = {
  token (state) {
    return state.token
  },
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
