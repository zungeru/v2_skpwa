const state = {
  userRound: 1,
  userPosts: [],
  showPosts: true
}

const mutations = {
  'SET_USER_POSTS' (state, posts) {
    state.userPosts = posts
    if(state.userPosts.length === 0){
      state.showPosts = false
    } else {
      state.showPosts = true
    }
  },
  'ADD_USER_POSTS' (state, posts) {
    for (let x of posts) {
      state.userPosts.push(x)
    }
  },
  'ADD_USER_ROUND' (state) {
    state.userRound++
  },
  'CLEAR_PROFILE_DATA' (state) {
    state.userRound = 1
    state.userPosts = []
  },
  'HIDE_POSTS' (state) {
    state.showPosts = false
  }
}

// const actions = {
//
// };

const getters = {
  userPosts (state) {
    return state.userPosts
  },
  userRound (state) {
    return state.userRound
  },
  showPosts (state) {
    return state.showPosts
  }
}

export default {
  state,
  mutations,
  // actions,
  getters
}
