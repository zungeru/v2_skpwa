const state = {
  token: null,
  auth_id: null,
  username: null,
  email: null,
  exp: null
}

const mutations = {
  'SET_TOKEN' (state, token) {
    state.token = token
  },
  'SET_USER_DATA' (state, userData) {
    state.auth_id = userData.auth_id
    state.username = userData.username
    state.email = userData.email
    state.exp = userData.exp
  }
}

// const actions = {
//
// };

const getters = {
  token (state) {
    return state.token
  }
}

export default {
  state,
  mutations,
  // actions,
  getters
}
