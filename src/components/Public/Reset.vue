<template>
  <div class="sk-auto-side-margin sk-main-padding">
    <div class="sk-auth-heading">
      <h4>reset password</h4>
    </div>
    <div v-if="showError" class="sk-error-msg">
      <span>link expired or incorrect email entered</span>
    </div>
    <div v-if="inProgress" class="sk-loader"></div>
    <br/>

    <form v-if="!passwordReset" class="sk-form" action="#" >
      <div class="sk-form-item">
        <label for="email">email</label>
        <input
          type="email"
          id="email"
          @blur="$v.email.$touch()"
          v-model.lazy="email">
          <p v-if="!$v.email.email"> enter valid email</p>
          <p v-if="!$v.email.required && $v.email.$dirty"> email required</p>
      </div>
      <br>
      <div class="sk-form-item">
        <label for="password">new password</label>
        <input
          type="password"
          id="password"
          @input="$v.password.$touch()"
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
          send
        </button>
      </div>
    </form>
    <div v-if="passwordReset" class="reset-heading">
      <h6>password reset complete</h6>
      <router-link tag="span" :to="{ name: 'login'}" style="color: #137E8D; cursor: pointer;">&nbsp;login page</router-link>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      passwordReset: false,
      inProgress: false,
      showError: false,
    }
  },
  methods: {
    onSubmit () {
      this.inProgress = true
      this.passwordReset = false
      const fd = new FormData()
      fd.append('email', this.email)
      fd.append('password', this.password)
      fd.append('token', this.$route.query.makuli)
      axios.post('http://localhost:5001/password/reset', fd)
        .then(res => {
          if (res.data.authStatus === 'Fail') {
            this.showError = true
            this.inProgress = false
            document.querySelector('.mdl-layout__content').scrollTop = 0
          }
          if (res.data.authStatus === 'Pass') {
            console.log(res.data)
            this.passwordReset = true
            this.inProgress = false
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    }
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
  },
  deactivated () {
    this.email = '',
    this.password = '',
    this.confirmPassword = '',
    this.showError = false,
    this.inProgress = false
  },
  validations: {
    email: {
      required,
      email
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

</style>
