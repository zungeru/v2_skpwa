<template>
  <!-- Start Enclosing Div -->
  <div id="app" class="sk-layout mdl-layout mdl-js-layout mdl-layout--drawer mdl-layout--fixed-header">
    <!-- Start Header -->
      <header class="mdl-layout__header mdl-color--white mdl-color-text--black">
        <div class="mdl-layout__header-row">
          <router-link tag="span" class="mdl-layout-title" style="cursor:pointer;" :to="{ name: 'home'}">
            styleKast
          </router-link>
          <div class="mdl-layout-spacer"></div>

          <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
            <img src="./assets/svg/vertical.svg">
          </button>
          <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
            <router-link tag="li" class="mdl-menu__item header_menu" :to="{ name: 'home'}">Home</router-link>
            <router-link tag="li" class="mdl-menu__item header_menu" :to="{ name: 'about'}">About</router-link>
            <router-link v-if="!auth" tag="li" class="mdl-menu__item header_menu" :to="{ name: 'login'}">Log In</router-link>
            <li  v-if="auth" @click="onLogout" class="mdl-menu__item header_menu">Log Out</li>
          </ul>
        </div>
      </header>
      <!-- End Header -->

      <!-- Start Drawer -->
      <div class="sk-drawer mdl-layout__drawer mdl-color--white mdl-color-text--pink-A400">
        <header>
          <div class="avatar-container">
            <div class="image"></div>
          </div>
          <div class="mdl-layout-spacer"></div>

          <div class="contact-info">
            <div class="name">Style Sprinter</div>
          </div>
        </header>

        <nav class="sk-navigation mdl-navigation mdl-color--white mdl-color-text--black">
          <router-link :to="{name: 'feed'}"  class="mdl-navigation__link">
            <span @click="updateRoute('feed')">
              <img v-if="currentRoute==='feed'" src="./assets/svg/home_active.svg">
              <img v-else src="./assets/svg/home.svg">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;Style Feed</span>
            </span>
          </router-link>

          <router-link :to="{name: 'kast'}" class="mdl-navigation__link">
            <span @click="updateRoute('kast')">
              <img v-if="currentRoute==='kast'" src="./assets/svg/camera_active.svg">
              <img v-else src="./assets/svg/camera.svg">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;Kast</span>
            </span>
          </router-link>

          <router-link :to="{name: 'people'}" class="mdl-navigation__link">
            <span @click="updateRoute('people')">
              <img v-if="currentRoute==='people'" src="./assets/svg/search_active.svg">
              <img v-else src="./assets/svg/search.svg">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;Search</span>
            </span>
          </router-link>

          <router-link :to="{ name: 'userprofile', params: { username: username }}" class="mdl-navigation__link">
            <span @click="updateRoute('userprofile')">
              <img v-if="currentRoute==='userprofile'" src="./assets/svg/profile_active.svg">
              <img v-else src="./assets/svg/profile.svg">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;Profile</span>
            </span>
          </router-link>
        </nav>

      </div>
      <!-- End Drawer -->

      <!-- Start Main -->
      <main class="mdl-layout__content mdl-color--white">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </main>
      <!-- End Main -->

      <!-- Start Footer -->
      <footer class="mdl-mini-footer">
        <div class="social-icons">
          <span @click="updateRoute('feed')">
            <router-link :to="{name: 'feed'}" class="mobnav">
                <img v-if="currentRoute==='feed'" src="./assets/svg/home_active.svg">
                <img v-else  src="./assets/svg/home.svg">
            </router-link>
          </span>
          <span @click="updateRoute('kast')">
            <router-link :to="{name: 'kast'}" class="mobnav">
                <img v-if="currentRoute==='kast'" src="./assets/svg/camera_active.svg">
                <img v-else src="./assets/svg/camera.svg">
            </router-link>
          </span>
          <span @click="updateRoute('people')">
            <router-link :to="{name: 'people'}" class="mobnav">
                <img v-if="currentRoute==='people'" src="./assets/svg/search_active.svg">
                <img v-else src="./assets/svg/search.svg">
            </router-link>
          </span>
          <span @click="updateRoute('userprofile')">
            <router-link :to="{ name: 'userprofile', params: { username: username }}" class="mobnav">
                <img v-if="currentRoute==='userprofile'" src="./assets/svg/profile_active.svg">
                <img v-else src="./assets/svg/profile.svg">
            </router-link>
          </span>
        </div>
      </footer>
      <!-- End Footer -->
  </div>
  <!-- End Enclosing Div -->

