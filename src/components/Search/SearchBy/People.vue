<template>
  <div class="sk-auto-side-margin" ref="peoplemain">
    <div class="search-fixed-header" v-if="!isLoading" :style="{width: divsize + 'px'}">
      <div class="search-form">
        <input
          type="text"
          placeholder="  search here..."
          :style="{width: divsize - 40 + 'px'}"
          v-model="keyword" />
      </div>
    </div>
    <div class="no-result-main" v-if="results.length === 0">
        <img v-if="!searching" src="../../../assets/svg/search_profile.svg">
        <div v-else class="sk-loader"></div>

        <br/>
        <br/>

        <span class="sk-pink-link-sixteen" v-if="noResults">no results found</span>
        <span class="sk-gray-note" v-else> find a styleKaster</span>
    </div>
    <div class="search-result" v-else>
      <div v-for="(result,index) in results"
        :key="index"
        class="search-result-item"
        @click="goToUser(result.username)">
            <img class="search-image" :src="result.url"/>
            <div class="search-details">
              <span style="font-weight: bold;">{{result.username}}</span>
              <br>
              <span style="font-size: 14px;">{{result.name}}</span>
            </div>
            <!-- clear Divs -->
            <div style="clear:both;"></div>
            <!-- clear Divs -->
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import axios from 'axios'

export default {
  data () {
    return {
      divsize: 0,
      keyword: null,
      results: [],
      noResults: false,
      searching: false
    }
  },
  watch: {
    keyword (newVal, oldval) {
      this.debouncedSearchPeople()
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    getDivSize () {
      this.divsize = this.$refs.peoplemain.offsetWidth - 35
      console.log(this.divsize)
    },
    searchPeople () {
      if (this.keyword.length === 0) {
        return
      }
      this.noResults = false
      this.searching = true
      const token = localStorage.getItem('token')
      const fd = new FormData()
      fd.append('keyword', this.keyword)
      axios.post('http://localhost:5000/people/search', fd, {
        headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => {
          if(res.data.results.length === 0) {
            this.results = []
            this.noResults = true
            this.searching = false
          } else {
            this.results = res.data.results
            this.searching = false
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    goToUser (username) {
      this.$router.push({ name: 'userprofile', params: { username: username }})
    }
  },
  created () {
    this.debouncedSearchPeople = debounce(this.searchPeople, 1000)
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
    this.divsize = this.$refs.peoplemain.offsetWidth - 35
    window.addEventListener('resize', this.getDivSize)
    this.searching = false
  },
  deactivated () {
    window.removeEventListener('resize', this.getDivSize)
  },
  beforeRouteEnter (to, from, next) {
    const now = (new Date()).getTime()
    const expDate = (new Date(localStorage.getItem('expirationDate'))).getTime()
    const noToken = !localStorage.getItem('token')
    if ( (noToken) || (now >= expDate) ) {
      next('/login')
    } else {
      next()
    }
  }
}
</script>
