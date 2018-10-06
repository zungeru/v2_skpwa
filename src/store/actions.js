import axios from 'axios'
import store from './store'

const CLIENT_ID = 'styleKast_client_server'
const CLIENT_SECRET = 'bless-styleKast-always'

// Ok so I learned something, I don't have access to the the $store and
// getters in this file. I guess because this file is not connected to then
// the global vue instance. for me to use anything from the store, I neeeded
// to import it.

export const getInitialPosts = ({ commit }) => {
  axios.get('http://localhost:5000/')
    .then(response => {
      const posts = response.data
      commit('SET_POSTS', posts)
    })
}

export const getMorePosts = ({ commit }) => {
  const currentRound = store.getters.loadRound
  axios.get('http://localhost:5000/' + currentRound)
    .then(response => {
      const posts = response.data
      console.log(currentRound)
      commit('ADD_POSTS', posts)
      commit('ADD_ROUND')
    })
}

export const signUp = ({commit}, userData) => {
  const fd = new FormData()
  fd.append('username', userData.username)
  fd.append('email', userData.email)
  fd.append('password', userData.password)
  fd.append('client_id', CLIENT_ID)
  fd.append('client_secret', CLIENT_SECRET)
  axios.post('http://localhost:5001/user/create', fd)
    .then(response => {
      const user = response.data
      console.log(user)
    })
    .catch(error => console.log(error))
}

export const logIn = ({commit}, userData) => {
  const fd = new FormData()
  fd.append('email', userData.email)
  fd.append('password', userData.password)
  fd.append('client_id', CLIENT_ID)
  fd.append('client_secret', CLIENT_SECRET)
  axios.post('http://localhost:5001/user/login', fd)
    .then(response => {
      const user = response.data
      console.log(user)
    })
    .catch(error => console.log(error))
}
