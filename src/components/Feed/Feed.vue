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
    <div class="no-feed-main" key="nofeed">
      <div>
        <img src="../../assets/svg/shop.svg">
        <br>
        <span>no posts to view yet...</span>
        <br>
        <br>
        <span>when you follow styleKasters</span>
        <br>
        <span>their posts appear here</span>

        <div class="no-feed-links">
          <router-link
            tag="span"
            :to="{ name: 'editprofile'}"
            style="color: #ff0800; cursor: pointer;">update profile
          </router-link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <router-link
            tag="span"
            :to="{ name: 'people'}"
            style="color: #ff0800 ; cursor: pointer;">find styleKasters
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
      // round: 'loadRound',
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
  // beforeMount () {
  //   this.getInitialPosts()
  // },
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
    next(vm => {
      if(from.name !== 'signup'){
      // if(from.name !== 'signup' && from.name !== 'login'){
        if (vm.posts.length === 0) {
          console.log('Holla')
          vm.getInitialPosts()
        }
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.feedScrollPos = document.querySelector('.mdl-layout__content').scrollTop
    next()
  }
}
</script>

<style>
.fade-enter{
  opacity: 0;
}
.fade-enter-active{
  transition: opacity 1s;
}
.fade-leave{
  /* opacity: 1; */
}
.fade-leave-active{
  transition: opacity 1s;
  opacity: 0;
}
.no-feed-main {
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  max-width: 500px;
  text-align: center;
}
.no-feed-main span {
  font-size: 16px;
}
.no-feed-links {
  margin-top: 30px;
}
.no-feed-links span {
  font-size: 16px;
  font-weight: 500;
}
</style>
