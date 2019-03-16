<template>
  <div class="sk-main-padding auto-side-margin">
    <div class="auth-heading">
      <h4>login</h4>
      <span>don't have an account?</span>
      <router-link tag="span" :to="{ name: 'signup'}" style="color: #ff0800; cursor: pointer;">&nbsp;signup</router-link>
    </div>
    <br/>
    <div v-if="logInIss" class="error-msg">
      <span>invalid username or password</span>
    </div>
    <br/>
    <form class="sk-form" action="#" >
      <div class="sk-form-item">
        <label for="email">email</label>
        <input
          type="email"
          id="email"
          @blur="$v.email.$touch()"
          v-model="email">
          <p v-if="!$v.email.email"> enter valid email</p>
          <p v-if="!$v.email.required && $v.email.$dirty"> email required</p>
      </div>
      <br>
      <div class="sk-form-item">
        <label for="password">password</label>
        <input
          type="password"
          id="password"
          @blur="$v.password.$touch()"
          v-model="password">
      </div>
      <br>
      <div>
        <button
          class="mdl-button mdl-button--raised mdl-button--colored"
          :disabled="$v.$invalid"
          @click.prevent="onSubmit">
          login
        </button>
      </div>
    </form>
    <hr>
    <div class="auth-heading">
      <router-link tag="span" :to="{ name: 'forgot'}" style="color: #137E8D; cursor: pointer;">&nbsp;forgot password</router-link>
    </div>

  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      logIn: 'logIn'
    }),
    onSubmit () {
      const userData = {
        email: this.email,
        password: this.password
      }
      this.logIn(userData)
    }
  },
  computed: {
    ...mapGetters({
      logInIss: 'logInIss'
    })
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
  },
  deactivated () {
    this.email = ''
    this.password = ''
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  }
}
</script>
