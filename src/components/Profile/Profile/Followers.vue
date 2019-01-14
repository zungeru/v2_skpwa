<template>
  <div class="followers-main">
    <div class="followers-fixed-header" v-if="!isLoading">
      <div class="followers-header-item">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span @click="goBack">
          <img src="../../../assets/svg/backarrow.svg">
        </span>
      </div>
    </div>

    <div class="followers-list">
      <div
        v-if="followers.length === 0"
        class="no-followers-main" >
          <img src="../../../assets/svg/shop.svg">
          <br>
          <br>
          <span>no followers yet...</span>
      </div>
      <div
        v-else
        v-for="(follower,index) in followers"
        :key="index"
        class="followers">
        <div class="avatar" @click="goToUser(follower.username)">
            <img :src="follower.url"/>
        </div>
        <div class="followers-details">
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
        .then(response => {
          console.log(response.data)
          this.followers = response.data.followers
        })
    },
    getMoreFollowers () {
      const token = localStorage.getItem('token')
      const requesting_user = localStorage.getItem('username')
      const target_user = this.$route.params.username
      axios.get('http://localhost:5000/' + requesting_user + '/followers/' + target_user + '/' + this.currentRound,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          console.log(response.data)
          for (let x of response.data.followers) {
              this.followers.push(x)
          }
          this.currentRound++
        })
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
  }
}
</script>

<style>
.followers-main {
  position: relative;
}
.followers-fixed-header {
  position: fixed;
  top: 0px;
  background-color: #ededed;
  margin-top: 56px;
  height: 45px;
  width: 100%;
}
.followers-header-item{
  margin-right: auto;
  margin-left: auto;
  margin-top: 12px;
  max-width: 500px;
  display: flex;
  justify-content: flex-start;
}
.followers-header-item span {
  cursor: pointer;
}
.followers-list{
  /* top right bottom left */
  padding: 20px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 5px;
  max-width: 500px;
}
.no-followers-main{
  margin-right: auto;
  margin-left: auto;
  margin-top: 100px;
  max-width: 500px;
  text-align: center;
}
.no-followers-main span {
  font-size: 16px;
}
/* .no-followers-links {
  margin-top: 30px;
}
.no-followers-links span {
  font-size: 16px;
  font-weight: 500;
} */
/* .no-followers-main{
  margin-right: auto;
  margin-left: auto;
  margin-top: 100px;
  max-width: 500px;
  text-align: center;
}
.no-followers-main span {
  font-size: 16px;
}
. */
.followers {
  padding: 10px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  max-width: 500px;
}
.avatar > img {
  float:left;
  border: 1px solid #4db6ac;
  border-radius: 50%;
  height: 55px;
  width: 55px;
  padding: 2px;
  margin-left: 5px;
  cursor: pointer;
}
.followers-details  {
  font-size: 16px;
  padding-left: 75px;
  padding-right: 10px;
  padding-top: 15px;
}
</style>
