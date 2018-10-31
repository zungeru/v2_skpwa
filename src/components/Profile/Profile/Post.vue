<template>
  <div class="">
    <div class="post-fixed-header">
      <div class="post-header-item">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span span @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/>
          </svg>
        </span>
      </div>
    </div>

    <div class="post-body">
      <StyleKard
        v-for="(post,index) in posts"
        :key="index"
        :id="post.id"
        :post="post">
      </StyleKard>
    </div>
  </div>
</template>

<script>
import StyleKard from '../../Shared/Stylekard/StyleKard'
import axios from 'axios'


export default {
  data () {
    return {
      posts: []
    }
  },
  watch: {
    $route (to, from) {
      if(to.params.post_id) {
        this.getPost()
      }
    }
  },
  methods: {
    getPost () {
      this.posts = []
      const token = localStorage.getItem('token')
      const post_id = this.$route.params.post_id
      axios.get('http://localhost:5000/post/' + post_id,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          console.log(response.data)
          this.posts.push(response.data.post)
        })
        .catch(error => console.log(error))
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  components: {
    StyleKard
  },
  beforeMount () {
    this.getPost()
  }
}
</script>

<style>
.post-main {
  position: relative;
}
.post-fixed-header {
  position: fixed;
  top: 0px;
  background-color: #ededed;
  margin-top: 56px;
  height: 45px;
  width: 100%;
}
.post-header-item {
  margin-right: auto;
  margin-left: auto;
  margin-top: 12px;
  max-width: 500px;
  display: flex;
  justify-content: flex-start;
}
.post-header-item span {
  cursor: pointer;
}
.post-body {
  padding: 0px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 70px;
  max-width: 500px;
}
</style>
