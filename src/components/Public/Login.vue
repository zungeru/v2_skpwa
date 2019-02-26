<template>
  <div class="sk-login-main">
    <div class="login-heading">
      <h4>login</h4>
      <span>don't have an account?</span>
      <router-link tag="span" :to="{ name: 'signup'}" style="color: #ff0800; cursor: pointer;">&nbsp;signup</router-link>
    </div>
    <br/>
    <div v-if="logInIss" class="login-error">
      <span>invalid username or password</span>
    </div>
    <br/>
    <form class="login-form" action="#" >
      <div class="login-item">
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
      <div class="login-item">
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

<style>
.sk-login-main{
  padding: 20px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
}
.login-heading{
  text-align: center;
}
.login-heading > h4{
  padding-top: 0px;
  margin-top: 0px;
}
.login-heading > span {
  font-size: 15px;
}
.login-error {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  background-color: #f4cccc;
  border-radius: 5px;
  width: 250px;
}
.login-form{
  padding: 0px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 0px;
  max-width: 500px;
}
.login-item > label {
  font-size: 16px;
}
.login-item > p {
  margin: 0px;
  padding: 0px;
  color: #ff0800;
}
.login-item > input  {
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
</style>
