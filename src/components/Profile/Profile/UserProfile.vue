<template>
  <div class="user-profile-main">
    <div class="user-profile-top">
      <div class="user-profile-avatar">
        <img :src='profiledUser.url'/>
      </div>
      <div class="user-profile-stats">
        <div style="display:flex;justify-content:space-between;width:90%;margin-left:10px;">
          <div style="text-align: center;">
            <span style="font-weight: 600"> {{formatCount(profiledUser.posts_count)}} </span><br>
            <span style="font-weight: normal">posts</span>
          </div>
          <router-link
            :to="{ name: 'followers', params: {username: targetUsername} }"
             style="text-align: center; color: black; text-decoration: none;">
              <span style="font-weight: 600">{{formatCount(profiledUser.followers_count)}}</span> <br>
              <span style="font-weight: normal">followers</span>
          </router-link>
          <router-link
            :to="{ name: 'following', params: {username: targetUsername} }"
             style="text-align: center; color: black; text-decoration: none;">
            <span style="font-weight: 600">{{formatCount(profiledUser.following_count)}}</span> <br>
            <span style="font-weight: normal">following</span>
          </router-link>
        </div>
        <div>
          <div
            v-if="loggedInUser.auth_id === profiledUser.auth_id"
            style="margin-left: -75px; margin-top: 40px; padding: 0px;">
            <router-link
              tag="p"
              :to="{ name: 'editprofile'}"
              style="color: #ff0800; cursor: pointer; font-size:18px;">edit
            </router-link>
          </div>
          <div
            v-if="notFollowing"
            style="margin-left: -83px; margin-top: 40px; padding: 0px;">
            <p @click="follow"
              style="color: #ff0800; cursor: pointer; font-size:18px;">follow
            </p>
          </div>
          <div
            v-if="following"
            style="margin-left: -90px; margin-top: 40px; padding: 0px;">
            <p @click="unFollow"
              style="color: #ff0800; cursor: pointer; font-size:18px;">unfollow
            </p>
          </div>
        </div>
      </div>

      <div class="user-profile-info">
        <span style="font-weight: 600">{{profiledUser.username}}</span> &nbsp;
        <span v-if="profiledUser.name">|</span> &nbsp;
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

    <div v-if="userPosts.length === 0">
      <div class="no-userPosts-main">
        <img src="../../../assets/svg/shop.svg">
        <br>
        <span>no posts to view yet...</span>
        <div
          class="no-userPosts-links"
          v-if="loggedInUser.auth_id === profiledUser.auth_id">
          <p>your styleKasts will appear here</p>
          <router-link
            tag="span"
            :to="{ name: 'kast'}"
            style="color: #ff0800; cursor: pointer;">kast
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <StyleKard
        v-for="(post,index) in userPosts"
        :key="index"
        :id="post.id"
        :post="post">
      </StyleKard>
    </div>
  </div>
</template>

<script>
import StyleKard from '../../Shared/Stylekard/StyleKard'
import { mapActions, mapGetters } from 'vuex'
import { formatCount } from '../../../mixins/formatcount'
import axios from 'axios'

