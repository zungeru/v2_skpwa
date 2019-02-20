import axios from 'axios'
import store from './store'
import router from '../router/router'

const CLIENT_ID = 'styleKast_client_server'
const CLIENT_SECRET = 'bless-styleKast-always'

// Ok so I learned something, I don't have access to the the $store and
// getters in this file. I guess because this file is not connected to then
// the global vue instance. for me to use anything from the store, I neeeded
// to import it.

// for auth.js
export const loadDone = ({ commit }) => {
  commit('DONE_LOADING')
}

// for auth.js
// export const signUp = ({ commit, dispatch }, userData) => {
export const signUp = ({ dispatch }, userData) => {
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
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        dispatch('storeUser')
      }
    })
    .catch(error => console.log(error))
}

// for auth.js
// export const logIn = ({ commit, dispatch }, userData) => {
export const logIn = ({ dispatch }, userData) => {
  const fd = new FormData()
  fd.append('email', userData.email)
  fd.append('password', userData.password)
  fd.append('client_id', CLIENT_ID)
  fd.append('client_secret', CLIENT_SECRET)
  axios.post('http://localhost:5001/user/login', fd)
    .then(response => {
      console.log(response.data)
      // commit('SET_TOKEN', response.data.token)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        dispatch('storeUser')
      }
    })
    .catch(error => console.log(error))
}

// for auth.js
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
    .then(res => {
      if (res.data.authStatus === 'Fail') {
        this.$router.push({name: 'error'})
      }
      // commit('SET_TOKEN', response.data.token)
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        dispatch('storeUser')
      }
      router.push({ name: 'updates' })
    })
    .catch(err => router.push({name: 'error'}))
}

// for auth.js
export const deleteUser = ({ dispatch }, userData) => {
  const fd = new FormData()
  fd.append('auth_id', userData.auth_id)
  fd.append('email', userData.email)
  fd.append('password', userData.password)
  fd.append('client_id', CLIENT_ID)
  fd.append('client_secret', CLIENT_SECRET)
  axios.post('http://localhost:5001/user/delete', fd)
    .then(res => {
      if (res.data.authStatus === 'Fail') {
        router.push({name: 'error'})
      }
      if (res.data.authStatus === 'Pass') {
        console.log(res.data)
        dispatch('setLogOutTimer', 5)
        router.push({ name: 'deleted'})
      }
    })
    .catch(error => console.log(error))

}

// for auth.js
export const logOut = ({ commit }) => {
  commit('CLEAR_AUTH_DATA')
  commit('CLEAR_PROFILE_DATA')
  commit('CLEAR_FEED_DATA')
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('username')
  router.replace({ name: 'login' })
}

// for auth.js
export const storeUser = ({ commit, dispatch }) => {
  const token = localStorage.getItem('token')
  axios.get('http://localhost:5000/yo',
    { headers: { 'Authorization': `Bearer ${token}` } })
    .then(response => {
      console.log(response.data)
      commit('SET_USER_DATA', response.data)
      if(router.currentRoute.name === 'signup' || router.currentRoute.name === 'login') {
        dispatch('getInitialPosts')
      }
      const expirationDate = new Date(response.data.exp * 1000)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('username', response.data.username)
      dispatch('setLogOutTimer', response.data.life_span)
      if(router.currentRoute.name === 'signup' || router.currentRoute.name === 'login') {
        router.push({name: 'feed'})
      }
    })
    .catch(error => console.log(error))
}

// for auth.js
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

// for auth.js
export const setLogOutTimer = ({ dispatch }, expirationTime) => {
  setTimeout(() => {
    dispatch('logOut')
  }, expirationTime * 1000)
}

// for stylefeed.js (needs to be updated)
export const getInitialPosts = ({ commit }) => {
  const token = localStorage.getItem('token')
  axios.get('http://localhost:5000/feed',
    { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => {
      if (res.data.skStatus === 'Fail') {
        router.push({name: 'error'})
      }
      if (res.data.skStatus === 'Pass') {
        const posts = res.data.posts
        commit('CLEAR_FEED_DATA')
        commit('SET_POSTS', posts)
      }
    })
    .catch(err => router.push({name: 'error'}))
}

// for stylefeed.js (needs to be updated)
export const getMorePosts = ({ commit }) => {
  const token = localStorage.getItem('token')
  const currentRound = store.getters.loadRound
  axios.get('http://localhost:5000/feed/' + currentRound,
    { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => {
      if (res.data.skStatus === 'Fail') {
        router.push({name: 'error'})
      }
      if (res.data.skStatus === 'Pass') {
        const posts = res.data.posts
        commit('ADD_POSTS', posts)
        commit('ADD_ROUND')
      }
    })
    .catch(err => router.push({name: 'error'}))
}

// for stylefeed.js
export const hideFeed = ({ commit }) => {
  commit('HIDE_FEED')
}

// for userprofile.js
export const getInitialUserPosts = ({ commit }, target_user) => {
  // const requesting_user = !store.getters.userData ? 'guest' : store.getters.userData.username
  const requesting_user = !localStorage.getItem('username') ? 'guest' : localStorage.getItem('username')
  axios.get('http://localhost:5000/' + requesting_user + '/posts/' + target_user)
    .then(res => {
      if (res.data.skStatus === 'Fail') {
        router.push({name: 'error'})
      }
      if (res.data.skStatus === 'Pass') {
        commit('CLEAR_PROFILE_DATA')
        const posts = res.data.posts
        commit('SET_USER_POSTS', posts)
      }
    })
    .catch(err => router.push({name: 'error'}))
}

// for userprofile.js
export const getMoreUserPosts = ({ commit }, target_user) => {
  const currentRound = store.getters.userRound
  // const requesting_user = !store.getters.userData ? 'guest' : store.getters.userData.username
  const requesting_user = !localStorage.getItem('username') ? 'guest' : localStorage.getItem('username')
  axios.get('http://localhost:5000/' + requesting_user + '/posts/' + target_user + '/' + currentRound)
    .then(res => {
      if (res.data.skStatus === 'Fail') {
        router.push({name: 'error'})
      }
      if (res.data.skStatus === 'Pass') {
        const posts = res.data.posts
        commit('ADD_USER_POSTS', posts)
        commit('ADD_USER_ROUND')
      }
    })
    .catch(err => router.push({name: 'error'}))
}

// for userprofile.js
export const hidePosts = ({ commit }) => {
  commit('HIDE_POSTS')
}
