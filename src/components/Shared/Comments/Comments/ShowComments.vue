<template>
    <div class="comments-main">
      <div class="comments-fixed-header">
        <div class="comments-header-items">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span @click="goBack">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/>
            </svg>
          </span>
          <span @click="goPost">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
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
            <span style="font-size: 12px; font-weight: 500;"> {{comment.date_created | fromDate }}</span>
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
      comments: ''
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
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goPost () {
      this.$router.push({ name: 'addcomment' , params: { post_id: this.post.post_id}})
    }
  },
  beforeMount () {
    this.getPost()
    this.getComments()
  },
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
