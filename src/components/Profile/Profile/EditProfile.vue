<template>
  <!-- The Main Div -->
  <div class="edit-profile-main">

    <!-- The Header Div -->
    <!-- isLoading is vuex variable used for page reload -->
    <div class="edit-fixed-header" v-if="!isLoading">
      <div class="edit-header-items">
        <span>&nbsp;&nbsp;</span>
        <span @click="goBack">
          <img src="../../../assets/svg/backarrow.svg">
        </span>
        <span
          @click="selectProfile"
          :class="{active: profileView}">
            update profile
        </span>
        <span
          @click="selectLogin"
          :class="{active: !profileView}">
            update login
        </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>

    <!-- The Loading Div -->
    <!-- loading variable => For the updating the kast -->
    <!-- kast-loader class from kast component -->
    <div v-if="loading" class="kast-loader"></div>

    <!-- The v-else to the Loading Div Above -->
    <div>
      <div v-if="profileView" class="edit-form">
        <div class="avatar-form">
            <img :src="profileURL"/>
        </div>

        <div class="upload">
          <p class="upload-button" @click="onPickPhoto">upload photo</p>
          <input
            type="file"
            style="display: none;"
            ref="photoInput"
            accept="image/*"
            @change="onPhotoPicked">
        </div>

        <br/><br/><br/>

        <form>
            <div class="edit-item">
              <label for="name">name</label><span>&nbsp;({{nameCharsLeft()}})</span>
              <input
                type="text"
                id="name"
                maxlength="25"
                placeholder="your display name, max 25 chars"
                @input="$v.name.$touch()"
                v-model="name">
            </div>
            <br>
            <div class="edit-item">
              <label for="about">about you</label><span>&nbsp;({{aboutCharsLeft()}})</span>
              <textarea
                type="text"
                name="about"
                id="about"
                maxlength="200"
                placeholder="tell us about your style, max 200 chars"
                @input="$v.about.$touch()"
                v-model="about">
              </textarea>
            </div>
            <br>
            <button
              class="mdl-button mdl-button--raised mdl-button--colored"
              :disabled="profileFormInvalid"
              @click.prevent="submitProfile">
              update
            </button>
        </form>
        <hr>
        <div>
          <span @click="confirmDelete=!confirmDelete" style="cursor: pointer;">
            <img style="padding-bottom: 5px;" src="../../../assets/svg/delete.svg">
          </span>
          <span
            style="cursor: pointer;font-weight:500;font-size:15px;"
            @click.prevent="confirmDelete=!confirmDelete">
            delete account
          </span>
          <div class="edit-item" v-if="confirmDelete">
            <p>Delete your account? There is no going back. Enter your password below to confirm delete.</p>
            <br/>
            <label for="confirmdelete">password</label>
            <input
              type="password"
              id="confirmdelete"
              v-model="deletePasswordInput">
            <br/><br/>
            <button
              class="mdl-button mdl-button--raised mdl-button--colored"
              :disabled="deleteFormInvalid"
              @click.prevent="submitDelete">
              delete
            </button>
          </div>
        </div>
      </div>

      <form v-if="!profileView" class="edit-form">
        <p
          class="update-button"
          v-if="!updateEmail"
          @click.prevent="showEmail">
          email
          <img src="../../../assets/svg/toggle_off.svg">

        </p>
        <p
          class="update-button"
          v-if="updateEmail"
          @click.prevent="hideEmail">
          email
          <img src="../../../assets/svg/toggle_on.svg">
        </p>

        <div v-if="updateEmail">
          <div class="edit-item">
            <label for="currentemail">current email</label>
            <input
              type="email"
              :placeholder="userData ? userData.email : '' "
              disabled
              id="currentemail">
          </div>
          <br/>
          <div class="edit-item">
            <label for="newemail">new email</label>
            <input
              type="email"
              id="newemail"
              @blur="$v.newEmail.$touch()"
              v-model.lazy="newEmail">
              <p v-if="!$v.newEmail.email"> enter valid email</p>
              <p v-if="!$v.newEmail.isUnique"> email already used</p>
          </div>
        </div>

        <br/>

        <p
          v-if="!updatePassword"
          class="update-button"
          @click.prevent="showPassword">
          password
          <img src="../../../assets/svg/toggle_off.svg">
        </p>
        <p
          v-if="updatePassword"
          class="update-button"
          @click.prevent="hidePassword">
          password
          <img src="../../../assets/svg/toggle_on.svg">
        </p>

        <div v-if="updatePassword">
          <div class="edit-item">
            <label for="newpassword">new password</label>
            <input
              type="password"
              id="newpassword"
              @input="$v.newPassword.$touch()"
              v-model="newPassword">
              <p v-if="!$v.newPassword.minLen && $v.newPassword.$dirty"> min 6 characters</p>
          </div>
          <br>
          <div class="edit-item">
            <label for="confirmpassword">confirm new password</label>
            <input
              type="password"
              id="confirmpassword"
              @input="$v.confirmPassword.$touch()"
              v-model="confirmPassword">
              <p v-if="!$v.confirmPassword.sameAs && $v.confirmPassword.$dirty"> passwords don&#39;t match </p>
          </div>
        </div>

        <br/><hr/><br/>

        <div class="edit-item">
          <label for="currentpassword">enter current password to confirm updates</label>
          <input
            type="password"
            id="currentpassword"
            @input="$v.currentPassword.$touch()"
            v-model="currentPassword">
            <p v-if="!$v.currentPassword.required && $v.currentPassword.$dirty"> current password required</p>
        </div>
        <br/>
          <button
            class="mdl-button mdl-button--raised mdl-button--colored"
            :disabled="loginFormInvalid"
            @click.prevent="submitLogin">
            update
          </button>
      </form>
    </div>

    <!-- HERE -->

    <br/>

  </div>
