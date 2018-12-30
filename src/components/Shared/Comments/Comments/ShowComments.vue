<template>
    <div class="comments-main">
      <div class="comments-fixed-header">
        <div class="comments-header-items">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span @click="goBack">
            <img src="../../../../assets/svg/backarrow.svg">
          </span>
          <span @click="goPost">
            <img src="../../../../assets/svg/add.svg">
          </span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>
      <div class="post-note">
        <div class="avatar-comments">
            <img :src="post.user_url"/>
        </div>
        <div class="details">
          <span style="font-weight: bold;">{{post.username}} </span>
          {{post.postnote}} &nbsp;
          <span style="font-size: 12px; font-weight: 500;"> {{ post.date_created | fromDate }}</span>
        </div>
        <hr>
      </div>

        <div v-for="(comment,index) in comments"
            :key="index"
            class="comments">
          <div class="avatar-comments">
              <img :src="comment.user_url"/>
          </div>
          <div class="details">
            <span style="font-weight: bold;">{{ comment.username}}  </span>
            {{ comment.comment}} &nbsp;
            <span style="font-size: 12px; font-weight: 500;"> {{comment.date_updated | fromDate }}</span>
            <span
              v-if="canEditComment(comment.username)"
              @click="editComment(comment.comment_id)"
              style="cursor: pointer;">
              &nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0V0z"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75-2.53 2.54 3.75 3.75 2.53-2.54z"/>
              </svg>
            </span>
          </div>
        </div>
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
  methods: {
    getPost () {
      const id = this.$route.params.post_id
      axios.get('http://localhost:5000/postnote/' + id)
        .then(response => {
          console.log(response.data)
          this.post = response.data.post
        })
    },
    getComments () {
      const id = this.$route.params.post_id
      axios.get('http://localhost:5000/post/' + id + '/comments')
        .then(response => {
          console.log(response.data)
          this.comments = response.data.comments
        })
    },
    getMoreComments () {
      const id = this.$route.params.post_id
      axios.get('http://localhost:5000/post/' + id + '/comments/' + this.currentRound)
        .then(response => {
          console.log(response.data)
          for (let x of response.data.comments) {
              this.comments.push(x)
          }
          this.currentRound++
        })
    },
    scroll () {
      let d = document.querySelector('.mdl-layout__content')
      let bottom = d.scrollHeight - d.scrollTop === d.clientHeight
      if (bottom) {
        this.getMoreComments()
      }
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goPost () {
      this.$router.push({ name: 'addcomment' , params: { post_id: this.post.post_id}})
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
  }
}
</script>

<style>
.comments-main {
  position: relative;
}
.comments-fixed-header {
  position: fixed;
  top: 0px;
  background-color: #ededed;
  margin-top: 56px;
  height: 45px;
  width: 100%;
}
.comments-header-items{
  margin-right: auto;
  margin-left: auto;
  margin-top: 12px;
  max-width: 500px;
  justify-content: space-between;
  display: flex;
}
.comments-header-items span {
  cursor: pointer;
}
.post-note {
  /* top right bottom left */
  padding: 20px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 45px;
  max-width: 500px;
}
.comments {
  padding: 10px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
  max-width: 500px;
}
.avatar-comments > img {
  float:left;
  border: 1px solid #4db6ac;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  padding: 2px;
  margin-left: 5px;
}
.details  {
  font-size: 15px;
  padding-left: 60px;
  padding-right: 10px;
}
</style>
