<template>
  <div class="sk-signup-main">
    <div class="signup-heading">
      <h4>Signup</h4>
      <span>already have an account?</span>
      <router-link tag="span" :to="{ name: 'login'}" style="color: #f50057; cursor: pointer;"> Login</router-link>
    </div>
    <br>
    <form class="signup-form" action="#" >
      <div class="signup-item">
        <label for="username">username</label>
        <input
          type="text"
          id="username"
          @blur="$v.username.$touch()"
          v-model.lazy="username">
          <p v-if="!$v.username.required && $v.username.$dirty"> username required</p>
          <p v-if="!$v.username.maxLen && $v.username.$dirty"> max 12 characters</p>
          <p v-if="!$v.username.isUnique"> name already taken</p>
      </div>
      <br>
      <div class="signup-item">
        <label for="email">email</label>
        <input
          type="email"
          id="email"
          @blur="$v.email.$touch()"
          v-model.lazy="email">
          <p v-if="!$v.email.email"> enter valid email</p>
          <p v-if="!$v.email.required && $v.email.$dirty"> email required</p>
          <p v-if="!$v.email.isUnique"> email already used</p>
      </div>
      <br>
      <div class="signup-item">
        <label for="password">password</label>
        <input
          type="password"
          id="password"
          @input="$v.password.$touch()"
          v-model="password">
          <p v-if="!$v.password.required && $v.password.$dirty"> password required</p>
          <p v-if="!$v.password.minLen && $v.password.$dirty"> min 6 characters</p>
      </div>
      <br>
      <div class="signup-item">
        <label for="confirm-password">confirm password</label>
        <input
          type="password"
          id="confirm-passord"
          @input="$v.confirmPassword.$touch()"
          v-model="confirmPassword">
          <p v-if="!$v.confirmPassword.sameAs && $v.confirmPassword.$dirty"> passwords don&#39;t match </p>
      </div>
      <br>
      <div>
        <button
          class="mdl-button mdl-button--raised mdl-button--colored"
          :disabled="$v.$invalid"
          @click.prevent="onSubmit">
          signup
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  validations: {
    username: {
      required,
      maxLen: maxLength(12),
      isUnique (value) {
        // standalone validator ideally should not assume a field is required
        if (value === '') return true
        const fd = new FormData()
        fd.append('username', value)
        return axios.post('http://localhost:5001/username/check', fd)
          .then(res => {
            // return false if res.data is true
            // return true if res.data is false
            return !res.data
          })
      }
    },
    email: {
      required,
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
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs('password')
    }
  }
}
</script>

<style>
.sk-signup-main{
  padding: 20px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
}
.signup-heading{
  text-align: center;
}
.signup-heading > h4{
  padding-top: 0px;
  margin-top: 0px;
}
.signup-heading > span {
  font-size: 15px;
}
.signup-form{
  padding: 0px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 0px;
  max-width: 500px;
}
.signup-item > label {
  font-size: 16px;
}
.signup-item > p {
  margin: 0px;
  padding: 0px;
  color: gray;
}
.signup-item > input  {
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
