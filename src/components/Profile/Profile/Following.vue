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
        v-if="following.length === 0"
        class="sk-no-follow-main">
          <img src="../../../assets/svg/shop.svg">
          <br/>
          <br/>
          <span style="font-size: 16px">no following yet...</span>
      </div>
      <div
        v-else
        v-for="(follow,index) in following"
        :key="index"
        class="sk-follow">
        <div class="sk-follow-avatar" @click="goToUser(follow.username)">
            <img :src="follow.url"/>
        </div>
        <div class="sk-follow-details">
          <span style="cursor: pointer;" @click="goToUser(follow.username)">{{ follow.username}} </span> &nbsp;
          <span
            v-if="(loggedInUser !== follow.username) && (!follow.is_following)"
            style="color: #ff0800; cursor: pointer; font-weight: 500"
            @click="followUser(follow.username, index)">
              follow
          </span>
          <span>&nbsp;&nbsp;</span>
          <span
            v-if="follow.is_following"
            style="color: #ff0800; cursor: pointer; font-weight: 500"
            @click="unFollow(follow.username, index)">
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
      following: [],
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
    getFollowing () {
      const token = localStorage.getItem('token')
      const requesting_user = localStorage.getItem('username')
      const target_user = this.$route.params.username
      axios.get('http://localhost:5000/' + requesting_user + '/following/' + target_user,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => {
          if (res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if (res.data.skStatus === 'Pass') {
            console.log(res.data)
            this.following = res.data.following
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    getMoreFollowing () {
      const token = localStorage.getItem('token')
      const requesting_user = localStorage.getItem('username')
      const target_user = this.$route.params.username
      axios.get('http://localhost:5000/' + requesting_user + '/following/' + target_user + '/' + this.currentRound,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => {
          if (res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if (res.data.skStatus === 'Pass') {
            console.log(res.data)
            for (let x of res.data.following) {
                this.following.push(x)
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
        this.getMoreFollowing()
      }
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goToUser (user) {
      this.$router.push({ name: 'userprofile', params: { username: user} })
    },
    // I'm calling this function followUser instead of follow
    // (like in the UserProfile and Followers components)
    // because I am already using follow so there is a name clash.
    followUser (follow, index) {
      if (!this.loggedInUser) {
        return
      }
      const token = localStorage.getItem('token')
      axios.get('http://localhost:5000/follow/' + follow,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          // const user = response.data.user
          console.log(response.data)
          this.following[index].is_following = true
        })
    },
    unFollow (follow, index) {
      // 12/31 I just added this realizing that it is 'missing'. I'm not sure
      // if I am breaking anything
      if (!this.loggedInUser) {
        return
      } // not sure why this was missing at first
      const token = localStorage.getItem('token')
      axios.get('http://localhost:5000/unfollow/' + follow,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          // const user = response.data.user
          console.log(response.data)
          this.following[index].is_following = false
        })
    }
  },
  beforeMount () {
    this.getFollowing()
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
