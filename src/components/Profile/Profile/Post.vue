<template>
  <div>
    <div class="post-fixed-header" v-if="!isLoading">
      <div class="post-header-item">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span span @click="goBack">
          <img src="../../../assets/svg/backarrow.svg">
        </span>
      </div>
    </div>

    <div class="post-body">
      <StyleKard
        class="post-body"
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
  computed: {
    isLoading () {
      return this.$store.getters.loading
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
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
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
  margin-top: 70px;
}
</style>
