import axios from 'axios'
import store from './store'
import router from '../router/router'

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

export const signUp = ({ commit, dispatch }, userData) => {
  const fd = new FormData()
  fd.append('username', userData.username)
  fd.append('email', userData.email)
  fd.append('password', userData.password)
  fd.append('client_id', CLIENT_ID)
  fd.append('client_secret', CLIENT_SECRET)
  axios.post('http://localhost:5001/user/create', fd)
    .then(response => {
      console.log(response.data)
      // commit('SET_TOKEN', response.data.token)
      if (response.data.token){
        localStorage.setItem('token', response.data.token)
        dispatch('storeUser')
      }
    })
    .catch(error => console.log(error))
}

export const logIn = ({ commit, dispatch }, userData) => {
  const fd = new FormData()
  fd.append('email', userData.email)
  fd.append('password', userData.password)
  fd.append('client_id', CLIENT_ID)
  fd.append('client_secret', CLIENT_SECRET)
  axios.post('http://localhost:5001/user/login', fd)
    .then(response => {
      console.log(response.data)
      // commit('SET_TOKEN', response.data.token)
      if (response.data.token){
        localStorage.setItem('token', response.data.token)
        dispatch('storeUser')
      }
    })
    .catch(error => console.log(error))
}

export const updateUser = ({ commit, dispatch }, userData) => {
  const fd = new FormData()
  fd.append('auth_id', userData.auth_id)
  fd.append('old_email', userData.currentEmail)
  fd.append('new_email', userData.newEmail)
  fd.append('old_password', userData.currentPassword)
  fd.append('new_password', userData.newPassword)
  fd.append('client_id', CLIENT_ID)
  fd.append('client_secret', CLIENT_SECRET)
  axios.post('http://localhost:5001/user/update', fd)
    .then(response => {
      console.log(response.data)
      // commit('SET_TOKEN', response.data.token)
      if (response.data.token){
        localStorage.setItem('token', response.data.token)
        dispatch('storeUser')
      }
    })
    .catch(error => console.log(error))
}

export const logOut = ({ commit }) => {
  commit('CLEAR_AUTH_DATA')
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  router.replace({ name: 'login'})
}

export const storeUser = ({ commit, dispatch }) => {
  const token = localStorage.getItem('token')
  axios.get('http://localhost:5000/yo', { headers: { 'Authorization': `Bearer ${token}` } })
    .then(response => {
      console.log(response.data)
      commit('SET_USER_DATA', response.data)
      const expirationDate = new Date(response.data.exp * 1000)
      localStorage.setItem('expirationDate', expirationDate)
      dispatch('setLogOutTimer', response.data.life_span)
    })
    .catch(error => console.log(error))
}

export const tryAutoLogIn = ({ dispatch }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return
  }
  const expirationDate = localStorage.getItem('expirationDate')
  const now = new Date()
  if (now >= expirationDate) {
    return
  }
  dispatch('storeUser')
}

export const setLogOutTimer = ({ dispatch }, expirationTime) => {
    setTimeout(() => {
      dispatch('logOut')
    }, expirationTime * 1000)
}
