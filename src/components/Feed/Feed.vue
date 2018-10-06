<template>
<div >
  <StyleKard
    v-for="(post,index) in posts"
    :key="index"
    :id="post.id"
    :post="post">
  </StyleKard>
</div>
</template>

<script>
import StyleKard from '../Shared/Stylekard/StyleKard'
import { mapActions, mapGetters } from 'vuex'

export default {
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
    document.querySelector('.mdl-layout__content').addEventListener('scroll', this.scroll)
    console.log('Feed View: Activated')
  },
  deactivated () {
    document.querySelector('.mdl-layout__content').removeEventListener('scroll', this.scroll)
    console.log('Feed View: Deactivated')
  }
}
</script>

<style>

</style>
