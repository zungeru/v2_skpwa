import axios from 'axios'
import store from './store'

// Ok so I learned something, I don't have access to the the $store and
// getters in this file. I guess because this file is not connected to then
// the global vue instance. for me to use anything from the store, I neeeded
// to import it.

export const getInitialPosts = ({commit}) => {
  axios.get('http://localhost:5000/')
    .then(response => {
      const posts = response.data
      commit('SET_POSTS', posts)
    })
}

export const getMorePosts = ({commit}) => {
  const currentRound = store.getters.loadRound
  axios.get('http://localhost:5000/' + currentRound)
    .then(response => {
      const posts = response.data
      console.log(currentRound)
      commit('ADD_POSTS', posts)
      commit('ADD_ROUND')
    })
}
