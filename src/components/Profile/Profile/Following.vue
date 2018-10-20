<template>
  <div class="following-main">
    <div class="following-fixed-header">
      <div class="following-header-item">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/>
          </svg>
        </span>
      </div>
    </div>

    <div class="following-list">
      <div v-for="(follow,index) in following"
          :key="index"
          class="following">
        <div class="avatar">
            <img :src="follow.url"/>
        </div>
        <div class="following-details">
          <span>{{ follow.username}} </span> &nbsp;
          <button
            v-if="(loggedInUser !== follow.username) && (!follow.is_following)"
            class="mdl-button mdl-button--primary">
              Follow
          </button>
          <button
            v-if="follow.is_following"
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
      following: []
    }
  },
  computed: {
    loggedInUser () {
      return localStorage.getItem('username')
    }
  },
  methods: {
    getFollowing () {
      const token = localStorage.getItem('token')
      const requesting_user = localStorage.getItem('username')
      const target_user = this.$route.params.username
      axios.get('http://localhost:5000/' + requesting_user + '/following/' + target_user,
        { headers: { 'Authorization': `Bearer ${token}` } } )
        .then(response => {
          console.log(response.data)
          this.following = response.data.following
        })
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
  },
  beforeMount () {
    this.getFollowing()
  }
}
</script>

<style>
.following-main {
  position: relative;
}
.following-fixed-header {
  position: fixed;
  top: 0px;
  background-color: #ededed;
  margin-top: 56px;
  height: 45px;
  width: 100%;
}
.following-header-item{
  margin-right: auto;
  margin-left: auto;
  margin-top: 12px;
  max-width: 500px;
  display: flex;
  justify-content: flex-start;
}
.following-header-item span {
  cursor: pointer;
}
.following-list{
  /* top right bottom left */
  padding: 20px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 5px;
  max-width: 500px;
}
.following {
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
.following-details  {
  font-size: 18px;
  padding-left: 90px;
  padding-right: 10px;
  padding-top: 15px;
  font-weight: 500;
}
</style>
