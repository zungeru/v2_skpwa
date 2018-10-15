const state = {
  userRound: 1,
  userPosts: []
}

const mutations = {
  'SET_USER_POSTS' (state, posts) {
    state.userPosts = posts
  },
  'ADD_USER_POSTS' (state, posts) {
    for (let x of posts) {
      state.userPosts.push(x)
    }
  },
  'ADD_USER_ROUND' (state) {
    state.userRound++
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
  }
}

export default {
  state,
  mutations,
  // actions,
  getters
}