</template>

<script>
import { required, email, minLength, sameAs, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      profileView: true,
      about: '',
      name: '',
      updateEmail: false,
      updatePassword: false,
      newEmail: '',
      newPassword: '',
      confirmPassword: '',
      currentPassword: '',
      photo: '',
      profileURL: '',
      confirmDelete: false,
      deletePasswordInput: '',
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      updateUser: 'updateUser',
      deleteUser: 'deleteUser'
    }),
    getProfileInfo () {
      // the api call 'http://localhost:5000/' + requestingUser + '/user/' + targetUser
      // in this case the requestingUser is always the targetUser
      //b/c a user can only edit her own profile page so i'm just gonna name both parties 'user'
      const user = localStorage.getItem('username')
      axios.get('http://localhost:5000/' + user + '/user/' + user)
        .then(res => {
          if (res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if (res.data.skStatus === 'Pass') {
            console.log(res.data)
            this.profileURL = res.data.user.url
            this.name = res.data.user.name ? res.data.user.name : ''
            this.about = res.data.user.about ? res.data.user.about : ''
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    onPickPhoto () {
      this.$refs.photoInput.click()
    },
    onPhotoPicked (event) {
        const files = event.target.files
        console.log(files)
        // let filename  = files[0].filename
        const fileReader = new FileReader()
        fileReader.addEventListener('load', ()=> {
          this.profileURL = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.photo = files[0]
    },
    selectProfile () {
      this.profileView = true
    },
    selectLogin () {
      this.profileView = false
    },
    showEmail () {
      this.updateEmail = true
    },
    hideEmail () {
      this.updateEmail = false
      this.newEmail = ''
    },
    showPassword () {
      this.updatePassword = true
    },
    hidePassword () {
      this.updatePassword = false
      this.newPassword = ''
      this.confirmPassword = ''
    },
    submitProfile () {
      // NOTEE! I am not sending this via Vuex because this upload
      // Does not impact the state...If I ever need to store any of
      // The below items in the state...then I may need to use Vuex
      this.loading = true
      const token = localStorage.getItem('token')
      const fd = new FormData()
      fd.append('photo', this.photo)
      fd.append('name', this.name)
      fd.append('about', this.about)
      console.log(fd)
      axios.post('http://localhost:5000/user/profile/update', fd, {
        headers:
          { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if (res.data.skStatus === 'Pass') {
            this.$router.push({ name: 'updates' })
            console.log(res)
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    submitLogin () {
      this.loading = true
      const userData = {
        auth_id: this.userData.auth_id,
        currentEmail: this.userData.email,
        newEmail: this.newEmail !== '' ? this.newEmail : this.userData.email,
        currentPassword: this.currentPassword,
        newPassword: this.newPassword !== '' ? this.newPassword : this.currentPassword
      }
      console.log(userData)
      this.updateUser(userData)
    },
    submitDelete () {
      // NOTEE! I am  sending this via Vuex although I'm not changing the
      // the state because I want to leverage the client id and client secret
      // already referenced in the action.js file
      this.loading = true
      const userData = {
        auth_id: this.userData.auth_id,
        email: this.userData.email,
        password: this.deletePasswordInput
      }
      console.log(userData)
      this.deleteUser(userData)
    },
    aboutCharsLeft () {
      return this.$v.about.$params.maxLen.max - this.about.length
    },
    nameCharsLeft () {
      return this.$v.name.$params.maxLen.max - this.name.length
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters({
      userData: 'userData',
      isLoading: 'loading'
    }),
    profileFormInvalid () {
      return ((this.about === '') && (this.name === '') && (this.photo === ''))
    },
    loginFormInvalid () {
      return ((this.$v.$invalid) || ((this.newEmail === '') && (this.newPassword === '')))
    },
    deleteFormInvalid () {
      return (this.deletePasswordInput.length === 0)
    }
  },
  validations: {
    name: {
      maxLen: maxLength(25)
    },
    about: {
      maxLen: maxLength(200)
    },
    newEmail: {
      email,
      isUnique (value) {
        // standalone validator ideally should not assume a field is required
        if (value === '') return true
        const fd = new FormData()
        fd.append('email', value)
        return axios.post('http://localhost:5001/email/check', fd)
          .then(res => {
            // return false if res.data is true
            // return true if res.data is false
            return !res.data
          })
      }
    },
    newPassword: {
      minLen: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs('newPassword')
    },
    currentPassword: {
      required
    }
  },
  beforeMount () {
    this.getProfileInfo()
  },
  activated () {
    this.loading = false
    document.querySelector('.mdl-layout__content').scrollTop = 0
  },
  beforeRouteEnter (to, from, next) {
    const now = (new Date()).getTime()
    const expDate = (new Date(localStorage.getItem('expirationDate'))).getTime()
    const noToken = !localStorage.getItem('token')
    if ( (noToken) || (now >= expDate) ) {
      next('/login')
    } else {
      next()
    }
  }
}
</script>

<style>
.edit-profile-main{
  position: relative;
}
.edit-fixed-header {
  position: fixed;
  top: 0px;
  background-color: #ededed;
  margin-top: 56px;
  height: 45px;
  width: 100%;
}
.edit-header-items{
  margin-right: auto;
  margin-left: auto;
  margin-top: 17px;
  max-width: 500px;
  justify-content: space-between;
  display: flex;
}
.edit-header-items span {
  cursor: pointer;
  font-size: 15px;
}
.active {
  color: #ff0800;
  font-weight: 500;
}
.edit-form{
  padding: 0px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 70px;
  max-width: 500px;
}
.avatar-form > img {
  float:left;
  border: 2px solid #4db6ac;
  border-radius: 50%;
  height: 75px;
  width: 75px;
  padding: 2px;
  margin-left: 5px;
}
.upload  {
  font-size: 15px;
  padding-top: 15px;
  padding-left: 80px;
  padding-right: 10px;
}
.upload-button{
  padding-top: 10px;
  padding-left: 15px;
  max-width: 100px;
  font-size: 15px;
  cursor: pointer;
  color: #ff0800;
  font-weight: 450;
}
.update-button{
  max-width: 180px;
  font-size: 15px;
  cursor: pointer;
  color: #137E8D;
  font-weight: 450;
}
.edit-item > label {
  font-size: 16px;
}
.edit-item > p {
  margin: 0px;
  padding: 0px;
  color: #ff0800;
}
.edit-item > input {
  width:100%;
  height: 40px;
  padding: 10px 15px;
  box-sizing: border-box;
  /* border: 2px solid rgb(245,0,87, .15); */
  border: 2px solid rgb(176,176,176, .35);
  border-radius: 5px;
  background-color: rgb(237,237,237, .4);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
}
.edit-item > textarea {
  width:100%;
  padding: 10px 15px;
  box-sizing: border-box;
  /* border: 2px solid rgb(245,0,87, .15); */
  border: 2px solid rgb(176,176,176, .35);
  border-radius: 5px;
  background-color: rgb(237,237,237, .4);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
}
</style>
