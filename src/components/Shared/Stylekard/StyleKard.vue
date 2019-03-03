<template>
  <!-- Main Div MDL-Card -->
  <div class="mdl-card mdl-shadow--2dp" :style="{width: kardSize + 'px'}">

    <!-- MDL-Card Title -->
    <div class="mdl-card__title">
      <div class="avatar" @click="goToUser">
          <img :src="post.url"/>
      </div>
       <span class="mdl-card__title-text" @click="goToUser"> {{post.username}} </span>
        <div class="mdl-layout-spacer"></div>
        <span v-if="canEditPost" @click="editPost">
          <img src="../../../assets/svg/edit.svg">
          &nbsp;&nbsp;
        </span>
    </div>
    <!-- End MDL-Card Title -->

    <!-- MDL-Card Media -->
    <div class="mdl-card__media">

      <!-- Slides -->
      <div class="slides">

        <!-- Slide Component -->
        <div
            v-bind:style="{ width: innerWidth + 'px', marginLeft: '-' + slidesInnerMarginLeft + 'px' }"
            class="slides-inner"
            @click="nextPicture">
            <Slide
                v-for="(pic, index) in post.pics"
                :key="index"
                v-bind:style="{ width: kardSize + 'px' }"
                v-bind:slide="pic">
            </Slide>
        </div>
        <!-- End Slide Component -->

        <!-- Slide Navigation -->
        <div class="navigation">
            <span
              v-if="post.pics.length > 1"
              class="nav-number"
              v-for="(pic, index) in post.pics"
              :key="index"
              @click="goToSlideIndex(index)">
              <svg height="10" width="10">
                <circle cx="5" cy="5" r="4" :fill="[index === currentIndex ? '#f50057': 'black']"/>
              </svg>
            </span>
            <br>
            <span style="font-size: 14px; color: gray;">{{ post.date_created | fromDate}}</span>
            <p style="margin-bottom: 0px; font-weight: 500">{{post.piece}}</p>
        </div>
        <!-- End Slide Navigation -->

      </div>
      <!-- End Slides -->

    </div>
    <!-- End MDL-Card Media -->

    <!-- Info Bar -->
    <div class="info-bar">
      <span @click="notes = !notes">
        <svg fill="#B0B0B0" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
           <path d="M0 0h24v24H0z" fill="none"/>
           <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      </span>
      <span @click="place = !place">
        <svg fill="#B0B0B0" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </span>
      <span @click="updateLiked">
          <svg v-if="post.user_liked" fill="#FF0000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <svg v-else fill="#B0B0B0" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
          </svg>
       <span style="margin-left:0px; font-size:14px;">{{formatCount(post.likes_count)}}</span>
      </span>

      <router-link tag="span" exact :to="{ name: 'showcomments', params: { post_id: post.post_id}}">
        <svg fill="#B0B0B0" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
           <path d="M0 0h24v24H0V0z" fill="none"/>
           <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
        <span style="margin-left:0px; font-size:14px;">{{formatCount(post.comments_count)}}</span>
      </router-link>

      <span style="font-size: 14px;">${{post.price}}</span>
    </div>
    <!--End Info Bar -->

    <!-- clear Divs -->
    <div style="clear:both;"></div>
    <!-- clear Divs -->

    <!-- Info Detail -->
    <div class="info-detail">
      <div v-if="notes">
        <span style="font-weight: bold;">stylenote:</span> {{post.note}}
      </div>
      <div v-if="place">
        <span style="font-weight: bold;">where:</span>
        &nbsp;
        <span v-if="placeUrl">
          <a v-bind:href="post.place" style="text-decoration: none; color: gray;">
            see link ...
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
          </a>
        </span>
        <span v-else>{{post.place}}</span>
      </div>
    </div>
    <!-- End Info Detail -->
  </div>
  <!-- End Main Div MDL-Card -->
</template>

<script>
import axios from 'axios'
import Slide from './Slide'
import { formatCount } from '../../../mixins/formatcount'

