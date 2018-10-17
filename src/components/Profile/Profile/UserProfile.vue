<template>
  <div class="user-profile-main">
    <div class="user-profile-top">
      <div class="user-profile-avatar">
        <img src='http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg'/>
      </div>
      <div class="user-profile-stats">
        <div style="display:flex;justify-content:space-between;">
          <div style="text-align: center;">
            <span style="font-weight: 600"> {{profiledUser.posts_count}} </span><br>
            <span>posts</span>
          </div>
          <div style="text-align: center;">
            <span style="font-weight: 600">{{profiledUser.followers_count}}</span> <br>
            <span>followers</span>
          </div>
          <div style="text-align: center;">
            <span style="font-weight: 600">{{profiledUser.following_count}}</span> <br>
            <span>following</span>
          </div>
        </div>
        <div style="margin-left: -100px; margin-top: 31px; padding: 0px;">
          <button class="mdl-button mdl-button--primary">Follow</button>
        </div>
      </div>
      <div class="user-profile-info">
        <span style="font-weight: 600">{{profiledUser.username}}</span> &nbsp;
        <span>|</span> &nbsp;
        <span style="font-weight: 600">{{profiledUser.name}}</span>
        <p>{{profiledUser.about}}</p>
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
import axios from 'axios'

export default {
  data () {
    return {
      posts: [
        {
          'id': 1,
          'name': 'mido1',
          'pics': [
            { 'src': 'https://res.cloudinary.com/zungeru/image/upload/v1539480523/userphotos/sk_14_pic_1.jpg' },
            { 'src': 'http://www.trandynow.com/wp-content/uploads/2017/09/How-to-look-fashionable-in-a-Parka-8-copy.jpg' },
            { 'src': 'https://www.tricountymall.com/wp-content/uploads/2015/09/Ways-to-Make-Flannel-Fashionable.jpg' }
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
            { 'src': 'https://res.cloudinary.com/zungeru/image/upload/v1539480523/userphotos/sk_14_pic_1.jpg' },
            { 'src': 'http://www.trandynow.com/wp-content/uploads/2017/09/How-to-look-fashionable-in-a-Parka-8-copy.jpg' },
            { 'src': 'https://www.tricountymall.com/wp-content/uploads/2015/09/Ways-to-Make-Flannel-Fashionable.jpg' }
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
            { 'src': 'https://res.cloudinary.com/zungeru/image/upload/v1539480523/userphotos/sk_14_pic_1.jpg' },
            { 'src': 'http://www.trandynow.com/wp-content/uploads/2017/09/How-to-look-fashionable-in-a-Parka-8-copy.jpg' },
            { 'src': 'https://www.tricountymall.com/wp-content/uploads/2015/09/Ways-to-Make-Flannel-Fashionable.jpg' }
          ],
          'piece': 'New Bomber Jacket',
          'price': '598.00',
          'place': 'Barneys New York',
          'note': 'OK, this jacket just made me smile. #smiles #mynewgoto',
          'likes_count': 125,
          'date_created': '2018-08-09 11:07:59.730197',
          'user_liked': false
        }
      ],
      profiledUser: {}
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
    }),
    getUser (username) {
      axios.get('http://localhost:5000/user/' + username)
        .then(response => {
          // const user = response.data.user
          this.profiledUser = response.data.user
          console.log(this.profiledUser)
        })
    }
  },
  components: {
    StyleKard
  },
  beforeMount () {
    this.getInitialUserPosts(this.$route.params.username)
    this.getUser(this.$route.params.username)
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
