<template>
  <div class="search-people-main" ref="peoplemain">
    <div class="search-people-fixed-header" :style="{width: divsize + 'px'}">
      <div class="search-people-form">
        <input type="text" :style="{width: divsize - 40 + 'px'}" v-model="keyword" />
        <span>
          <img src="../../../assets/svg/search.svg">
        </span>
      </div>
    </div>
    <div class="search-people-result" v-if="results.length > 0">
      <div v-for="(result,index) in results"
        :key="index"
        class="search-people-result-item"
        @click="goToUser(result.username)">
          <div class="search-people-avatar">
            <img :src="result.url"/>
          </div>
          <div class="search-people-details">
            <span style="font-weight: bold;">{{result.username}}</span>
            <br>
            <span style="font-size: 14px;">{{result.name}}</span>
          </div>
      </div>
    </div>
    <div class="search-people-result" v-else>
      <p> Find A StyleKaster...</p>
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
      this.debouncedSearchPeople()
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
      const token = localStorage.getItem('token')
      const fd = new FormData()
      fd.append('keyword', this.keyword)
      let vm = this
      axios.post('http://localhost:5000/people/search', fd, {
        headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          console.log(response.data)
          vm.results = response.data.results
        })
        .catch(error => console.log(error))
    },
    goToUser (username) {
      this.$router.push({ name: 'userprofile', params: { username: username }})
    }
  },
  created () {
    this.debouncedSearchPeople = debounce(this.searchPeople, 1000)
  },
  activated () {
    this.divsize = this.$refs.peoplemain.offsetWidth - 35
    window.addEventListener('resize', this.getDivSize)
    console.log('Search People View: Activated')
  },
  deactivated () {
    window.removeEventListener('resize', this.getDivSize)
    console.log('Search People View: Deactivated')
  }
}
</script>

<style>
.search-people-main {
  /* top right bottom left */
  max-width: 500px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 90px;
}
.search-people-fixed-header {
  position: fixed;
  top: 41px;
  padding: 10px 0px 0px 20px;
  background-color: white;
  margin-top: 60px;
}
.search-people-form > input {
  outline: 0;
  border-width: 0 0 2px;
  border-color: black;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
}
.search-people-form > input:focus {
  border-color: #f50057;
}
.search-people-result {
  margin-top:110px;
  margin-left: 45px;
}
.search-people-result-item{
  margin-top: 25px;
  cursor: pointer;
  max-width: 450px;
  background-color: gray;
}
.search-people-avatar > img {
  float:left;
  border: 2px solid #4db6ac;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  padding: 2px;
  margin-left: 5px;
}
.search-people-details  {
  padding-left: 10px;
  padding-top: 5px;
  font-size: 15px;
  margin-left: 55px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
