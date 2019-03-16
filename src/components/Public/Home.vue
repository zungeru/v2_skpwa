<template>
  <div class="auto-side-margin" style="margin-top: 50px;">
    <h3 class="sk-intro-title">styleKast</h3>
    <h5 class="sk-intro-subtitle">crowdsourced style</h5>
    <br/>
    <transition-group name="fade" appear mode="in-out">
      <StyleKard
        v-for="(post,index) in posts"
        :key="index"
        :post="post">
      </StyleKard>
    </transition-group>
  </div>
</template>

<script>
import StyleKard from '../Shared/Stylekard/StyleKard'
import axios from 'axios'

export default {
  data () {
    return {
      homeScrollPos: 0,
      posts: [],
      currentRound: 1
    }
  },
  components: {
    StyleKard
  },
  methods: {
    getSKPosts () {
      axios.get('http://localhost:5000/sk/feed')
        .then(res => {
          if (res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if (res.data.skStatus === 'Pass') {
            this.posts = res.data.posts
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    getMoreSKPosts () {
      axios.get('http://localhost:5000/sk/feed' + '/' + this.currentRound)
        .then(res => {
          if (res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if (res.data.skStatus === 'Pass') {
            console.log(res.data)
            for (let x of res.data.posts) {
                this.posts.push(x)
            }
            this.currentRound++
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    scroll () {
      let d = document.querySelector('.mdl-layout__content')
      let bottom = d.scrollHeight - d.scrollTop === d.clientHeight
      if (bottom) {
        this.getMoreSKPosts()
      }
    }
  },
  beforeMount () {
    this.getSKPosts()
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = this.homeScrollPos
    document.querySelector('.mdl-layout__content').addEventListener('scroll', this.scroll)
  },
  deactivated () {
    document.querySelector('.mdl-layout__content').removeEventListener('scroll', this.scroll)
  },
  beforeRouteLeave (to, from, next) {
    this.homeScrollPos = document.querySelector('.mdl-layout__content').scrollTop
    next()
  }
}
</script>