export default {
  data () {
    return {
      profileScrollPos: 0,
      profiledUser: {}
    }
  },
  mixins: [formatCount],
  computed: {
    ...mapGetters({
      userPosts: 'userPosts',
      userRound: 'userRound'
    }),
    loggedInUser () {
      // I'm adding this property instead of using userData from the store
      // Because this page does not require login and userData will not nessarily be defined
      return !this.$store.getters.userData ? 'guest' : this.$store.getters.userData
    },
    targetUsername () {
      return !this.$route.params.username ? 'guest' : this.$route.params.username
    },
    following () {
      if ((this.loggedInUser.auth_id !== this.profiledUser.auth_id) && (this.profiledUser.is_following === true)) {
        return true
      } else {
        return false
      }
    },
    notFollowing () {
      if ((this.loggedInUser.auth_id !== this.profiledUser.auth_id) && (this.profiledUser.is_following === false)) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    '$route' (to, from) {
      // Case where we nagivate from one user profile to another
      // profile/user/mido1 ==> profile/user/mido2
      if (to.params.username && from.params.username) {
        if(from.params.username != to.params.username) {
          document.querySelector('.mdl-layout__content').scrollTop = 0
          this.getInitialUserPosts(this.$route.params.username)
          this.getUser()
        }
      }
      // Case where we navigate from another component to the profile
      // But the profiel user is different from the one that was previously loaded
      // Home Component => profile/user/mido2 where profile/user/mido1 is the current profile loaded
      if (to.params.username && !from.params.username){
        if(to.params.username != this.profiledUser.username){
          console.log("HelloTonight!")
          this.getInitialUserPosts(this.$route.params.username)
          this.getUser()
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getInitialUserPosts: 'getInitialUserPosts',
      getMoreUserPosts: 'getMoreUserPosts'
    }),
    getUser () {
      const requestingUser = !localStorage.getItem('username') ? 'guest' : localStorage.getItem('username')
      const targetUser = this.$route.params.username
      axios.get('http://localhost:5000/' + requestingUser + '/user/' + targetUser)
        .then(response => {
          console.log(response.data)
          this.profiledUser = response.data.user
        })
    },
    scroll () {
      let d = document.querySelector('.mdl-layout__content')
      let bottom = d.scrollHeight - d.scrollTop === d.clientHeight
      if (bottom) {
        console.log('SCROLL')
        console.log(d.scrollTop)
        this.getMoreUserPosts(this.$route.params.username)
      }
    },
    follow () {
      if (this.loggedInUser === 'guest') {
        return
      }
      const token = localStorage.getItem('token')
      axios.get('http://localhost:5000/follow/' + this.$route.params.username,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          // const user = response.data.user
          console.log(response.data)
          this.getUser()
        })
    },
    unFollow () {
      const token = localStorage.getItem('token')
      axios.get('http://localhost:5000/unfollow/' + this.$route.params.username,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          // const user = response.data.user
          console.log(response.data)
          this.getUser()
        })
    }
  },
  components: {
    StyleKard
  },
  beforeMount () {
    this.getInitialUserPosts(this.$route.params.username)
    this.getUser()
  },
  mounted () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
    document.querySelector('.mdl-layout__content').addEventListener('scroll', this.scroll)
    console.log('Profile View: Mounted')
  },
  destroyed () {
    document.querySelector('.mdl-layout__content').removeEventListener('scroll', this.scroll)
    console.log('Profile View: Destroyed')
  },
  activated () {
    if(this.$route.params.username != this.profiledUser.username){
      console.log("HelloTonight!")
      document.querySelector('.mdl-layout__content').scrollTop = 0
    } else {
      document.querySelector('.mdl-layout__content').scrollTop = this.profileScrollPos
    }
    document.querySelector('.mdl-layout__content').addEventListener('scroll', this.scroll)
    console.log('Profile View: Activated')
  },
  deactivated () {
    document.querySelector('.mdl-layout__content').removeEventListener('scroll', this.scroll)
    console.log('Profile View: Deactivated')
  },
  beforeRouteLeave (to, from, next) {
    this.profileScrollPos = document.querySelector('.mdl-layout__content').scrollTop
    next()
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
  border: 2px solid #4db6ac;
  border-radius: 50%;
  height: 75px;
  width: 75px;
  padding: 3px;
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
.no-userPosts-main {
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  max-width: 500px;
  text-align: center;
}

.no-userPosts-main span {
  font-size: 16px;
}

.no-userPosts-links {
  margin-top: 5px;
}

.no-userPosts-links p {
  margin-top: 0px;
  font-size:16px;

}

.no-userPosts-links span {
  font-size: 18px;
  font-weight: 500;
}
</style>
