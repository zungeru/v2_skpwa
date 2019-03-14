<template>
  <div class="sk-reset-main">
    <div class="reset-heading">
      <h4>reset password</h4>
    </div>
    <br/>

    <form class="reset-form" action="#" >
      <div class="reset-item">
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
      <div class="reset-item">
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
      <div class="reset-item">
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
      confirmPassword: ''
    }
  },
  methods: {
    onSubmit () {
      const fd = new FormData()
      fd.append('email', this.email)
      axios.post('http://localhost:5001/password/reset', fd)
        .then(res => {
          if (res.data.authStatus) {
            console.log(res.data)
          }
        })
        .catch(err => router.push({name: 'error'}))
    }
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
  },
  deactivated () {
    this.email = ''
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
.fade-enter{
  opacity: 0;
}
.fade-enter-active{
  transition: opacity 3s;
}
.fade-leave{
  opacity: 0;
}
.fade-leave-active{
  transition: opacity 0s;
  opacity: 0;
}
.sk-reset-main{
  padding: 20px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
}
.reset-heading{
  text-align: center;
}
.reset-heading > h4{
  padding-top: 0px;
  margin-top: 0px;
}
.email-msg {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  background-color: #B9D3D8;
  border-radius: 5px;
  width: 250px;
}
.reset-form{
  padding: 0px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 0px;
  max-width: 500px;
}
.reset-item > label {
  font-size: 16px;
}
.reset-item > p {
  margin: 0px;
  padding: 0px;
  color: #ff0800;
}
.reset-item > input  {
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
