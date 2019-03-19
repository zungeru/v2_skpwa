<template>
  <div>
    <div class="sk-fixed-header" v-if="!isLoading">
      <div class="sk-fixed-header-item-flex-3">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span style="cursor: pointer;" @click="goBack">
          <img src="../../../assets/svg/backarrow.svg">
        </span>
      </div>
    </div>

    <div style="margin-top:70px;">
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
        .then(res => {
          if (res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if (res.data.skStatus === 'Pass') {
            this.posts.push(res.data.post)
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
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
