<template>
  <div class="sk-position-relative">
    <div class="sk-fixed-header" v-if="!isLoading">
      <div class="sk-fixed-header-item-flex-3">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span style="cursor: pointer;" @click="goBack">
          <img src="../../../assets/svg/backarrow.svg">
        </span>
      </div>
    </div>

    <div class="sk-auto-side-margin sk-main-padding">
      <div
        v-if="followers.length === 0"
        class="sk-no-follow-main" >
          <img src="../../../assets/svg/shop.svg">
          <br/>
          <br/>
          <span style="font-size: 16px">no followers yet...</span>
      </div>
      <div
        v-else
        v-for="(follower,index) in followers"
        :key="index"
        class="sk-follow">
        <div class="sk-follow-avatar" @click="goToUser(follower.username)">
            <img :src="follower.url"/>
        </div>
        <div class="sk-follow-details">
          <span style="cursor: pointer;" @click="goToUser(follower.username)">{{ follower.username}} </span> &nbsp;
          <span
            v-if="(loggedInUser !== follower.username) && (!follower.is_following)"
            style="color: #ff0800; cursor: pointer; font-weight: 500"
            @click="follow(follower.username, index)">
              follow
          </span>
          <span>&nbsp;&nbsp;</span>
          <span
            v-if="follower.is_following"
            style="color: #ff0800; cursor: pointer; font-weight: 500"
            @click="unFollow(follower.username, index)">
              unfollow
            </span>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      followers: [],
      currentRound: 1
    }
  },
  computed: {
    loggedInUser () {
      return localStorage.getItem('username')
    },
    isLoading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    getFollowers () {
      const token = localStorage.getItem('token')
      const requesting_user = localStorage.getItem('username')
      const target_user = this.$route.params.username
      axios.get('http://localhost:5000/' + requesting_user + '/followers/' + target_user,
        { headers: { 'Authorization': `Bearer ${token}` } } )
        .then(res => {
          if (res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if (res.data.skStatus === 'Pass') {
            this.followers = res.data.followers
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    getMoreFollowers () {
      const token = localStorage.getItem('token')
      const requesting_user = localStorage.getItem('username')
      const target_user = this.$route.params.username
      axios.get('http://localhost:5000/' + requesting_user + '/followers/' + target_user + '/' + this.currentRound,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => {
          if (res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if (res.data.skStatus === 'Pass') {
            for (let x of res.data.followers) {
                this.followers.push(x)
            }
            this.currentRound++
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    scroll () {
      let d = document.querySelector('.mdl-layout__content')
      let bottom = d.scrollHeight - d.scrollTop === d.clientHeight
      if (bottom) {
        this.getMoreFollowers()
      }
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goToUser (user) {
      this.$router.push({ name: 'userprofile', params: { username: user } })
    },
    follow (follower, index) {
      if (!this.loggedInUser) {
        return
      }
      const token = localStorage.getItem('token')
      axios.get('http://localhost:5000/follow/' + follower,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          // const user = response.data.user
          console.log(response.data)
          this.followers[index].is_following = true
        })
    },
    unFollow (follower, index) {
      // 12/31 I just added this realizing that it is 'missing'. I'm not sure
      // if I am breaking anything
      if (!this.loggedInUser) {
        return
      } // not sure why this was missing at first
      const token = localStorage.getItem('token')
      axios.get('http://localhost:5000/unfollow/' + follower,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          // const user = response.data.user
          console.log(response.data)
          this.followers[index].is_following = false
        })
    }
  },
  beforeMount () {
    this.getFollowers()
  },
  mounted () {
    document.querySelector('.mdl-layout__content').addEventListener('scroll', this.scroll)
  },
  destroyed () {
    document.querySelector('.mdl-layout__content').removeEventListener('scroll', this.scroll)
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
    document.querySelector('.mdl-layout__content').addEventListener('scroll', this.scroll)
  },
  deactivated () {
    document.querySelector('.mdl-layout__content').removeEventListener('scroll', this.scroll)
  },
  beforeRouteEnter (to, from, next) {
    const now = (new Date()).getTime()
    const expDate = (new Date(localStorage.getItem('expirationDate'))).getTime()
    const noToken = !localStorage.getItem('token')
    if ( (noToken) || (now >= expDate) ) {
      next('/login')
    } else {
      next()
    }
  }
}
</script>
