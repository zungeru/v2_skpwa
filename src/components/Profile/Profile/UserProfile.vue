<template>
  <div class="user-profile-main">
    <div class="user-profile-top">
      <div class="user-profile-avatar">
        <img src='http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg'/>
      </div>
      <div class="user-profile-stats">
        <div style="display:flex;justify-content:space-between;">
          <div style="text-align: center;">
            <span style="font-weight: 600"> {{profiledUser.posts_count}} </span><br>
            <span>posts</span>
          </div>
          <div style="text-align: center;">
            <span style="font-weight: 600">{{profiledUser.followers_count}}</span> <br>
            <span>followers</span>
          </div>
          <div style="text-align: center;">
            <span style="font-weight: 600">{{profiledUser.following_count}}</span> <br>
            <span>following</span>
          </div>
        </div>
        <div class="">
          <div
            v-if="logedInUserId === profiledUser.auth_id"
            style="margin-left: -90px; margin-top: 31px; padding: 0px;">
            <router-link
              tag="button"
              :to="{ name: 'editprofile'}"
              class="mdl-button mdl-button--primary">Edit
            </router-link>
          </div>
          <div
            v-else
            style="margin-left: -100px; margin-top: 31px; padding: 0px;">
            <button
              @click="toggleFollow"
              class="mdl-button mdl-button--primary">Follow
            </button>
          </div>
        </div>
      </div>
      <div class="user-profile-info">
        <span style="font-weight: 600">{{profiledUser.username}}</span> &nbsp;
        <span>|</span> &nbsp;
        <span style="font-weight: 600">{{profiledUser.name}}</span>
        <p>{{profiledUser.about}}</p>

        <router-link
          tag="span"
          :to="{ name: 'userprofile', params: { username: 'mido1' }}"
          style="color: #f50057; cursor: pointer;">Mido1
        </router-link>
        <router-link
          tag="span"
          :to="{ name: 'userprofile', params: { username: 'mido2' }}"
          style="color: #f50057; cursor: pointer;">Mido2
        </router-link>
        <router-link
          tag="span"
          :to="{ name: 'userprofile', params: { username: 'mido3' }}"
          style="color: #f50057; cursor: pointer;">Mido3
        </router-link>
      </div>
      <hr>
    </div>

    <StyleKard
      v-for="(post,index) in userPosts"
      :key="index"
      :id="post.id"
      :post="post">
    </StyleKard>
  </div>
</template>

<script>
import StyleKard from '../../Shared/Stylekard/StyleKard'
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      profiledUser: {}
    }
  },
  computed: {
    ...mapGetters({
      userPosts: 'userPosts',
      userRound: 'userRound'
    }),
    logedInUserId () {
      //I'm adding this property instead of using userData from the store
      //Because this page does not require login and userData will not nessarily be defined
      return !this.$store.getters.userData ? false : this.$store.getters.userData.auth_id
    }
  },
  watch: {
    '$route'(to, from){
      // I may not need this function after all
      if(to.params.username){
        const username = to.params.username
        this.getInitialUserPosts(this.$route.params.username)
        this.getUser(this.$route.params.username)
      }
    }
  },
  methods: {
    ...mapActions({
      getInitialUserPosts: 'getInitialUserPosts',
      getMoreUserPosts: 'getMoreUserPosts'
    }),
    getUser (username) {
      axios.get('http://localhost:5000/user/' + username)
        .then(response => {
          // const user = response.data.user
          this.profiledUser = response.data.user
          console.log(this.profiledUser)
        })
    },
    scroll () {
      let d = document.querySelector('.mdl-layout__content')
      let bottom = d.scrollHeight - d.scrollTop === d.clientHeight
      if (bottom) {
        this.getMoreUserPosts(this.$route.params.username)
      }
    },
    toggleFollow () {
      const token = localStorage.getItem('token')
      axios.get('http://localhost:5000/follow/' + this.$route.params.username,
        { headers: { 'Authorization': `Bearer ${token}` } } )
        .then(response => {
          // const user = response.data.user
          console.log(response.data)
        })
    }
  },
  components: {
    StyleKard
  },
  beforeMount () {
    this.getInitialUserPosts(this.$route.params.username)
    this.getUser(this.$route.params.username)
    console.log('Feed View: Before mount')
  },
  mounted () {
    document.querySelector('.mdl-layout__content').addEventListener('scroll', this.scroll)
    console.log('Feed View: Mounted')
  },
  destroyed () {
    document.querySelector('.mdl-layout__content').removeEventListener('scroll', this.scroll)
    console.log('Feed View: Destroyed')
  },
  activated () {
    document.querySelector('.mdl-layout__content').addEventListener('scroll', this.scroll)
    console.log('Feed View: Activated')
  },
  deactivated () {
    document.querySelector('.mdl-layout__content').removeEventListener('scroll', this.scroll)
    console.log('Feed View: Deactivated')
  }
}

</script>

<style>
.user-profile-main{
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
}
.user-profile-top {
  padding: 15px 15px 10px 15px;
}
.user-profile-avatar > img {
  float:left;
  border: 1px solid #4db6ac;
  border-radius: 50%;
  height: 75px;
  width: 75px;
  padding: 2px;
  margin-left: 10px;
}
.user-profile-stats {
  padding-top: 10px;
  padding-right: 10px;
  margin-left: 110px;
}
.user-profile-info {
  padding-top: 5px;
  padding-right: 10px;
  margin-left: 20px;
}
</style>
