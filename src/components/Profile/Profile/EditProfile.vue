<template>
  <div class="edit-profile-main">
    <div class="edit-fixed-header">
      <div class="edit-header-items">
        <span>&nbsp;&nbsp;</span>
        <span @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/>
          </svg>
        </span>
        <span
          @click="selectProfile"
          :class="{active: profileView}">
            PROFILE UPDATES
        </span>
        <span
          @click="selectLogin"
          :class="{active: !profileView}">
            LOGIN UPDATES
        </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>

    <div v-if="profileView" class="edit-form">
      <div class="avatar-form">
          <img :src="profileURL"/>
      </div>

      <div class="upload">
        <button class="mdl-button mdl-js-button mdl-button--primary" @click="onPickPhoto"> Upload Photo</button>
        <input
          type="file"
          style="display: none;"
          ref="photoInput"
          accept="image/*"
          @change="onPhotoPicked">
      </div>

      <br>
      <br>
      <br>

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

        <hr>

          <button
            class="mdl-button mdl-button--raised mdl-button--colored"
            :disabled="profileFormInvalid"
            @click.prevent="submitProfile">
            update
          </button>
      </form>
    </div>

    <form v-if="!profileView" class="edit-form">
      <button
        v-if="!updateEmail"
        class="mdl-button mdl-button--primary"
        @click.prevent="showEmail">
        update email
      </button>
      <button
        v-if="updateEmail"
        class="mdl-button mdl-button--primary"
        @click.prevent="hideEmail">
        cancel email update
      </button>

      <br>
      <br>
      <div v-if="updateEmail">
        <div class="edit-item">
          <label for="currentemail">current email</label>
          <input
            type="email"
            :placeholder="userData ? userData.email : '' "
            disabled
            id="currentemail">
        </div>
        <br>
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

      <br>
      <br>

      <button
        v-if="!updatePassword"
        class="mdl-button mdl-button--primary"
        @click.prevent="showPassword">
        update password
      </button>
      <button
        v-if="updatePassword"
        class="mdl-button mdl-button--primary"
        @click.prevent="hidePassword">
        cancel password update
      </button>

      <br>
      <br>

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

      <br>
      <hr>
      <br>

      <div class="edit-item">
        <label for="currentpassword">enter current password to confirm updates</label>
        <input
          type="password"
          id="currentpassword"
          @input="$v.currentPassword.$touch()"
          v-model="currentPassword">
          <p v-if="!$v.currentPassword.required && $v.currentPassword.$dirty"> current password required</p>
      </div>

      <br>

        <button
          class="mdl-button mdl-button--raised mdl-button--colored"
          :disabled="loginFormInvalid"
          @click.prevent="submitLogin">
          update
        </button>
    </form>

    <br>

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
      profileURL:'https://stroseschool.stroselions.net/wp-content/uploads/2018/04/profile-blank-reva.png'
    }
  },
  methods: {
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
    ...mapActions({
      updateUser: 'updateUser'
    }),
    submitProfile () {
      // NOTEE! I am not sending this via Vuex because this upload
      // Does not impact the state...If I ever need to store any of
      // The below items in the state...then I may need to use Vuex
      const token = localStorage.getItem('token')
      const fd = new FormData()
      fd.append('photo', this.photo, this.photo.name)
      fd.append('name', this.name)
      fd.append('about', this.about)
      console.log(fd)
      axios.post('http://localhost:5000/user/profile/update', fd, {
        headers:
          {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
          console.log(res)
        })
        .catch(error => console.log(error))
    },
    submitLogin () {
      const userData = {
        auth_id: this.userData.auth_id,
        currentEmail: this.userData.email,
        newEmail: this.newEmail !== '' ? this.newEmail : this.userData.email,
        currentPassword: this.currentPassword,
        newPassword: this.newPassword !== '' ? this.newPassword : this.currentPassword
      }
      console.log(userData)
      // this.signUp(updateData)
      this.updateUser(userData)
    },
    aboutCharsLeft () {
      return this.$v.about.$params.maxLen.max - this.about.length
    },
    nameCharsLeft() {
      return this.$v.name.$params.maxLen.max - this.name.length
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters({
      userData: 'userData'
    }),
    profileFormInvalid () {
      return ((this.about === '') && (this.name === '') && (this.photo === ''))
    },
    loginFormInvalid () {
      return ((this.$v.$invalid) || ((this.newEmail === '') && (this.newPassword === '')))
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
  }
}
</script>

<style>
.edit-profile-main{
  position: relative;
  /* padding: 20px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 500px; */
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
  border: 1px solid #4db6ac;
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

.edit-item > label {
  font-size: 16px;
}
.edit-item > p {
  margin: 0px;
  padding: 0px;
  color: #f50057;
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
.active {
  color: #f50057;
  font-weight: 500;
}

</style>
