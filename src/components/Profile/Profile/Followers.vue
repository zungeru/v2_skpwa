<template>
  <div class="followers-main">
    <div class="followers-fixed-header">
      <div class="followers-header-item">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/>
          </svg>
        </span>
      </div>
    </div>

    <div class="followers-list">
      <div
        v-if="followers.length === 0">
        <div class="no-followers-main">
          <img src="../../../assets/svg/shop.svg">
          <br>
          <br>
          <span>no followers yet...</span>
        </div>
      </div>
      <div
        v-else
        v-for="(follower,index) in followers"
        :key="index"
        class="followers">
        <div class="avatar">
            <img :src="follower.url"/>
        </div>
        <div class="followers-details">
          <span>{{ follower.username}} </span> &nbsp;
          <button
            v-if="(loggedInUser !== follower.username) && (!follower.is_following)"
            class="mdl-button mdl-button--primary">
              Follow
          </button>
          <button
            v-if="follower.is_following"
            class="mdl-button mdl-button--primary">
              UnFollow
            </button>
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
      followers: []
    }
  },
  computed: {
    loggedInUser () {
      return localStorage.getItem('username')
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
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  beforeMount () {
    this.getFollowers()
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
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
}
.followers-details  {
  font-size: 18px;
  padding-left: 90px;
  padding-right: 10px;
  padding-top: 15px;
  font-weight: 500;
}
</style>
