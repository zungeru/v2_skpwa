<template>
<div>
  <transition-group name="fade" appear mode="in-out" v-if="showFeed">
    <StyleKard
      v-for="(post,index) in posts"
      :key="index"
      :post="post">
    </StyleKard>
  </transition-group>
  <transition-group name="fade" appear mode="out-in" v-else>
    <div class="sk-auto-side-margin sk-no-content-main" key="nofeed">
      <div>
        <img src="../../assets/svg/shop.svg">
        <br/>
        <span>no posts to view yet...</span>
        <br/><br/>
        <span>when you follow styleKasters</span>
        <br/>
        <span>their posts appear here</span>
        <br/><br/><br/>
        <div>
          <router-link
            tag="span"
            :to="{ name: 'editprofile'}"
            class="sk-pink-link-sixteen">update profile
          </router-link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <router-link
            tag="span"
            :to="{ name: 'people'}"
            class="sk-pink-link-sixteen">find styleKasters
          </router-link>
        </div>
      </div>
    </div>
  </transition-group>
</div>
</template>

<script>
import StyleKard from '../Shared/Stylekard/StyleKard'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      feedScrollPos: 0
    }
  },
  computed: {
    ...mapGetters({
      posts: 'posts',
      showFeed: 'showFeed'
    })
  },
  methods: {
    ...mapActions({
      getInitialPosts: 'getInitialPosts',
      getMorePosts: 'getMorePosts',
      hideFeed: 'hideFeed'
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
  mounted () {
    document.querySelector('.mdl-layout__content').addEventListener('scroll', this.scroll)
  },
  destroyed () {
    document.querySelector('.mdl-layout__content').removeEventListener('scroll', this.scroll)
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = this.feedScrollPos
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
      next('/')
    } else {
      next(vm => {
        const now = new Date()
        if(from.name !== 'signup' && from.name !== 'login'){
          if (vm.posts.length === 0) {
            vm.getInitialPosts()
          }
        }
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.feedScrollPos = document.querySelector('.mdl-layout__content').scrollTop
    next()
  }
}
</script>

<style>

</style>
