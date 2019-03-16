<template>
  <div class="sk-main-padding auto-side-margin">
    <div class="auth-heading">
      <h4>signup</h4>
      <span>already have an account?</span>
      <router-link tag="span" :to="{ name: 'login'}" style="color: #ff0800; cursor: pointer;">&nbsp;login</router-link>
    </div>
    <br>
    <form class="sk-form" action="#" >
      <div class="sk-form-item">
        <label for="username">username</label>
        <input
          type="text"
          id="username"
          maxlength="15"
          placeholder="max 15 chars"
          @blur="usernameBlur"
          @input="usernameInput"
          v-model="username">
          <p v-if="!$v.username.required && $v.username.$dirty"> username required</p>
          <p v-if="!$v.username.maxLen && $v.username.$dirty"> max 15 characters</p>
          <p v-if="!$v.username.isUnique && usernameCheck"> name already taken</p>
      </div>
      <br>
      <div class="sk-form-item">
        <label for="email">email</label>
        <input
          type="email"
          id="email"
          @blur="emailBlur"
          @input="emailInput"
          v-model="email">
          <p v-if="!$v.email.email"> enter valid email</p>
          <p v-if="!$v.email.required && $v.email.$dirty"> email required</p>
          <p v-if="!$v.email.isUnique && emailCheck"> email already used</p>
      </div>
      <br>
      <div class="sk-form-item">
        <label for="password">password</label>
        <input
          type="password"
          id="password"
          @input=""
          v-model="password">
          <p v-if="!$v.password.required && $v.password.$dirty"> password required</p>
          <p v-if="!$v.password.minLen && $v.password.$dirty"> min 6 characters</p>
      </div>
      <br>
      <div class="sk-form-item">
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
import { mapActions } from 'vuex'
// import debounce from 'lodash/debounce'

export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      usernameCheck: false,
      emailCheck: false

    }
  },
  methods: {
    ...mapActions({
      signUp: 'signUp'
    }),
    usernameBlur () {
      this.usernameCheck = true
      this.$v.username.$touch()
    },
    usernameInput () {
      this.usernameCheck = false
    },
    emailBlur () {
      this.emailCheck = true
      this.$v.email.$touch()
    },
    emailInput () {
      this.emailCheck = false
    },
    onSubmit () {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.signUp(userData)
    }
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
  },
  deactivated () {
    this.username = ''
    this.email = ''
    this.password = ''
    this.confirmPassword = ''
  },
  validations: {
    username: {
      required,
      maxLen: maxLength(15),
      isUnique (value, vm) {
        // standalone validator ideally should not assume a field is required
        if (value === '') return true
        if (vm.usernameCheck === false) {
          return true
        } else {
          console.log('Calling Server')
          const fd = new FormData()
          fd.append('username', value)
          return axios.post('http://localhost:5001/username/check', fd)
            .then(res => {
              // return false if res.data is true
              // return true if res.data is false
              return !res.data
            })
        }
      }
    },
    email: {
      required,
      email,
      isUnique (value, vm) {
        // standalone validator ideally should not assume a field is required
        if (value === '') return true
        if (vm.emailCheck === false) {
          return true
        } else {
          console.log('Calling Server')
          const fd = new FormData()
          fd.append('email', value)
          return axios.post('http://localhost:5001/email/check', fd)
            .then(res => {
              // return false if res.data is true
              // return true if res.data is false
              // vm.usernameCheck = true
              return !res.data
            })
        }
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
