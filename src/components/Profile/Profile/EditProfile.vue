<template>
  <div class="edit-profile-main">
    <div class="edit-heading">
      <h5>Update Login Info</h5>
    </div>
    <br>
    <form class="edit-form" action="#">

      <span
        v-if="!updateEmail"
        @click="showEmail">Update Email</span>
      <span
        style="color: #f50057;"
        v-else
        @click="hideEmail">Cancel Email Update</span>

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

      <span
        v-if="!updatePassword"
        @click="showPassword">Update Password</span>
      <span
        style="color: #f50057;"
        v-else
        @click="hidePassword">Cancel Password Update</span>

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
          :disabled="formInvalid"
          @click.prevent="onSubmit">
          update
        </button>

    </form>

    <div class="edit-heading">
      <h5>Update Profile Info</h5>
    </div>
    <br>

  </div>
</template>

<script>
import {required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      updateEmail: false,
      updatePassword: false,
      newEmail: '',
      newPassword:'',
      confirmPassword: '',
      currentPassword: ''
    }
  },
  methods: {
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
    onSubmit () {
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
    }
  },
  computed: {
    ...mapGetters({
      userData: 'userData'
    }),
    formInvalid () {
      return ((this.$v.$invalid) || ((this.newEmail === '') && (this.newPassword === '')))
    }
  },
  validations: {
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
  padding: 20px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
}
.edit-heading{
  text-align: center;
}
.edit-form{
  padding: 0px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 0px;
  max-width: 500px;
}
.edit-form > span {
  color: gray;
  cursor: pointer;
  font-weight: 500;
  border: 3px solid #E8E8E8;
  padding: 5px;
  border-radius: 7px;
}
.edit-item > label {
  font-size: 16px;
}
.edit-item > p {
  margin: 0px;
  padding: 0px;
  color: gray;
}
.edit-item > input  {
  width:100%;
  height: 40px;
  padding: 10px 15px;
  box-sizing: border-box;
  border: 2px solid rgb(245,0,87, .15);
  border-radius: 5px;
  background-color: rgb(237,237,237, .4);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
}
</style>
