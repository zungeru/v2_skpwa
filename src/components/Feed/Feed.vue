<template>
<div>
    <div class="no-feed-main" v-if="posts.length === 0">
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
      feedScrollPos: 0
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
    next(vm => {
      if(from.name !== 'signup' && from.name !== 'login'){
        if (vm.posts.length === 0) {
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
