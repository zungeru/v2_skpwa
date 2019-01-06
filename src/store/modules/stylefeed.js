const state = {
  loadRound: 1,
  posts: [],
  showFeed: true
}

const mutations = {
  'SET_POSTS' (state, posts) {
    state.posts = posts
    if(state.posts.length === 0){
      state.showFeed = false
    } else {
      state.showFeed = true
    }
  },
  'ADD_POSTS' (state, posts) {
    for (let x of posts) {
      state.posts.push(x)
    }
  },
  'ADD_ROUND' (state) {
    state.loadRound++
  },
  'CLEAR_FEED_DATA' (state) {
    state.loadRound = 1
    state.posts = []
  },
  'HIDE_FEED' (state) {
    state.showFeed = false
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
  },
  showFeed (state) {
    return state.showFeed
  }
}

export default {
  state,
  mutations,
  // actions,
  getters
}
