<template>
    <div class="sk-position-relative">

      <!-- Header -->
      <div class="sk-fixed-header" v-if="!isLoading">

        <div class="sk-fixed-header-item-flex">
          <span @click="goBack">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <img style="cursor: pointer;" src="../../../../assets/svg/backarrow.svg">
          </span>
          <span @click="goPost">
            <img style="cursor: pointer;" src="../../../../assets/svg/add.svg">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </div>

      </div>
      <!-- End Header -->

      <!-- Post Note -->
      <div class="sk-auto-side-margin sk-main-padding" style="margin-top: 45px;">
        <div class="avatar-comments" style="cursor: pointer;" @click="goToUser(post.username)">
            <img :src="post.user_url"/>
        </div>
        <div class="comments-details">
          <span style="font-weight: bold;">{{post.username}} </span>
          {{post.postnote}} &nbsp;
          <span style="font-size: 12px; font-weight: 500;"> {{ post.date_created | fromDate }}</span>
        </div>
        <hr>
      </div>
      <!-- End Post Note -->

      <!-- Main Comments Area -->

      <!-- when there are no comments -->
      <div class="no-comments" v-if="comments.length === 0">
        <span>no comments to view yet...</span>
      </div>

      <!-- when there are comments -->
      <div v-else>
        <div v-for="(comment,index) in comments"
            :key="index"
            class="comments">
          <div class="avatar-comments" style="cursor: pointer;" @click="goToUser(comment.username)">
              <img :src="comment.user_url"/>
          </div>
          <div class="comments-details">
            <span style="font-weight: bold;">{{ comment.username}}  </span>
            {{ comment.comment}} &nbsp;
            <span style="font-size: 12px; font-weight: 500;"> {{comment.date_updated | fromDate }}</span>
            <span
              v-if="canEditComment(comment.username)"
              @click="editComment(comment.comment_id)"
              style="cursor: pointer;">
              &nbsp;
              <img src="../../../../assets/svg/edit.svg">
            </span>
          </div>
        </div>
      </div>

    <!-- End Main comments Area   -->

    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      post: '',
      comments: [],
      currentRound: 1
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    getPost () {
      const id = this.$route.params.post_id
      axios.get('http://localhost:5000/postnote/' + id)
        .then(res => {
          if (res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if (res.data.skStatus === 'Pass') {
            this.post = res.data.post
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    getComments () {
      const id = this.$route.params.post_id
      axios.get('http://localhost:5000/post/' + id + '/comments')
        .then(res => {
          if(res.data.skStatus === 'Fail'){
            this.$router.push({name: 'error'})
          }
          if(res.data.skStatus === 'Pass'){
            this.comments = res.data.comments
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    getMoreComments () {
      const id = this.$route.params.post_id
      axios.get('http://localhost:5000/post/' + id + '/comments/' + this.currentRound)
        .then(res => {
          if(res.data.skStatus === 'Fail'){
            this.$router.push({name: 'error'})
          }
          if(res.data.skStatus === 'Pass'){
            for (let x of res.data.comments) {
                this.comments.push(x)
            }
            this.currentRound++
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    scroll () {
      let d = document.querySelector('.mdl-layout__content')
      let bottom = d.scrollHeight - d.scrollTop === d.clientHeight
      // I am having trouble with this being called based on the scroll position of the feeds prior
      if (this.comments.length >= 10 && bottom) {
        this.getMoreComments()
      }
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goPost () {
      this.$router.push({ name: 'addcomment' , params: { post_id: this.post.post_id}})
    },
    goToUser (user) {
      this.$router.push({ name: 'userprofile', params: { username: user} })
    },
    canEditComment (username) {
      if ( (!localStorage.getItem('username')) || (localStorage.getItem('username') !== username) ) {
        return false
      } else {
        return true
        }
    },
    editComment (comment_id) {
      this.$router.push({ name: 'editcomment', params: { comment_id: comment_id }})
    }
  },
  mounted () {
    document.querySelector('.mdl-layout__content').addEventListener('scroll', this.scroll)
  },
  destroyed () {
    document.querySelector('.mdl-layout__content').removeEventListener('scroll', this.scroll)
  },
  activated () {
    this.getPost()
    this.getComments()
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
      next(false)
    } else {
      next()
    }
  }
}
</script>