</template>

<script>
// require('material-design-lite')
import 'material-design-lite'

function close () {
  let d = document.querySelector('.mdl-layout')
  d.MaterialLayout.toggleDrawer()
}

window.onload = function () {
  document.querySelector('.mdl-layout__drawer').addEventListener('click', close)
}

export default {
  name: 'App',
  data () {
    return {
      currentRoute: this.$router.currentRoute.name
    }
  },
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    },
    username () {
      return !this.$store.getters.userData ? 'false' : this.$store.getters.userData.username
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logOut')
    },
    updateRoute (route) {
      this.currentRoute = route
      console.log(route)
    }
  },
  created () {
    this.$store.dispatch('tryAutoLogIn')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://code.getmdl.io/1.3.0/material.pink-blue.min.css');
/* @import url('https://fonts.googleapis.com/css?family=Lato'); */

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.avatar-container {
  position: relative;
  border: 2px solid black;
  border-radius: 50%;
  height: 90px;
  padding: 2px;
  width: 90px;
  margin: 20px auto;
}

.avatar-container .image {
  background-image: url('http://cdn2.stylecraze.com/wp-content/uploads/2017/06/Chest-Covering-Hijab-Style.jpg');
  background-size: contain;
  border-radius: 50%;
  height: 100%;
  width: 100%;
}

.contact-info {
     margin: 0 20px;
     padding-bottom: 20px;
     border-bottom: 1.5px solid #F9F9F9;
     text-align: center;
   }

 .contact-info .name {
     font-weight: 500;
 }

.sk-layout .mdl-layout__header .mdl-layout__drawer-button {
  /* color: rgba(0, 0, 0, 0.54); */
  /* Changed the above so that the memu bar shows in white again */
  /* color: rgba(0, 0, 0.54, 0.54); This was not working with Firefox so changed it to white*/
  color: black;
}

.header_menu {
  color: #f50057;
}

.mdl-layout__drawer .avatar {
  margin-bottom: 16px;
}
.sk-drawer {
  border: none;
}

/* iOS Safari specific workaround */
.sk-drawer .mdl-menu__container {
  z-index: -1;
}
.sk-drawer .sk-navigation {
  z-index: -2;
}
/* END iOS Safari specific workaround */

.sk-drawer .mdl-menu .mdl-menu__item {
  display: flex;
  align-items: center;
}

.sk-navigation {
  flex-grow: 1;
}

.sk-layout .sk-navigation .mdl-navigation__link {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  /* color: rgba(255, 255, 255, 0.56); */
  /*color: rgba(255, 255, 255, 1);*/
  color: black;
  font-weight: 500;
}

.sk-layout .sk-navigation .mdl-navigation__link:hover {
  /* background-color: #f50057; */
  color: #FFFFFF;
}

.sk-navigation .mdl-navigation__link {
  /* font-size: 24px; */
  /* color: rgba(255, 255, 255, 0.56); */
  /*color: rgba(255, 255, 255, 1);*/
  color: black;
  margin-right: 32px;
}

.mdl-mini-footer{
  padding-left: 0px;
  padding-top: 10px;
  display: none;
}

.social-icons {
  background-color: white;
  position: fixed;
  bottom: 0%;
  width: 100%;
}

.mobnav {
  position: relative;  /* 1 */
  width: 22.5%;
  height: 35px;
  display: inline-block;
  text-align: center;
}

.mobnav img {
  margin: 0;
  position: absolute;  /* 2 */
  top: 50%;            /* 3 */
  transform: translate(0, -50%); /* 4 */
}

@media (max-width: 580px) {
  /* make title smaller to fit on screen */
  .mdl-layout-title {
      font-size: 18px;
    }

  .mdl-mini-footer{
    display: block;
  }

  .mdl-layout .mdl-layout__drawer-button {
    display: none;
  }

  .mdl-layout__header-row {
    padding: 15px;
  }
}
</style>
