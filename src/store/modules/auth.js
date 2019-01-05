const state = {
  userData: null,
  // This variable is for the splash screen
  // For some of the components (e.g. Search, Comment)
  // I have an additional toolbar, and that is still
  // Showing up with the splash screen, so I need to
  // Add this to the global store so I can access
  // It from other components and not just App.vue
  loading: true
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
  }
}

export default {
  state,
  mutations,
  // actions,
  getters
}
