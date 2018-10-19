<template>
  <!-- Start Enclosing Div -->
  <div id="app" class="sk-layout mdl-layout mdl-js-layout mdl-layout--drawer mdl-layout--fixed-header">
    <!-- Start Header -->
      <header class="mdl-layout__header mdl-color--white mdl-color-text--black">
        <div class="mdl-layout__header-row">
          <router-link tag="span" class="mdl-layout-title" style="cursor:pointer;" :to="{ name: 'home'}">
            StyleKast
          </router-link>
          <div class="mdl-layout-spacer"></div>

          <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
            <i class="material-icons">more_vert</i>
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
          <router-link :to="{name: 'feed'}" class="mdl-navigation__link"><i class="material-icons" role="presentation">style</i>Style Feed</router-link>
          <router-link :to="{name: 'kast'}" class="mdl-navigation__link"><i class="material-icons" role="presentation">record_voice_over</i>Kast</router-link>
          <router-link :to="{name: 'people'}" class="mdl-navigation__link"><i class="material-icons" role="presentation">search</i>Search</router-link>
          <router-link :to="{ name: 'userprofile', params: { username: username }}" class="mdl-navigation__link"><i class="material-icons" role="presentation">person</i>Profile</router-link>
        </nav>

      </div>
      <!-- End Drawer -->

      <!-- Start Main -->
      <main class="mdl-layout__content mdl-color--white">
        <!-- #TODO Need Use Appropriate Grid For Each Top Level Component...Home/Kast/Search/Profile-->
        <!-- <div class="mdl-grid sk-content"> -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        <!-- </div> -->
      </main>
      <!-- End Main -->

      <!-- Start Footer -->
      <footer class="mdl-mini-footer">
        <div class="social-icons">
          <router-link :to="{name: 'feed'}" class="mobnav">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </router-link>
          <router-link :to="{name: 'kast'}" class="mobnav">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3.2"/>
                  <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
          </router-link>
          <router-link :to="{name: 'people'}" class="mobnav">
              <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
          </router-link>
          <router-link :to="{ name: 'userprofile', params: { username: username }}" class="mobnav">
          <!-- <router-link to="/profile" class="mobnav"> -->
              <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
          </router-link>
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
  background-color: #f50057;
  color: #FFFFFF;
}

.sk-navigation .mdl-navigation__link .material-icons {
  font-size: 24px;
  /* color: rgba(255, 255, 255, 0.56); */
  /*color: rgba(255, 255, 255, 1);*/
  color: black;
  margin-right: 32px;
}

/* .sk-content {
  max-width: 920px; /This is related to the mdl-grid that I commented out above
} */

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

.mobnav svg {
  margin: 0;
  position: absolute;  /* 2 */
  top: 50%;            /* 3 */
  transform: translate(0, -50%); /* 4 */
}

.mobnav svg:hover {
      fill: #f50057 !important;
    }

.router-link-active {
  color: #f50057 !important;
}

.router-link-active svg {
  fill: #F50057;
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
