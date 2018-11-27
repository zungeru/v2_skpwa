<template>
<div>
  <div v-if="posts.length === 0">
    <h1>No Post To View Yet, Follow Others </h1>
  </div>
  <div v-else>
    <StyleKard
      v-for="(post,index) in posts"
      :key="index"
      :post="post">
    </StyleKard>
  </div>
</div>
</template>

<script>
import StyleKard from '../Shared/Stylekard/StyleKard'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      currentScrollPos: 0
    }
  },
  computed: {
    ...mapGetters({
      posts: 'posts',
      round: 'loadRound'
    })
  },
  methods: {
    ...mapActions({
      getInitialPosts: 'getInitialPosts',
      getMorePosts: 'getMorePosts'
    }),
    scroll () {
      let d = document.querySelector('.mdl-layout__content')
      let bottom = d.scrollHeight - d.scrollTop === d.clientHeight
      if (bottom) {
        this.getMorePosts()
      }
    }
  },
  components: {
    StyleKard
  },
  beforeMount () {
    this.getInitialPosts()
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
    document.querySelector('.mdl-layout__content').scrollTop = this.currentScrollPos
    document.querySelector('.mdl-layout__content').addEventListener('scroll', this.scroll)
    console.log('Feed View: Activated')
  },
  deactivated () {
    document.querySelector('.mdl-layout__content').removeEventListener('scroll', this.scroll)
    console.log('Feed View: Deactivated')
  },
  beforeRouteLeave (to, from, next) {
    this.currentScrollPos = document.querySelector('.mdl-layout__content').scrollTop
    next()
  }
}
</script>

<style>

</style>
