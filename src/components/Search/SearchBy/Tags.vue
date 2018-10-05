<template>
  <div class="search-tags-main" ref="tagsmain">
    <div class="search-tags-fixed-header" :style="{width: divsize + 'px'}">
      <div class="search-tags-form">
        <input type="text" :style="{width: divsize - 40 + 'px'}" />
        <span>
          <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </span>
      </div>
    </div>
    <div class="search-tags-result">
      <div v-for="(result,index) in results"
        :key="index"
        class="search-tags-result-item">
          <div class="search-tags-avatar">
            <img :src="result.url"/>
          </div>
          <div class="search-tags-details">
            <span style="font-weight: bold;">{{result.name}}</span>
            <br>
            <span style="font-size: 14px;">{{result.name}}</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      divsize: 0,
      results: [
        { 'name': 'hello_cynthia',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg'
        },
        { 'name': 'hellomsaara',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg'
        },
        { 'name': 'hellofresh',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg'
        },
        { 'name': 'hellokatyxo',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg'
        },
        { 'name': 'hellodarlinglife',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg'
        },
        { 'name': 'helloIamhugo',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg'
        },
        { 'name': 'hellokitty',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg'
        },
        { 'name': 'hellobody_fr',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg'
        }
      ]
    }
  },
  methods: {
    getDivSize () {
      this.divsize = this.$refs.tagsmain.offsetWidth - 35
      console.log(this.divsize)
    }
  },
  activated () {
    this.divsize = this.$refs.tagsmain.offsetWidth - 35
    window.addEventListener('resize', this.getDivSize)
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