export default {
  data () {
    return {
      kardSize: 0,
      currentIndex: 0,
      currentDir: 'forward',
      notes: false,
      place: false
    }
  },
  mixins: [formatCount],
  props: {
    post: [Object]
  },
  computed: {
    innerWidth () {
      return this.kardSize * this.post.pics.length
    },
    slidesInnerMarginLeft () {
      return this.currentIndex * this.kardSize
    },
    placeUrl () {
      let substring1 = this.post.place.substring(0, 7)
      let substring2 = this.post.place.substring(0, 8)
      if ((substring1 === 'http://') || (substring2 === 'https://')) {
        return true
      } else {
        return false
      }
    },
    canEditPost () {
      if ((!localStorage.getItem('username')) || (localStorage.getItem('username') !== this.post.username)) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.currentIndex = 0
      this.currentDir = 'forward'
      this.notes = false
      this.place =false
    }
  },
  methods: {
    nextPicture () {
      if (this.post.pics.length === 1){
        return
      }
      if (this.currentDir === 'forward') {
        if (this.currentIndex + 1 === this.post.pics.length) {
          this.currentDir = 'backward'
          this.currentIndex--
          console.log(this.currentIndex)
        } else {
          this.currentIndex++
          console.log(this.currentIndex)
        }
      } else {
        if (this.currentDir === 'backward') {
          if (this.currentIndex === 0) {
            this.currentDir = 'forward'
            this.currentIndex++
            console.log(this.currentIndex)
          } else {
            this.currentIndex--
            console.log(this.currentIndex)
          }
        }
      }
    },
    goToSlideIndex (index) {
      this.currentIndex = index
    },
    updateLiked () {
      if (!this.post.user_liked) {
        this.likePost()
      } else {
        this.unlikePost()
      }
    },
    likePost () {
      //check if user is trying to like own posts
      if(!localStorage.getItem('token') || localStorage.getItem('username') === this.post.username) {
        return
      }
      const token = localStorage.getItem('token')
      const id = this.post.post_id
      axios.get('http://localhost:5000/post/like/' + id,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => {
          if (res.data.skStatus === 'Fail') {
            return
          }
          // I'm updating the likes count here to keep it in sync with
          // The Backend without having to make another API Call
          if(res.data.skStatus === 'Pass') {
            this.post.likes_count++
            this.post.user_liked = !this.post.user_liked
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    unlikePost () {
      //check if user is trying to unlike own posts
      if(localStorage.getItem('username') === this.post.username) {
        return
      }
      const token = localStorage.getItem('token')
      const id = this.post.post_id
      axios.get('http://localhost:5000/post/unlike/' + id,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => {
          if (res.data.skStatus === 'Fail'){
            return
          }
          // I'm updating the likes count here to keep it in sync with
          // The Backend without having to make another API Call
          if (res.data.skStatus === 'Pass') {
            this.post.likes_count--
            this.post.user_liked = !this.post.user_liked
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    goToUser () {
      this.$router.push({ name: 'userprofile', params: { username: this.post.username } })
    },
    editPost () {
      this.$router.push({ name: 'editkast', params: { post_id: this.post.post_id } })
    }
  },
  components: {
    Slide
  },
  mounted () {
    this.kardSize = Math.min(window.innerWidth - 15, 400)
  }
}
</script>

<style scoped>
.mdl-card{
  display: block;
  margin-top: 10px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 15px;
  max-width: 400px;
  background: #FFF;
  position: relative;
}

.mdl-card__title {
  margin: 0px;
  padding: 5px;
  cursor: pointer;
}

.avatar > img {
  float:left;
  border: 1px solid #137E8D;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  padding: 2px;
  margin-left: 5px;
}

.mdl-card__title > span {
  font-size: 17px;
  margin-left: 5px;
  padding: 15px 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

}

.mdl-card__media {
  margin-bottom: 0px;
  padding-bottom: 0px;
  background: #0C0C0C;
}

.slides{
    overflow: hidden;
    overflow-y: hidden;
    overflow-x: hidden;
    text-align: center;
    /* max-width: 500px; */
    /* width: 100%; */
  }
  .slides-inner{
    transition: margin 0.5s ease-out;
  }
  .navigation{
    background-color: white;
    padding: 0px;
    margin: 0px;
  }
  .nav-number{
    cursor: pointer;
    padding-right: 1px;
    padding-left: 1px
  }
.info-bar {
  /* background-color: pink; Not working anymore b/c of float */
  margin-top: 2px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 5px;
  justify-content: space-between;
  display: flex;
}
.info-detail {
  /* background-color: green; */
  font-size: 15px;
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 3px;
  padding-bottom: 7px;
}
</style>
