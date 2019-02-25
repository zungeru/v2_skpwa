<template>
  <div class="search-tags-main" ref="tagsmain">
    <div class="search-tags-fixed-header" v-if="!isLoading" :style="{width: divsize + 'px'}">
      <div class="search-tags-form">
        <input
          type="text"
          placeholder="  search here..."
          :style="{width: divsize - 40 + 'px'}"
          v-model="keyword" />
      </div>
    </div>
    <div class="no-tags-main" v-if="results.length === 0">
      <img v-if="!searching" src="../../../assets/svg/hashtag.svg" class="hash">
      <div v-else class="tags-loader"></div>

      <br/>
      <br/>

      <span style="color: #ff0800" v-if="noResults">no results found</span>
      <span v-else>search hashtags <br/>in recent styleKasts</span>
    </div>
    <div class="search-tags-result" v-else>
      <div v-for="(result,index) in results"
        :key="index"
        class="search-tags-result-item"
        @click="goToPost(result.post_id)">
          <img class="search-tags-image" :src="result.pics[0]['src']"/>
          <div class="search-tags-details">
            <span style="font-weight: bold;">{{result.piece}}</span>
            <br>
            <span style="font-size: 14px;">${{result.price}}</span>
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
      this.debouncedSearchTags()
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    getDivSize () {
      this.divsize = this.$refs.tagsmain.offsetWidth - 35
      console.log(this.divsize)
    },
    searchTags () {
      if (this.keyword.length === 0) {
        return
      }
      this.noResults = false
      this.searching = true
      const token = localStorage.getItem('token')
      const fd = new FormData()
      fd.append('keyword', this.keyword)
      axios.post('http://localhost:5000/tags/search', fd, {
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
    goToPost (id) {
      this.$router.push({ name: 'post', params: { post_id: id } })
    }
  },
  created () {
    this.debouncedSearchTags = debounce(this.searchTags, 1000)
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
    this.divsize = this.$refs.tagsmain.offsetWidth - 35
    window.addEventListener('resize', this.getDivSize)
    this.searching = false
  },
  deactivated () {
    window.removeEventListener('resize', this.getDivSize)
  }
}
</script>

<style>
.hash {
  border: 2px solid #137E8D;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  padding: 5px;
  background: #137E8D;
  margin-top: 3px;
}
.search-tags-main {
  /* top right bottom left */
  max-width: 500px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 90px;
}
.search-tags-fixed-header {
  position: fixed;
  top: 41px;
  text-align: center;
  padding: 10px 0px 0px 15px;
  background-color: white;
  margin-top: 60px;
}
.search-tags-form > input {
  outline: 0;
  margin-top: 10px;
  border-width: 0 0 2px;
  border-color: black;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 15px;
}
.search-tags-form > input:focus {
  border-color: #ff0800;
}
.no-tags-main{
  margin-top: 120px;
  text-align: center;
}
.no-tags-main span {
  font-size: 14px;
  color: #696969;
}
.search-tags-result{
  margin-top:110px;
  margin-left: 45px;
}
.search-tags-result-item{
  margin-top: 25px;
  cursor: pointer;
  max-width: 350px;
}
.search-tags-image {
  float:left;
  border: 2px solid #4db6ac;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  padding: 2px;
  margin-left: 5px;
}
.search-tags-details  {
  padding-left: 10px;
  padding-top: 5px;
  font-size: 15px;
  margin-left: 55px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.tags-loader {
  margin-right: auto;
  margin-left: auto;
  border: 7px solid #f3f3f3;
  border-radius: 50%;
  border-top: 7px solid #137E8D;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
