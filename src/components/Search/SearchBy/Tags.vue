<template>
  <div class="search-tags-main" ref="tagsmain">
    <div class="search-tags-fixed-header" :style="{width: divsize + 'px'}">
      <div class="search-tags-form">
        <input type="text" :style="{width: divsize - 40 + 'px'}" v-model="keyword" />
        <span>
          <img src="../../../assets/svg/search.svg">
        </span>
      </div>
    </div>
    <div class="search-tags-result" v-if="results.length > 0">
      <div v-for="(result,index) in results"
        :key="index"
        class="search-tags-result-item"
        @click="goToPost(result.post_id)">
          <div class="search-tags-avatar">
            <img :src="result.pics[0]['src']"/>
          </div>
          <div class="search-tags-details">
            <span style="font-weight: bold;">{{result.piece}}</span>
            <br>
            <span style="font-size: 14px;">${{result.price}}</span>
          </div>
      </div>
    </div>
    <div class="search-tags-result" v-else>
      <p> Find A Post...</p>
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
      results: []
    }
  },
  watch: {
    keyword (newVal, oldval) {
      this.debouncedSearchTags()
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
      const token = localStorage.getItem('token')
      const fd = new FormData()
      fd.append('keyword', this.keyword)
      let vm = this
      console.log(this.keyword)
      axios.post('http://localhost:5000/tags/search', fd, {
        headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          console.log(response.data)
          vm.results = response.data.results
        })
        .catch(error => console.log(error))
    },
    goToPost (id) {
      this.$router.push({ name: 'post', params: { post_id: id } })
    }
  },
  created () {
    this.debouncedSearchTags = debounce(this.searchTags, 1000)
  },
  activated () {
    this.divsize = this.$refs.tagsmain.offsetWidth - 35
    window.addEventListener('resize', this.getDivSize)
    console.log('Search Tags View: Activated')
  },
  deactivated () {
    window.removeEventListener('resize', this.getDivSize)
    console.log('Search Tags View: Deactivated')
  }
}
</script>

<style>
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
  padding: 10px 0px 0px 20px;
  background-color: white;
  margin-top: 60px;
}
.search-tags-form > input {
  outline: 0;
  border-width: 0 0 2px;
  border-color: black;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
}
.search-tags-form > input:focus {
  border-color: #f50057;
}
.search-tags-result{
  margin-top:110px;
  margin-left: 45px;
}
.search-tags-result-item{
  margin-top: 25px;
  cursor: pointer;
  max-width: 300px;
  background-color: gray;
}
.search-tags-avatar > img {
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
</style>
