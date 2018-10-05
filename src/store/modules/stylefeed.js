const state = {
  loadRound: 1,
  posts: []
}

const mutations = {
  'SET_POSTS' (state, posts) {
    state.posts = posts
  },
  'ADD_POSTS' (state, posts) {
    for (let x of posts) {
      state.posts.push(x)
    }
  },
  'ADD_ROUND' (state) {
    state.loadRound++
  }
}

// const actions = {
//
// };

const getters = {
  posts (state) {
    return state.posts
  },
  loadRound (state) {
    return state.loadRound
  }
}

export default {
  state,
  mutations,
  // actions,
  getters
}
