const state = {
  userData: null,
  // This variable is for the splash screen
  // For some of the components (e.g. Search, Comment)
  // I have an additional toolbar, and that is still
  // Showing up with the splash screen, so I need to
  // Add this to the global store so I can access
  // It from other components and not just App.vue
  loading: true,
  // This variable is for the Login component
  // If a user logs in with bad credentials,
  // The error message shows up
  logInIss: false
}

const mutations = {
  'SET_USER_DATA' (state, userData) {
    state.userData = userData
  },
  'CLEAR_AUTH_DATA' (state) {
    state.userData = null
  },
  'DONE_LOADING' (state) {
    state.loading = false
  },
  'LOGIN_ISSUE' (state) {
    state.logInIss = true
  },
  'NO_LOGIN_ISSUE' (state) {
    state.logInIss = false
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
  },
  loading (state) {
    return state.loading
  },
  logInIss (state) {
    return state.logInIss
  }
}

export default {
  state,
  mutations,
  // actions,
  getters
}
