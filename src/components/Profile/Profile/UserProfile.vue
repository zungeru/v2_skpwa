<template>
  <div class="user-profile-main">
    <div class="user-profile-top">
      <div class="user-profile-avatar">
        <img src='http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg'/>
      </div>
      <div class="user-profile-stats">
        <div style="display:flex;justify-content:space-between;">
          <div style="text-align: center;">
            <span style="font-weight: 600">2098 </span><br>
            <span>posts</span>
          </div>
          <div style="text-align: center;">
            <span style="font-weight: 600">8M</span> <br>
            <span>followers</span>
          </div>
          <div style="text-align: center;">
            <span style="font-weight: 600">120</span> <br>
            <span>following</span>
          </div>
        </div>
        <div style="margin-left: -100px; margin-top: 31px; padding: 0px;">
          <button class="mdl-button mdl-button--primary">Follow</button>
        </div>
      </div>
      <div class="user-profile-info">
        <span style="font-weight: 600">username</span>
        <p>Ok, this is where I put all the other information... Ok, this is where I put all the other information...
          Ok,</p>
            <router-link
              tag="span"
              :to="{ name: 'editprofile'}"
              style="color: #f50057; cursor: pointer;">Edit Profile
            </router-link>

      </div>
      <hr>
    </div>

    <StyleKard
      v-for="(post,index) in posts"
      :key="index"
      :id="post.id"
      :post="post">
    </StyleKard>
  </div>
</template>

<script>
import StyleKard from '../../Shared/Stylekard/StyleKard'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      posts: [
        {
          'id': 1,
          'name': 'mido1',
          'pics': [
            { 'src': 'img/1080/slide2_A.jpeg' },
            { 'src': 'img/1080/slide1_A.jpeg' },
            { 'src': 'img/1080/slide4_A.jpeg' }
          ],
          'piece': 'New Bomber Jacket',
          'price': '598.00',
          'place': 'Barneys New York',
          'note': 'OK, this jacket just made me smile. #smiles #mynewgoto',
          'likes_count': 125,
          'date_created': '2018-08-09 11:07:59.730197',
          'user_liked': false
        },
        {
          'id': 2,
          'name': 'mido2',
          'pics': [
            { 'src': 'img/1080/slide3_A.jpeg' },
            { 'src': 'img/1080/slide1_A.jpeg' },
            { 'src': 'img/1080/slide3_A.jpeg' }
          ],
          'piece': 'New Bomber Jacket',
          'price': '598.00',
          'place': 'Barneys New York',
          'note': 'OK, this jacket just made me smile. #smiles #mynewgoto',
          'likes_count': 125,
          'date_created': '2018-08-09 11:07:59.730197',
          'user_liked': false
        },
        {
          'id': 3,
          'name': 'mido3',
          'pics': [
            { 'src': 'img/1080/slide2_A.jpeg' },
            { 'src': 'img/1080/slide1_A.jpeg' },
            { 'src': 'img/1080/slide3_A.jpeg' }
          ],
          'piece': 'New Bomber Jacket',
          'price': '598.00',
          'place': 'Barneys New York',
          'note': 'OK, this jacket just made me smile. #smiles #mynewgoto',
          'likes_count': 125,
          'date_created': '2018-08-09 11:07:59.730197',
          'user_liked': false
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      userPosts: 'userPosts',
      userRound: 'userRound'
    })
  },
  methods: {
    ...mapActions({
      getInitialUserPosts: 'getInitialUserPosts',
      getMoreUserPosts: 'getMoreUserPosts'
    })
  },
  components: {
    StyleKard
  },
  activated () {
    this.getInitialUserPosts()
    console.log('Feed View: Before mount')
  }
}

</script>

<style>
.user-profile-main{
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
}
.user-profile-top {
  padding: 15px 15px 10px 15px;
}
.user-profile-avatar > img {
  float:left;
  border: 1px solid #4db6ac;
  border-radius: 50%;
  height: 75px;
  width: 75px;
  padding: 2px;
  margin-left: 10px;
}
.user-profile-stats {
  padding-top: 10px;
  padding-right: 10px;
  margin-left: 110px;
}
.user-profile-info {
  padding-top: 5px;
  padding-right: 10px;
  margin-left: 20px;
}
</style>
