<template>
    <div class="comments-main">
      <div class="comments-fixed-header">
        <div class="comments-header-items">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span @click="goBack">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/>
            </svg>
          </span>
          <span @click="goPost">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>
      <div class="post-note">
        <div class="avatar">
            <img :src="comments[0]['url']"/>
        </div>
        <div class="details">
          <span style="font-weight: bold;">{{ comments[0]['name']}} </span>
          {{ comments[0]['comment']}} &nbsp;
          <span style="font-size: 12px; font-weight: 500;"> {{ comments[0]['date_created']}}</span>
        </div>
        <hr>
      </div>

        <div v-for="(comment,index) in comments"
            :key="index"
            class="comments">
          <div class="avatar">
              <img :src="comment.url"/>
          </div>
          <div class="details">
            <span style="font-weight: bold;">{{ comment.name}}  </span>
            {{ comment.comment}} &nbsp;
            <span style="font-size: 12px; font-weight: 500;"> {{comment.date_created}}</span>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [
        { 'name': 'mido1',
          'url': 'https://cdn.cliqueinc.com/cache/posts/231501/mistakes-stylish-women-make-231501-1501856651717-main.1200x0c.jpg?quality=70&interlace=true',
          'comment': 'This is a test post. This is a test post. This is a test post. This is a test post. This is a test post. This is a test post. This is a test post. This is a test post. This is a test post. This is a test post. This is a test post. This is a test post.',
          'date_created': '2 days ago'
        },
        { 'name': 'mido2',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg',
          'comment': 'This is a test post, I am testing my post, keep testing the post, love life...testing',
          'date_created': '2 days ago'
        },
        { 'name': 'mido3',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg',
          'comment': 'This is a test post, I am testing my post, keep testing the post, love life...testing',
          'date_created': '2 days ago'
        },
        { 'name': 'mido4',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg',
          'comment': 'This is a test post, I am testing my post, keep testing the post, love life...testing',
          'date_created': '2 days ago'
        },
        { 'name': 'mido5',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg',
          'comment': 'This is a test post, I am testing my post, keep testing the post, love life...testing',
          'date_created': '2 days ago'
        },
        { 'name': 'mido6',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg',
          'comment': 'This is a test post, I am testing my post, keep testing the post, love life...testing',
          'date_created': '2 days ago'
        },
        { 'name': 'mido7',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg',
          'comment': 'This is a test post, I am testing my post, keep testing the post, love life...testing',
          'date_created': '2 days ago'
        },
        { 'name': 'mido8',
          'url': 'http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg',
          'comment': 'This is a test post, I am testing my post, keep testing the post, love life...testing',
          'date_created': '2 days ago'
        }
      ]
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goPost () {
      this.$router.push({ name: 'addcomment' })
    }
  }
}
</script>

<style>
.comments-main {
  position: relative;
}
.comments-fixed-header {
  position: fixed;
  top: 0px;
  background-color: #ededed;
  margin-top: 56px;
  height: 45px;
  width: 100%;
}
.comments-header-items{
  margin-right: auto;
  margin-left: auto;
  margin-top: 12px;
  max-width: 500px;
  justify-content: space-between;
  display: flex;
}
.comments-header-items span {
  cursor: pointer;
}
.post-note {
  /* top right bottom left */
  padding: 20px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 45px;
  max-width: 500px;
}
.comments {
  padding: 10px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 0px;
  max-width: 500px;
}
.avatar > img {
  float:left;
  border: 1px solid #4db6ac;
  border-radius: 50%;
  height: 35px;
  width: 35px;
  padding: 2px;
  margin-left: 5px;
}
.details  {
  font-size: 15px;
  padding-left: 55px;
  padding-right: 10px;
}
</style>
