import Home from '../components/Public/Home.vue'
import Signup from '../components/Public/Signup.vue'
import Login from '../components/Public/Login.vue'
import About from '../components/Public/About.vue'
import Error from '../components/Public/Error.vue'
import Forgot from '../components/Public/Forgot.vue'
import Reset from '../components/Public/Reset.vue'
import Updates from '../components/Public/Updates.vue'
import Deleted from '../components/Public/Deleted.vue'
import Feed from '../components/Feed/Feed.vue'
import CommentsHome from '../components/Shared/Comments/CommentsHome.vue'
import ShowComments from '../components/Shared/Comments/Comments/ShowComments.vue'
import AddComment from '../components/Shared/Comments/Comments/AddComment.vue'
import EditComment from '../components/Shared/Comments/Comments/EditComment.vue'
import Kast from '../components/Kast/Kast.vue'
import EditKast from '../components/Kast/EditKast.vue'
import SearchHome from '../components/Search/SearchHome.vue'
import People from '../components/Search/SearchBy/People.vue'
import Tags from '../components/Search/SearchBy/Tags.vue'
import ProfileHome from '../components/Profile/ProfileHome.vue'
import UserProfile from '../components/Profile/Profile/UserProfile.vue'
import EditProfile from '../components/Profile/Profile/EditProfile.vue'
import Followers from '../components/Profile/Profile/Followers.vue'
import Following from '../components/Profile/Profile/Following.vue'
import Post from '../components/Profile/Profile/Post.vue'

export const routes = [
  { path: '', name: 'home', component: Home },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/login', name: 'login', component: Login },
  { path: '/about', name: 'about', component: About },
  { path: '/error', name: 'error', component: Error },
  { path: '/forgot', name: 'forgot', component: Forgot },
  { path: '/reset', name: 'reset', component: Reset },
  { path: '/updates', name: 'updates', component: Updates },
  { path: '/goodbye', name: 'deleted', component: Deleted },
  { path: '/feed', name: 'feed', component: Feed },
  { path: '/kast', name: 'kast', component: Kast },
  { path: '/edit/kast/:post_id', name: 'editkast', component: EditKast },
  { path: '/search',
    component: SearchHome,
    children: [
      { path: 'people', name: 'people', component: People },
      { path: 'tags', name: 'tags', component: Tags }
    ]
  },
  { path: '/comments',
    component: CommentsHome,
    children: [
      { path: 'post/:post_id', name: 'showcomments', component: ShowComments },
      { path: '/add/comment/:post_id', name: 'addcomment', component: AddComment },
      { path: '/edit/comment/:comment_id', name: 'editcomment', component: EditComment }
    ]
  },
  { path: '/profile',
    component: ProfileHome,
    children: [
      // { path: '', name: 'userprofile', component: UserProfile },
      // { path: 'user/:username', name: 'userprofile', component: UserProfile },
      { path: '/:username', name: 'userprofile', component: UserProfile },
      { path: 'edit', name: 'editprofile', component: EditProfile },
      { path: 'followers/:username', name: 'followers', component: Followers },
      { path: 'following/:username', name: 'following', component: Following },
      { path: 'post/:post_id', name: 'post', component: Post }
    ]
  },
  {path: '*', redirect:'/' }
]
